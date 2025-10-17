import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  createCodeChallengeS256,
  createCodeVerifier,
  randomState,
} from "@/lib/pkce";

export async function GET(request: NextRequest) {
  if (!process.env.KAKAO_CLIENT_ID || !process.env.KAKAO_CALLBACK_URL) {
    return NextResponse.json(
      { error: "Kakao client ID or callback URL is not set" },
      { status: 500 },
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const redirectUri = searchParams.get("redirect_uri") || "/";
    const registerUri = searchParams.get("register_uri") || "/register";

    if (!redirectUri || !registerUri) {
      return NextResponse.json(
        { error: "Redirect URI or register URI is not set" },
        { status: 400 },
      );
    }

    // state를 JSON 객체로 구성
    const stateData = {
      redirect_uri: redirectUri,
      register_uri: registerUri,
      nonce: randomState(),
    };
    const state = encodeURIComponent(JSON.stringify(stateData));

    const codeVerifier = createCodeVerifier();
    const codeChallenge = createCodeChallengeS256(codeVerifier);

    // PKCE·state를 HttpOnly 쿠키에 5분 보관
    const jar = await cookies();
    jar.set("oauth_state", state, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 300,
      path: "/",
    });
    jar.set("pkce_verifier", codeVerifier, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 300,
      path: "/",
    });

    // 카카오 OAuth 2.0 인증 URL 구성
    const params = new URLSearchParams({
      client_id: process.env.KAKAO_CLIENT_ID!,
      redirect_uri: process.env.KAKAO_CALLBACK_URL!,
      response_type: "code",
      scope: "profile_nickname profile_image account_email",
      state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;

    return NextResponse.redirect(kakaoAuthUrl);
  } catch (error) {
    console.error("Kakao auth error:", error);
    return NextResponse.json(
      { error: "Failed to redirect to Kakao login" },
      { status: 500 },
    );
  }
}
