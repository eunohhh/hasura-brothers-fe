import type { NextRequest } from "next/server";
import { getAdminClient } from "@/lib/apollo/server-admin";
import {
  createErrorRedirect,
  createSuccessRedirect,
  type OAuthCallbackState,
  validateRedirectUrls,
} from "@/lib/auth/callback/callback-utils";
import {
  exchangeOAuthTokens,
  KAKAO_OAUTH_CONFIG,
} from "@/lib/auth/callback/oauth-handler";
import { setupSession } from "@/lib/auth/callback/session-handler";
import { processUser } from "@/lib/auth/callback/user-handler";
import { getPublicURL } from "@/lib/auth/common-utils";
import { checkPKCECookies } from "@/lib/auth/pkce-utils";

// GET /api/auth/kakao/callback: OAuth 인증 후 세션/CSRF 쿠키 설정 및 리다이렉트
export async function GET(request: NextRequest) {
  try {
    // 요청 파라미터 체크
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const stateParam = searchParams.get("state");

    // PKCE 쿠키 체크
    const publicUrl = getPublicURL();

    if (!code || !stateParam) {
      return createErrorRedirect(
        "invalid_request",
        "잘못된 요청입니다. 다시 시도해주세요.",
        publicUrl,
      );
    }

    const { savedState, codeVerifier, cookieStore } = await checkPKCECookies();
    if (!savedState || savedState !== stateParam || !codeVerifier) {
      return createErrorRedirect(
        "session_expired",
        "로그인 시간이 만료되었습니다. 다시 시도해주세요.",
        publicUrl,
      );
    }

    // state 파싱 및 검증
    let state: OAuthCallbackState;
    try {
      state = JSON.parse(decodeURIComponent(stateParam));
    } catch (error) {
      return createErrorRedirect(
        "invalid_state",
        "잘못된 상태 정보입니다. 다시 시도해주세요.",
        publicUrl,
      );
    }

    // URL 검증 - Open Redirect 방지
    if (
      !validateRedirectUrls(state.redirect_uri, state.register_uri, publicUrl)
    ) {
      return createErrorRedirect(
        "invalid_redirect_uri",
        "잘못된 리다이렉트 URL입니다. 다시 시도해주세요.",
        publicUrl,
      );
    }

    // OAuth 토큰 교환 및 사용자 정보 가져오기
    const kakaoCallbackUrl = `${publicUrl}/api/auth/kakao/callback`;
    const { tokens, user } = await exchangeOAuthTokens({
      code,
      codeVerifier,
      redirectUri: kakaoCallbackUrl,
      config: KAKAO_OAUTH_CONFIG,
    });

    // 사용자 처리 (트랜잭션 + Race Condition 방지)
    const client = getAdminClient();
    const processedUser = await processUser({
      oauthUser: user,
      tokens,
      provider: "KAKAO",
      client,
    });

    // 세션 설정 (JWT 생성, 쿠키 설정, CSRF 토큰 로테이션)
    await setupSession({
      userId: processedUser.userId,
      email: user.email,
      tokenId: processedUser.tokenId,
      cookieStore,
    });

    // Refresh Token이 없는 경우 로그 메시지
    if (!tokens.refreshToken) {
      console.warn(
        "카카오로부터 리프레시 토큰을 받지 못했습니다. 이는 정상적인 상황일 수 있습니다.",
      );
    }

    // 리다이렉트
    if (processedUser.shouldRedirectToRegister) {
      // 추가 정보 입력 필요 → register 페이지로
      return createSuccessRedirect(state.register_uri, {
        email: user.email,
        provider: "KAKAO",
        profileImage: user.picture ?? "",
      });
    }

    // 완전히 등록된 유저 → 원래 목적지로
    return createSuccessRedirect(state.redirect_uri);
  } catch (error) {
    console.error("카카오 콜백 에러 ====>", error);
    return createErrorRedirect(
      "callback_failed",
      "로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
      getPublicURL(),
    );
  }
}
