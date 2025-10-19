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
import { withCsrfProtection } from "@/lib/csrf";

// POST /api/auth/refresh: 저장된 refresh 토큰으로 새 access 토큰을 발급
export const POST = withCsrfProtection(async (request: NextRequest) => {
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

    const storedToken = tokenData.user_tokens_by_pk;
    const provider = storedToken.provider?.toUpperCase();

    if (!provider) {
      console.error("Refresh token is missing provider info");
      return NextResponse.json(
        { error: "Unsupported OAuth provider", requiresReauth: true },
        { status: 401 },
      );
    }

    const latestUserFromDb = storedToken.user;
    let latestUserInfo = {
      email: currentEmail ?? latestUserFromDb?.email ?? "",
      name: latestUserFromDb?.name,
      picture: null as string | null,
    };

    const handleExpiredRefreshToken = async (message: string) => {
      const { error: deleteError } = await client.mutate({
        mutation: DELETE_TOKEN_BY_ID,
        variables: { tokenId },
      });

      if (deleteError) {
        console.error("Failed to delete token:", deleteError);
      }

      return NextResponse.json(
        { error: message, requiresReauth: true },
        { status: 401 },
      );
    };

    let newTokens: any;

    if (provider === "GOOGLE") {
      if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        console.error("Missing Google OAuth credentials for refresh");
        return NextResponse.json(
          { error: "OAuth configuration incomplete" },
          { status: 500 },
        );
      }

      const refreshResponse = await fetch(
        "https://oauth2.googleapis.com/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            refresh_token: storedToken.refresh_token,
            grant_type: "refresh_token",
          }),
        },
      );

      if (!refreshResponse.ok) {
        return handleExpiredRefreshToken("Refresh token expired");
      }

      newTokens = await refreshResponse.json();

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
    } else if (provider === "KAKAO") {
      if (!process.env.KAKAO_CLIENT_ID || !process.env.KAKAO_CLIENT_SECRET) {
        console.error("Missing Kakao OAuth credentials for refresh");
        return NextResponse.json(
          { error: "OAuth configuration incomplete" },
          { status: 500 },
        );
      }

      const params = new URLSearchParams({
        grant_type: "refresh_token",
        client_id: process.env.KAKAO_CLIENT_ID!,
        client_secret: process.env.KAKAO_CLIENT_SECRET!,
        refresh_token: storedToken.refresh_token,
      });

      const refreshResponse = await fetch(
        "https://kauth.kakao.com/oauth/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params,
        },
      );

      if (!refreshResponse.ok) {
        return handleExpiredRefreshToken("Refresh token expired");
      }

      newTokens = await refreshResponse.json();

      if (newTokens.access_token) {
        const userInfoResponse = await fetch(
          "https://kapi.kakao.com/v2/user/me",
          {
            headers: { Authorization: `Bearer ${newTokens.access_token}` },
          },
        );

        if (userInfoResponse.ok) {
          const kakaoUser = await userInfoResponse.json();
          const account = kakaoUser?.kakao_account ?? {};
          const profile = account?.profile ?? {};
          latestUserInfo = {
            email: account.email ?? latestUserInfo.email,
            name: profile.nickname ?? latestUserInfo.name,
            picture:
              profile.profile_image_url ||
              kakaoUser?.properties?.profile_image ||
              latestUserInfo.picture,
          };
        }
      }
    } else {
      console.error("Unsupported refresh provider:", provider);
      return NextResponse.json(
        { error: "Unsupported OAuth provider", requiresReauth: true },
        { status: 401 },
      );
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
});
