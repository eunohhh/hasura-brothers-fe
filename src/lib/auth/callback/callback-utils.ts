import { NextResponse } from "next/server";

// OAuth 콜백 공통 타입 정의
export interface OAuthCallbackState {
  redirect_uri: string;
  register_uri: string;
  nonce: string;
}

export interface OAuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface OAuthUser {
  email: string;
  sub: string;
  name?: string;
  picture?: string;
}

export interface UserProcessingResult {
  userId: string;
  tokenId: string | null;
  shouldRedirectToRegister: boolean;
}

// URL 검증 함수
export function validateRedirectUrls(
  redirectUri: string,
  registerUri: string,
  publicUrl: string | URL,
): boolean {
  const allowedDomains = [
    new URL(publicUrl).hostname,
    "localhost",
    "127.0.0.1",
    // 프로덕션 도메인 추가 가능
  ];

  const isValidUrl = (urlString: string): boolean => {
    try {
      const url = new URL(urlString);
      return allowedDomains.includes(url.hostname);
    } catch {
      return false;
    }
  };

  return isValidUrl(redirectUri) && isValidUrl(registerUri);
}

// 에러 리다이렉트 헬퍼 함수
export function createErrorRedirect(
  error: string,
  message: string,
  publicUrl: string | URL,
): NextResponse {
  const errorUrl = new URL("/signin", publicUrl);
  errorUrl.searchParams.set("error", error);
  errorUrl.searchParams.set("message", message);
  return NextResponse.redirect(errorUrl);
}

// 성공 리다이렉트 헬퍼 함수
export function createSuccessRedirect(
  url: string,
  params?: Record<string, string>,
): NextResponse {
  const redirectUrl = new URL(url);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      redirectUrl.searchParams.set(key, value);
    });
  }
  return NextResponse.redirect(redirectUrl);
}
