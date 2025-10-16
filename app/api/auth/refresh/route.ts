// app/api/auth/refresh/route.ts
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SERVER_CONSTS } from "@/constants/server.consts";
import { GetRefreshTokenByIdQuery } from "@/generated/graphql";
import {
  DELETE_TOKEN_BY_ID,
  UPDATE_TOKEN_LAST_USED_BY_ID,
} from "@/graphql/mutations";
import { GET_REFRESH_TOKEN_BY_ID } from "@/graphql/queries";
import { getAdminClient } from "@/lib/apollo-admin-client";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const currentToken = cookieStore.get(
      SERVER_CONSTS.COOKIE_AUTH_TOKEN,
    )?.value;
    const tokenId = cookieStore.get(SERVER_CONSTS.COOKIE_TOKEN_ID)?.value; // ✅ UUID 가져오기

    if (!currentToken || !tokenId) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    // 1. 현재 JWT에서 userId 추출
    let userId: string;
    let currentEmail: string;

    try {
      const verified = await jwtVerify(
        currentToken,
        new TextEncoder().encode(process.env.HASURA_JWT_SECRET!),
      );

      const claims = verified.payload["https://hasura.io/jwt/claims"] as {
        "x-hasura-user-id": string;
      };
      userId = claims["x-hasura-user-id"];
      currentEmail = verified.payload.email as string;
    } catch {
      // 만료된 토큰이어도 디코드 시도
      const decoded = JSON.parse(
        Buffer.from(currentToken.split(".")[1], "base64").toString(),
      );
      const claims = decoded["https://hasura.io/jwt/claims"];
      userId = claims?.["x-hasura-user-id"];
      currentEmail = decoded.email;
    }

    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // ✅ 2. Token ID로 Refresh Token 가져오기
    const client = getAdminClient();
    const { data: tokenData, error } =
      await client.query<GetRefreshTokenByIdQuery>({
        query: GET_REFRESH_TOKEN_BY_ID,
        variables: { tokenId },
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!tokenData?.user_tokens_by_pk) {
      // Token ID가 유효하지 않거나 삭제됨 (강제 로그아웃된 경우)
      return NextResponse.json(
        { error: "No refresh token found", requiresReauth: true },
        { status: 401 },
      );
    }

    // ✅ 보안: 토큰의 user_id와 JWT의 user_id가 일치하는지 확인
    if (tokenData.user_tokens_by_pk.user_id !== userId) {
      return NextResponse.json(
        { error: "Token mismatch", requiresReauth: true },
        { status: 401 },
      );
    }

    // 3. Google에서 새 Access Token 받기
    const refreshResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        refresh_token: tokenData.user_tokens_by_pk.refresh_token,
        grant_type: "refresh_token",
      }),
    });

    if (!refreshResponse.ok) {
      // Refresh token이 만료되거나 revoke됨 - DB에서도 삭제
      const { error: deleteError } = await client.mutate({
        mutation: DELETE_TOKEN_BY_ID,
        variables: { tokenId },
      });

      if (deleteError) {
        console.error("Failed to delete token:", deleteError);
      }

      return NextResponse.json(
        { error: "Refresh token expired", requiresReauth: true },
        { status: 401 },
      );
    }

    const newTokens = await refreshResponse.json();

    // 4. id_token에서 최신 유저 정보 가져오기
    let latestUserInfo = {
      email: currentEmail,
      name: tokenData.user_tokens_by_pk.user.name,
      picture: null,
    };

    if (newTokens.id_token) {
      const idTokenPayload = JSON.parse(
        Buffer.from(newTokens.id_token.split(".")[1], "base64").toString(),
      );

      latestUserInfo = {
        email: idTokenPayload.email,
        name: idTokenPayload.name,
        picture: idTokenPayload.picture,
      };
    }

    // 5. 새로운 JWT 생성
    const newJwt = await new SignJWT({
      sub: userId,
      email: latestUserInfo.email,
      name: latestUserInfo.name,
      picture: latestUserInfo.picture,
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": userId,
      },
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("15m")
      .sign(new TextEncoder().encode(process.env.HASURA_JWT_SECRET!));

    // 6. 쿠키 업데이트
    cookieStore.set(SERVER_CONSTS.COOKIE_AUTH_TOKEN, newJwt, {
      path: "/",
      maxAge: 15 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // ✅ 7. 마지막 사용 시간 업데이트
    const { error: updateError } = await client.mutate({
      mutation: UPDATE_TOKEN_LAST_USED_BY_ID,
      variables: { tokenId },
    });

    if (updateError) {
      console.error("Failed to update last used:", updateError);
    }

    return NextResponse.json({
      success: true,
      token: newJwt,
      expiresIn: newTokens.expires_in,
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 },
    );
  }
}
