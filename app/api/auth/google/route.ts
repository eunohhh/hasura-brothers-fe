import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  createCodeChallengeS256,
  createCodeVerifier,
  randomState,
} from "@/lib/pkce";

export async function GET(request: NextRequest) {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CALLBACK_URL) {
    return NextResponse.json(
      { error: "Google client ID or callback URL is not set" },
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

    // params에 클라이언트 정보 담기
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL!,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      include_granted_scopes: "true",
      prompt: "consent",
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
      state,
    });

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

    return NextResponse.redirect(googleAuthUrl);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to redirect to Google login" },
      { status: 500 },
    );
  }
}
