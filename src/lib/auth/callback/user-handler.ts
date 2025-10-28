import { ApolloClient } from "@apollo/client-integration-nextjs";
import {
  GetUserByEmailAndProviderQuery,
  GetUserByEmailAndProviderQueryVariables,
  GetUserByEmailQuery,
  GetUserByEmailQueryVariables,
  RegisterUserWithTokenMutation,
  RegisterUserWithTokenMutationVariables,
  SaveRefreshTokenMutation,
  SaveRefreshTokenMutationVariables,
} from "@/generated/graphql";
import {
  REGISTER_USER_WITH_TOKEN,
  SAVE_REFRESH_TOKEN,
} from "@/graphql/mutations";
import {
  GET_USER_BY_EMAIL,
  GET_USER_BY_EMAIL_AND_PROVIDER,
} from "@/graphql/queries";

import type { OAuthTokens, OAuthUser } from "./callback-utils";

export interface UserProcessingParams {
  oauthUser: OAuthUser;
  tokens: OAuthTokens;
  provider: string;
  client: ApolloClient;
}

/**
 * 사용자 처리 결과
 */
export interface ProcessedUser {
  userId: string;
  tokenId: string | null;
  shouldRedirectToRegister: boolean;
}

/**
 * 사용자 처리 로직 (트랜잭션 + Race Condition 방지)
 */
export async function processUser(
  params: UserProcessingParams,
): Promise<ProcessedUser> {
  const { oauthUser, tokens, provider, client } = params;

  // 사용자 조회
  const { data: hasuraUser } = await client.query<
    GetUserByEmailAndProviderQuery,
    GetUserByEmailAndProviderQueryVariables
  >({
    query: GET_USER_BY_EMAIL_AND_PROVIDER,
    variables: { email: oauthUser.email, provider },
  });

  const foundUser = hasuraUser?.user?.[0];

  // Refresh Token이 있는 경우에만 토큰 객체 생성
  const tokenObject = tokens.refreshToken
    ? {
        user_id: "", // 나중에 설정
        provider: provider,
        refresh_token: tokens.refreshToken,
        expired_at: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000,
        ).toISOString(),
      }
    : null;

  let userId: string = "";
  let shouldRedirectToRegister = false;
  let tokenId: string | null = null;

  if (foundUser) {
    // Case 1: 이미 가입된 사용자
    userId = foundUser.id;
    if (tokenObject) {
      // 기존 사용자에 Refresh Token만 추가
      const { data: tokenData, error: tokenError } = await client.mutate<
        SaveRefreshTokenMutation,
        SaveRefreshTokenMutationVariables
      >({
        mutation: SAVE_REFRESH_TOKEN,
        variables: {
          object: {
            user_id: userId,
            provider: tokenObject.provider,
            refresh_token: tokenObject.refresh_token,
            expired_at: tokenObject.expired_at,
          },
        },
      });

      if (!tokenError && tokenData?.insert_user_tokens_one?.id) {
        tokenId = tokenData.insert_user_tokens_one.id;
      }
    }
  } else {
    // Case 2: 신규 사용자, 유저 생성
    if (tokenObject) {
      // Race Condition 방지를 위한 재시도 로직
      const result = await createUserWithRetry({
        oauthUser,
        client,
        provider,
        tokenObject,
      });
      userId = result.userId;
      tokenId = result.tokenId;
      shouldRedirectToRegister = result.shouldRedirectToRegister;
    } else {
      throw new Error("리프레시 토큰이 필요합니다.");
    }
  }

  return {
    userId,
    tokenId,
    shouldRedirectToRegister,
  };
}

export interface CreateUserWithRetryParams {
  oauthUser: OAuthUser;
  client: ApolloClient;
  provider: string;
  tokenObject: {
    user_id: string;
    provider: string;
    refresh_token: string;
    expired_at: string;
  };
}
/**
 * 사용자 생성 시 Race Condition 방지를 위한 재시도 로직
 */
async function createUserWithRetry(
  params: CreateUserWithRetryParams,
): Promise<ProcessedUser> {
  const { oauthUser, client, provider, tokenObject } = params;
  let retryCount = 0;
  const maxRetries = 3;
  let userCreated = false;

  while (retryCount < maxRetries && !userCreated) {
    try {
      // 사용자 생성 + Refresh Token 생성 (트랜잭션)
      const { data: newUser, error: createUserError } = await client.mutate<
        RegisterUserWithTokenMutation,
        RegisterUserWithTokenMutationVariables
      >({
        mutation: REGISTER_USER_WITH_TOKEN,
        variables: {
          email: oauthUser.email,
          provider: provider,
          provider_id: oauthUser.sub,
          refresh_token: tokenObject.refresh_token,
          expired_at: tokenObject.expired_at,
        },
      });

      if (createUserError) {
        // 중복 키 오류인 경우 (Race Condition)
        if (
          createUserError.message?.includes("duplicate key") ||
          createUserError.message?.includes("unique constraint")
        ) {
          retryCount++;
          if (retryCount < maxRetries) {
            // 잠시 대기 후 다시 사용자 조회
            await new Promise((resolve) =>
              setTimeout(resolve, 100 * retryCount),
            );

            // 다시 사용자 조회 시도
            const { data: retryUser } = await client.query<
              GetUserByEmailQuery,
              GetUserByEmailQueryVariables
            >({
              query: GET_USER_BY_EMAIL,
              variables: { email: oauthUser.email },
            });

            const retryFoundUser = retryUser?.user?.[0];
            if (retryFoundUser) {
              // 다른 요청에서 이미 사용자를 생성한 경우
              const userId = retryFoundUser.id;
              let tokenId: string | null = null;

              if (tokenObject) {
                // 기존 사용자에 Refresh Token만 추가
                const { data: tokenData, error: tokenError } =
                  await client.mutate<
                    SaveRefreshTokenMutation,
                    SaveRefreshTokenMutationVariables
                  >({
                    mutation: SAVE_REFRESH_TOKEN,
                    variables: {
                      object: {
                        user_id: userId,
                        provider: tokenObject.provider,
                        refresh_token: tokenObject.refresh_token,
                        expired_at: tokenObject.expired_at,
                      },
                    },
                  });

                if (!tokenError && tokenData?.insert_user_tokens_one?.id) {
                  tokenId = tokenData.insert_user_tokens_one.id;
                }
              }

              userCreated = true;
              return {
                userId,
                tokenId,
                shouldRedirectToRegister: false,
              };
            }
            continue;
          }
        }

        // 다른 종류의 오류인 경우
        throw new Error("사용자 생성에 실패했습니다.");
      }

      if (!newUser?.insert_user_one) {
        throw new Error("사용자 생성에 실패했습니다.");
      }

      const tokenId = newUser.insert_user_one.user_tokens?.[0]?.id || null;

      userCreated = true;
      return {
        userId: newUser.insert_user_one.id,
        tokenId,
        shouldRedirectToRegister: true,
      };
    } catch (error) {
      retryCount++;
      if (retryCount >= maxRetries) {
        throw new Error("사용자 생성에 실패했습니다.");
      }
      // 잠시 대기 후 재시도
      await new Promise((resolve) => setTimeout(resolve, 100 * retryCount));
    }
  }

  throw new Error("사용자 생성에 실패했습니다.");
}
