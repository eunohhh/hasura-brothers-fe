import { exchangeToken } from "../server-utils";
import type { OAuthTokens, OAuthUser } from "./callback-utils";

export interface OAuthProviderConfig {
  tokenUrl: string;
  userInfoUrl: string;
  clientId: string;
  clientSecret: string;
}

export interface OAuthExchangeParams {
  code: string;
  codeVerifier: string;
  redirectUri: string;
  config: OAuthProviderConfig;
}

/**
 * OAuth 토큰 교환 및 사용자 정보 가져오기
 */
export async function exchangeOAuthTokens(
  params: OAuthExchangeParams,
): Promise<{ tokens: OAuthTokens; user: OAuthUser }> {
  const { code, codeVerifier, redirectUri, config } = params;

  // 토큰 교환
  const tokens = await exchangeToken({
    requestUrl: config.tokenUrl,
    code,
    codeVerifier,
    redirectUri,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
  });

  if (!tokens) {
    throw new Error("토큰 교환에 실패했습니다.");
  }

  if (!tokens.accessToken) {
    throw new Error("액세스 토큰을 받지 못했습니다.");
  }

  // 사용자 정보 가져오기
  const userInfoResponse = await fetch(config.userInfoUrl, {
    headers: { Authorization: `Bearer ${tokens.accessToken}` },
  });

  if (!userInfoResponse.ok) {
    throw new Error("사용자 정보를 가져오는데 실패했습니다.");
  }

  const user: OAuthUser = await userInfoResponse.json();

  return {
    tokens: {
      accessToken: tokens.accessToken!,
      refreshToken: tokens.refreshToken,
    },
    user,
  };
}

/**
 * 구글 OAuth 설정
 */
export const GOOGLE_OAUTH_CONFIG: OAuthProviderConfig = {
  tokenUrl: "https://oauth2.googleapis.com/token",
  userInfoUrl: "https://openidconnect.googleapis.com/v1/userinfo",
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
};

/**
 * 카카오 OAuth 설정
 */
export const KAKAO_OAUTH_CONFIG: OAuthProviderConfig = {
  tokenUrl: "https://kauth.kakao.com/oauth/token",
  userInfoUrl: "https://kapi.kakao.com/v2/user/me",
  clientId: process.env.KAKAO_CLIENT_ID || "",
  clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
};
