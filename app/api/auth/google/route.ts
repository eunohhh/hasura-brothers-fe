import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { env } from "@/env";
import { getPublicURL } from "@/lib/auth/common-utils";
import {
  createCodeChallengeS256,
  createCodeVerifier,
  randomState,
} from "@/lib/auth/pkce-utils";
import {
  COMMON_CONSTS,
  OAUTH_ERROR_MESSAGES,
} from "@/lib/constants/consts-common";

export async function GET(request: NextRequest) {
  try {
    const publicUrl = getPublicURL();
    const searchParams = request.nextUrl.searchParams;

    // 로그인 성공 후 최종적으로 돌아갈 사용자 앱의 URI
    // 상대 경로로 들어오면 절대 경로로 변환
    const redirectUriParam =
      searchParams.get("redirect_uri") || COMMON_CONSTS.DEFAULT_REDIRECT_URI;
    const registerUriParam =
      searchParams.get("register_uri") || COMMON_CONSTS.DEFAULT_REGISTER_URI;

    const redirectUri = publicUrl + redirectUriParam;
    const registerUri = publicUrl + registerUriParam;

    if (!redirectUri || !registerUri) {
      return NextResponse.json(
        { error: OAUTH_ERROR_MESSAGES.REDIRECT_REGISTER_URI_NOT_SET },
        { status: 400 },
      );
    }

    // state를 JSON 객체로 구성 - 최종 redirect URI 정보를 포함
    const stateData = {
      redirect_uri: redirectUri,
      register_uri: registerUri,
      nonce: randomState(),
    };
    const state = encodeURIComponent(JSON.stringify(stateData));

    const codeVerifier = createCodeVerifier();
    const codeChallenge = createCodeChallengeS256(codeVerifier);

    // PKCE·state를 HttpOnly 쿠키에 10분 보관 - 참조: https://arcticjs.dev/guides/oauth2-pkce
    const jar = await cookies();
    jar.set(COMMON_CONSTS.PKCE_STATE, state, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 60 * 10, // 10분
      path: "/",
    });
    jar.set(COMMON_CONSTS.PKCE_VERIFIER, codeVerifier, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 60 * 10, // 10분
      path: "/",
    });

    // params에 클라이언트 정보 담기
    // redirect_uri는 Google Cloud Console에 등록된 절대 URL이어야 함
    const googleCallbackUrl = `${publicUrl}/api/auth/google/callback`;

    const params = new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      redirect_uri: googleCallbackUrl,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline", // ✅ refresh token 받기 위해 필수
      include_granted_scopes: "true",
      prompt: "consent", // ✅ 매번 동의 화면 표시하여 refresh token 재발급
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
      state,
      nonce: stateData.nonce,
    });

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

    return NextResponse.redirect(googleAuthUrl);
  } catch (error) {
    console.error("구글 로그인으로 리다이렉트 시 에러 ====>", error);
    return NextResponse.json(
      { error: OAUTH_ERROR_MESSAGES.FAILED_TO_REDIRECT_TO_OAUTH_LOGIN },
      { status: 500 },
    );
  }
}
