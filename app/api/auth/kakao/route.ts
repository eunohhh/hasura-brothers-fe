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

    // state를 JSON 객체로 구성
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

    // 카카오 OAuth 2.0 인증 URL 구성
    // redirect_uri는 Kakao Developers에 등록된 절대 URL이어야 함
    const kakaoCallbackUrl = `${publicUrl}/api/auth/kakao/callback`;

    const params = new URLSearchParams({
      client_id: env.KAKAO_CLIENT_ID,
      redirect_uri: kakaoCallbackUrl,
      response_type: "code",
      scope: "profile_nickname profile_image account_email",
      state,
      nonce: stateData.nonce, // OIDC 검증용
      code_challenge: codeChallenge, // PKCE
      code_challenge_method: "S256",
      // prompt: "none",                  // 사일런트 시도 시 사용, 실패 시 폴백 로직 필요
    });

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
    return NextResponse.redirect(kakaoAuthUrl);
  } catch (error) {
    console.error("카카오 로그인으로 리다이렉트 시 에러 ====>", error);
    return NextResponse.json(
      { error: OAUTH_ERROR_MESSAGES.FAILED_TO_REDIRECT_TO_OAUTH_LOGIN },
      { status: 500 },
    );
  }
}
