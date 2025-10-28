import "server-only";

import { cookies } from "next/headers";
import { COMMON_CONSTS } from "../constants/consts-common";

export async function getTokenFromCookie(name?: string) {
  const cookieStore = await cookies();
  return cookieStore.get(name ?? COMMON_CONSTS.COOKIE_ACCESS_TOKEN)?.value;
}

interface ExchangeTokenParams {
  requestUrl: string;
  code: string;
  codeVerifier: string;
  redirectUri: string;
  clientId: string;
  clientSecret: string;
}

export async function exchangeToken(params: ExchangeTokenParams): Promise<{
  accessToken?: string;
  refreshToken?: string;
} | null> {
  const {
    requestUrl,
    code,
    codeVerifier,
    redirectUri,
    clientId,
    clientSecret,
  } = params;

  const tokenResponse = await fetch(requestUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  });

  if (!tokenResponse.ok) {
    // 디버깅을 위한 에러 로그
    const errorText = await tokenResponse.text();
    console.error("OAuth 프로바이더로 토큰 요청 했으나 fetch 실패 ====>", {
      status: tokenResponse.status,
      statusText: tokenResponse.statusText,
      error: errorText,
      redirectUri,
    });
    return null;
  }

  const data = await tokenResponse.json();

  // OAuth 제공자는 snake_case를 사용하므로 camelCase로 변환
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };
}
