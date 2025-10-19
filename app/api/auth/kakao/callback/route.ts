// app/api/auth/kakao/callback/route.ts
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SERVER_CONSTS } from "@/constants/server.consts";
import {
  GetUserByEmailQuery,
  SaveRefreshTokenMutation,
} from "@/generated/graphql";
import { SAVE_REFRESH_TOKEN } from "@/graphql/mutations";
import { GET_USER_BY_EMAIL } from "@/graphql/queries";
import { getAdminClient } from "@/lib/apollo-admin-client";
import { rotateCsrfCookie } from "@/lib/csrf";
import { getURL } from "@/lib/server-utils";
import { KakaoUser } from "@/types/types";

// GET /api/auth/kakao/callback: Kakao OAuth 이후 세션/CSRF 쿠키를 구성하고 리다이렉트
export async function GET(request: NextRequest) {
  if (
    !process.env.KAKAO_CLIENT_ID ||
    !process.env.KAKAO_CLIENT_SECRET ||
    !process.env.KAKAO_CALLBACK_URL ||
    !process.env.HASURA_JWT_SECRET
  ) {
    return NextResponse.json(
      { error: "Kakao client ID, client secret or callback URL is not set" },
      { status: 500 },
    );
  }

  if (
    !process.env.HASURA_GRAPHQL_ENDPOINT ||
    !process.env.HASURA_ADMIN_SECRET
  ) {
    return NextResponse.json(
      { error: "Hasura GraphQL endpoint or admin secret is not set" },
      { status: 500 },
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const stateParam = searchParams.get("state");

    if (!code || !stateParam) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const jar = await cookies();
    const savedState = jar.get("oauth_state")?.value;
    const codeVerifier = jar.get("pkce_verifier")?.value;

    if (!savedState || savedState !== stateParam) {
      return NextResponse.json({ error: "Invalid state" }, { status: 400 });
    }
    if (!codeVerifier) {
      return NextResponse.json(
        { error: "Missing code_verifier" },
        { status: 400 },
      );
    }

    // state 파싱 및 검증
    let state: { redirect_uri: string; register_uri: string; nonce: string };
    try {
      state = JSON.parse(decodeURIComponent(stateParam));
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid state format" },
        { status: 400 },
      );
    }

    // 1) 토큰 교환 (Authorization Code + PKCE + client_secret)
    const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: process.env.KAKAO_CLIENT_ID!,
        client_secret: process.env.KAKAO_CLIENT_SECRET!,
        redirect_uri: process.env.KAKAO_CALLBACK_URL!,
        code_verifier: codeVerifier,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Kakao token error:", errorText);
      return NextResponse.json(
        { error: "Failed to get tokens" },
        { status: 500 },
      );
    }

    const tokens = await tokenResponse.json();

    if (!tokens.access_token) {
      return NextResponse.json(
        { error: "Failed to get access token" },
        { status: 500 },
      );
    }

    // 2. 유저 정보 가져오기
    const userInfoResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    if (!userInfoResponse.ok) {
      return NextResponse.json(
        { error: "Failed to get user info" },
        { status: 500 },
      );
    }

    const kakaoUser: KakaoUser = await userInfoResponse.json();

    // 카카오 사용자 정보를 Google 형식과 호환되도록 변환
    const email = kakaoUser.kakao_account?.email;
    if (!email) {
      return NextResponse.json(
        { error: "Email is required but not provided by Kakao" },
        { status: 400 },
      );
    }

    const userInfo = {
      id: kakaoUser.id.toString(),
      email,
      name: kakaoUser.properties.nickname,
      picture:
        kakaoUser.properties.profile_image ||
        kakaoUser.kakao_account.profile.profile_image_url ||
        "",
    };

    // 3. Hasura에서 유저 확인
    const client = getAdminClient();

    const { data: hasuraUser } = await client.query<GetUserByEmailQuery>({
      query: GET_USER_BY_EMAIL,
      variables: { email: userInfo.email },
    });

    const foundUser = hasuraUser?.user?.[0];

    // 등록되지 않은 유저면 토큰 저장/쿠키 발급 없이 회원가입으로 이동
    if (!foundUser) {
      const registerParams = new URLSearchParams({
        name: userInfo.name,
        email: userInfo.email,
        providerId: userInfo.id,
        provider: "KAKAO",
        profileImage: userInfo.picture,
      });

      const redirectUrl = `${state.register_uri}?${registerParams.toString()}`;
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    const userId = foundUser.id; // uuid

    // ✅ 4. Refresh Token이 있으면 DB에 저장
    let tokenId: string | null = null;

    if (tokens.refresh_token) {
      const { data: savedToken, error: saveError } =
        await client.mutate<SaveRefreshTokenMutation>({
          mutation: SAVE_REFRESH_TOKEN,
          variables: {
            object: {
              user_id: userId,
              provider: "KAKAO",
              refresh_token: tokens.refresh_token,
              user_agent: request.headers.get("user-agent"),
              ip_address: request.headers.get("X-Forwarded-For") || null,
              last_used_at: new Date().toISOString(),
            },
          },
        });

      if (saveError) {
        console.error("Failed to save refresh token:", saveError);
      } else {
        tokenId = savedToken?.insert_user_tokens_one?.id || null;
      }
    }

    // 5. JWT 생성 (10분으로 단축) - sub와 x-hasura-user-id는 uuid 사용
    const jwt = await new SignJWT({
      sub: userId,
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture,
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": userId,
      },
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("10m") // ✅ 10분으로 변경
      .sign(new TextEncoder().encode(process.env.HASURA_JWT_SECRET!));

    // 6. 쿠키에 토큰 저장
    const cookieStore = await cookies();

    // Access Token (JWT)
    cookieStore.set(SERVER_CONSTS.COOKIE_AUTH_TOKEN, jwt, {
      path: "/",
      maxAge: 10 * 60, // ✅ 10분
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // ✅ Refresh Token ID만 저장 (실제 토큰은 DB에)
    if (tokenId) {
      cookieStore.set(SERVER_CONSTS.COOKIE_TOKEN_ID, tokenId, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // 30일
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    await rotateCsrfCookie();

    // 7. 리다이렉트 (토큰을 쿼리 파라미터로 전달)
    const redirectParams = new URLSearchParams({
      token: jwt,
      success: "true",
      redirect_uri: state.redirect_uri || "/",
    });

    // 기본 리다이렉트 경로 -> 무조건 고정 페이지여야 하고 토큰, state.redirect_uri 를 params로 전달
    const clientCallbackUrl = getURL();

    return NextResponse.redirect(
      `${clientCallbackUrl}/callback?${redirectParams.toString()}`,
    );
  } catch (error) {
    console.error("Kakao callback error:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
