import { COMMON_CONSTS } from "@/lib/constants/consts-common";
import { rotateCsrfCookie } from "../csrf-server-utils";
import { signJWTToken } from "../token-server-utils";

export interface SessionSetupParams {
  userId: string;
  email: string;
  tokenId: string | null;
  cookieStore: any;
}

/**
 * 세션 설정 (JWT 생성, 쿠키 설정, CSRF 토큰 로테이션)
 */
export async function setupSession(params: SessionSetupParams): Promise<void> {
  const { userId, email, tokenId, cookieStore } = params;

  // JWT 생성
  const jwt = await signJWTToken({
    sub: userId,
    email: email,
    minutes: 10,
  });

  // Access Token 쿠키 설정
  cookieStore.set(COMMON_CONSTS.COOKIE_ACCESS_TOKEN, jwt, {
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // 30일 (refresh token과 동일)
    httpOnly: true,
    secure: true, // HTTPS 필수 (개발 환경도 HTTPS 사용)
    sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
  });

  // Refresh Token이 있는 경우에만 쿠키 설정
  if (tokenId) {
    cookieStore.set(COMMON_CONSTS.COOKIE_REFRESH_TOKEN, tokenId, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30일
      httpOnly: true,
      secure: true, // HTTPS 필수 (개발 환경도 HTTPS 사용)
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
    });
  } else {
    // Refresh Token이 없는 경우, 기존 쿠키 제거 (있다면)
    cookieStore.delete(COMMON_CONSTS.COOKIE_REFRESH_TOKEN);
  }

  // CSRF 토큰 로테이션
  await rotateCsrfCookie();
}
