import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/generated/graphql";
import { GET_USER_BY_EMAIL } from "@/graphql/queries";
import { getClient } from "@/lib/apollo-client";
import { GoogleUser } from "@/types/types";

export async function GET(request: NextRequest) {
  if (
    !process.env.GOOGLE_CLIENT_ID ||
    !process.env.GOOGLE_CLIENT_SECRET ||
    !process.env.GOOGLE_CALLBACK_URL ||
    !process.env.HASURA_JWT_SECRET
  ) {
    return NextResponse.json(
      { error: "Google client ID, client secret or callback URL is not set" },
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

    const state = JSON.parse(decodeURIComponent(stateParam));

    // 1. 구글에서 액세스 토큰 받기
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL!,
        grant_type: "authorization_code",
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokens.access_token) {
      return NextResponse.json(
        { error: "Failed to get access token" },
        { status: 500 },
      );
    }

    // 2. 유저 정보 가져오기
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      },
    );

    if (!userInfoResponse.ok) {
      return NextResponse.json(
        { error: "Failed to get user info" },
        { status: 500 },
      );
    }

    const googleUser: GoogleUser = await userInfoResponse.json();

    // 3. Hasura에서 유저 확인
    const client = getClient();

    const { data: hasuraUser, error: hasuraError } = await client.query<
      Partial<User>
    >({
      query: GET_USER_BY_EMAIL,
      variables: { email: googleUser.email },
    });

    if (hasuraError) {
      return NextResponse.json({ error: hasuraError.message }, { status: 500 });
    }

    // 4. JWT 생성
    const jwt = await new SignJWT({
      sub: googleUser.id,
      email: googleUser.email,
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": hasuraUser?.id || googleUser.id,
      },
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("3h")
      .sign(new TextEncoder().encode(process.env.HASURA_JWT_SECRET!));

    // 5. 쿠키에 토큰 저장
    const cookieStore = await cookies();
    cookieStore.set("auth-token", jwt, {
      path: "/",
      maxAge: 3 * 60 * 60, // 3시간
      httpOnly: true, // XSS 공격 방지
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "lax", // CSRF 공격 방지
    });

    // 6. 리다이렉트
    let redirectUrl: string;

    if (hasuraUser) {
      // 기존 유저 - 원래 가려던 페이지로
      redirectUrl = state.redirect_uri || "/";
    } else {
      // 신규 유저 - 회원가입 페이지로
      const registerParams = new URLSearchParams({
        name: googleUser.name,
        email: googleUser.email,
        providerId: googleUser.id,
        provider: "GOOGLE",
        profileImage: googleUser.picture || "",
      });

      redirectUrl = `${state.register_uri}?${registerParams.toString()}`;
    }

    return NextResponse.redirect(new URL(redirectUrl, request.url));
  } catch (error) {
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
