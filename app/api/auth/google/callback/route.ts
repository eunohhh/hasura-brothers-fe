import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { env } from "@/env";
import {
  GetUserByEmailQuery,
  GetUserByEmailQueryVariables,
  RegisterUserWithTokenMutation,
  RegisterUserWithTokenMutationVariables,
  UpdateUserProviderWithTokenMutation,
  UpdateUserProviderWithTokenMutationVariables,
} from "@/generated/graphql";
import {
  REGISTER_USER_WITH_TOKEN,
  UPDATE_USER_PROVIDER_WITH_TOKEN,
} from "@/graphql/mutations";
import { GET_USER_BY_EMAIL } from "@/graphql/queries";
import { getAdminClient } from "@/lib/apollo/server-admin";
import { getPublicURL } from "@/lib/auth/common-utils";
import { rotateCsrfCookie } from "@/lib/auth/csrf-server-utils";
import { checkPKCECookies } from "@/lib/auth/pkce-utils";
import { exchangeToken, isValidUrl } from "@/lib/auth/server-utils";
import { signJWTToken } from "@/lib/auth/token-server-utils";
import { COMMON_CONSTS } from "@/lib/constants/consts-common";
import type { GoogleUser } from "@/types/types";

// GET /api/auth/google/callback: OAuth 인증 후 세션/CSRF 쿠키 설정 및 리다이렉트
export async function GET(request: NextRequest) {
  try {
    // 요청 파라미터 체크
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const stateParam = searchParams.get("state");

    // PKCE 쿠키 체크
    const publicUrl = getPublicURL();

    if (!code || !stateParam) {
      const errorUrl = new URL("/signin", publicUrl);
      errorUrl.searchParams.set("error", "invalid_request");
      errorUrl.searchParams.set(
        "message",
        "잘못된 요청입니다. 다시 시도해주세요.",
      );
      return NextResponse.redirect(errorUrl);
    }
    const { savedState, codeVerifier, cookieStore } = await checkPKCECookies();
    if (!savedState || savedState !== stateParam || !codeVerifier) {
      // PKCE 쿠키는 10분이 적당한 것으로 보입니다.
      // 사용자가 자리를 비울경우 여기는 callback 라우트이므로
      // 클라이언트로 에러를 반환시 화면에 아무것도 보이지 않게 되므로 리디렉션 하는게 좋을 것 같습니다.
      // 로그인 페이지로 리다이렉트 + 서치파라미터로 에러 메시지전달
      const errorUrl = new URL("/signin", publicUrl);
      errorUrl.searchParams.set("error", "session_expired");
      errorUrl.searchParams.set(
        "message",
        "로그인 시간이 만료되었습니다. 다시 시도해주세요.",
      );

      return NextResponse.redirect(errorUrl);
    }

    // state 파싱 및 검증
    let state: {
      redirect_uri: string;
      register_uri: string;
      nonce: string;
    };
    try {
      state = JSON.parse(decodeURIComponent(stateParam));
    } catch (error) {
      const errorUrl = new URL("/signin", publicUrl);
      errorUrl.searchParams.set("error", "invalid_state");
      errorUrl.searchParams.set(
        "message",
        "잘못된 상태 정보입니다. 다시 시도해주세요.",
      );
      return NextResponse.redirect(errorUrl);
    }

    // URL 검증 - Open Redirect 방지
    const allowedDomains = [
      new URL(publicUrl).hostname,
      "localhost",
      "127.0.0.1",
      // 프로덕션 도메인 추가 가능
    ];

    if (
      !isValidUrl(state.redirect_uri, allowedDomains) ||
      !isValidUrl(state.register_uri, allowedDomains)
    ) {
      const errorUrl = new URL("/signin", publicUrl);
      errorUrl.searchParams.set("error", "invalid_redirect_uri");
      errorUrl.searchParams.set(
        "message",
        "잘못된 리다이렉트 URL입니다. 다시 시도해주세요.",
      );
      return NextResponse.redirect(errorUrl);
    }

    // 토큰 교환 (Authorization Code + PKCE + client_secret)
    // redirect_uri는 인증 요청 시 사용한 것과 동일한 절대 URL이어야 함
    const googleCallbackUrl = `${publicUrl}/api/auth/google/callback`;

    const tokens = await exchangeToken({
      requestUrl: "https://oauth2.googleapis.com/token",
      code,
      codeVerifier,
      redirectUri: googleCallbackUrl,
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    });

    if (!tokens) {
      const errorUrl = new URL("/signin", publicUrl);
      errorUrl.searchParams.set("error", "token_exchange_failed");
      errorUrl.searchParams.set(
        "message",
        "토큰 교환에 실패했습니다. 다시 시도해주세요.",
      );
      return NextResponse.redirect(errorUrl);
    }

    if (!tokens.accessToken) {
      const errorUrl = new URL("/signin", publicUrl);
      errorUrl.searchParams.set("error", "no_access_token");
      errorUrl.searchParams.set(
        "message",
        "액세스 토큰을 받지 못했습니다. 다시 시도해주세요.",
      );
      return NextResponse.redirect(errorUrl);
    }

    // 유저 정보 가져오기
    const userInfoResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      },
    );

    if (!userInfoResponse.ok) {
      const errorUrl = new URL("/signin", publicUrl);
      errorUrl.searchParams.set("error", "user_info_failed");
      errorUrl.searchParams.set(
        "message",
        "사용자 정보를 가져오는데 실패했습니다. 다시 시도해주세요.",
      );
      return NextResponse.redirect(errorUrl);
    }

    const googleUser: GoogleUser = await userInfoResponse.json();

    // Hasura에서 유저 확인
    const client = getAdminClient();
    const { data: hasuraUser } = await client.query<
      GetUserByEmailQuery,
      GetUserByEmailQueryVariables
    >({
      query: GET_USER_BY_EMAIL,
      variables: { email: googleUser.email },
    });

    const foundUserByEmail = hasuraUser?.user?.[0];

    let userId: string = "";
    let shouldRedirectToRegister = false;
    let tokenId: string | null = null;

    // Refresh Token이 있는 경우에만 토큰 객체 생성
    const tokenObject = tokens.refreshToken
      ? {
          user_id: "", // 나중에 설정
          expired_at: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        }
      : null;

    // 사용자 확인 및 처리 (트랜잭션 방식)
    if (foundUserByEmail) {
      // Case 1: 이메일로 이미 등록된 사용자인데 다른 provider로 로그인 된 경우
      if (foundUserByEmail.provider !== "GOOGLE") {
        if (tokenObject) {
          // Provider 업데이트 + Refresh Token 생성 (트랜잭션)
          tokenObject.user_id = foundUserByEmail.id;
          const { data: updatedUser, error: updateError } = await client.mutate<
            UpdateUserProviderWithTokenMutation,
            UpdateUserProviderWithTokenMutationVariables
          >({
            mutation: UPDATE_USER_PROVIDER_WITH_TOKEN,
            variables: {
              email: googleUser.email,
              provider: "GOOGLE",
              provider_id: googleUser.sub,
              tokenObject,
            },
          });

          if (
            updateError ||
            !updatedUser?.update_user?.returning?.[0] ||
            !updatedUser?.insert_user_tokens_one?.id
          ) {
            const errorUrl = new URL("/signin", publicUrl);
            errorUrl.searchParams.set("error", "user_update_failed");
            errorUrl.searchParams.set(
              "message",
              "사용자 정보 업데이트에 실패했습니다. 다시 시도해주세요.",
            );
            return NextResponse.redirect(errorUrl);
          }

          userId = updatedUser.update_user.returning[0].id;
          tokenId = updatedUser.insert_user_tokens_one.id;
        } else {
          // Refresh Token이 없는 경우 기존 방식으로 처리
          const errorUrl = new URL("/signin", publicUrl);
          errorUrl.searchParams.set("error", "no_refresh_token");
          errorUrl.searchParams.set(
            "message",
            "리프레시 토큰이 필요합니다. 다시 시도해주세요.",
          );
          return NextResponse.redirect(errorUrl);
        }
      } else {
        // 이미 구글로 등록된 사용자
        userId = foundUserByEmail.id;
        if (tokenObject) {
          tokenObject.user_id = userId;
          // 기존 사용자에 Refresh Token만 추가
          const { data: tokenData, error: tokenError } = await client.mutate<
            RegisterUserWithTokenMutation,
            RegisterUserWithTokenMutationVariables
          >({
            mutation: REGISTER_USER_WITH_TOKEN,
            variables: {
              userObject: { id: userId }, // 빈 객체로 기존 사용자 유지
              tokenObject,
            },
          });

          if (!tokenError && tokenData?.insert_user_tokens_one?.id) {
            tokenId = tokenData.insert_user_tokens_one.id;
          }
        }
      }
    } else {
      // Case 2: 이메일로 찾아지지 않은 경우, 유저 생성
      if (tokenObject) {
        // Race Condition 방지를 위한 재시도 로직
        let retryCount = 0;
        const maxRetries = 3;
        let userCreated = false;

        while (retryCount < maxRetries && !userCreated) {
          try {
            // 사용자 생성 + Refresh Token 생성 (트랜잭션)
            const { data: newUser, error: createUserError } =
              await client.mutate<
                RegisterUserWithTokenMutation,
                RegisterUserWithTokenMutationVariables
              >({
                mutation: REGISTER_USER_WITH_TOKEN,
                variables: {
                  userObject: {
                    email: googleUser.email,
                    provider: "GOOGLE",
                    provider_id: googleUser.sub,
                  },
                  tokenObject: {
                    user_id: "", // Hasura가 자동으로 설정
                    expired_at: tokenObject.expired_at,
                  },
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
                    variables: { email: googleUser.email },
                  });

                  const retryFoundUser = retryUser?.user?.[0];
                  if (retryFoundUser) {
                    // 다른 요청에서 이미 사용자를 생성한 경우
                    userId = retryFoundUser.id;
                    if (tokenObject) {
                      tokenObject.user_id = userId;
                      // 기존 사용자에 Refresh Token만 추가
                      const { data: tokenData, error: tokenError } =
                        await client.mutate<
                          RegisterUserWithTokenMutation,
                          RegisterUserWithTokenMutationVariables
                        >({
                          mutation: REGISTER_USER_WITH_TOKEN,
                          variables: {
                            userObject: { id: userId },
                            tokenObject,
                          },
                        });

                      if (
                        !tokenError &&
                        tokenData?.insert_user_tokens_one?.id
                      ) {
                        tokenId = tokenData.insert_user_tokens_one.id;
                      }
                    }
                    userCreated = true;
                    break;
                  }
                  continue;
                }
              }

              // 다른 종류의 오류인 경우
              const errorUrl = new URL("/signin", publicUrl);
              errorUrl.searchParams.set("error", "user_creation_failed");
              errorUrl.searchParams.set(
                "message",
                "사용자 생성에 실패했습니다. 다시 시도해주세요.",
              );
              return NextResponse.redirect(errorUrl);
            }

            if (
              !newUser?.insert_user_one ||
              !newUser?.insert_user_tokens_one?.id
            ) {
              const errorUrl = new URL("/signin", publicUrl);
              errorUrl.searchParams.set("error", "user_creation_failed");
              errorUrl.searchParams.set(
                "message",
                "사용자 생성에 실패했습니다. 다시 시도해주세요.",
              );
              return NextResponse.redirect(errorUrl);
            }

            userId = newUser.insert_user_one.id;
            tokenId = newUser.insert_user_tokens_one.id;
            shouldRedirectToRegister = true; // 추가 정보 입력 페이지로 이동 필요
            userCreated = true;
          } catch (error) {
            retryCount++;
            if (retryCount >= maxRetries) {
              const errorUrl = new URL("/signin", publicUrl);
              errorUrl.searchParams.set("error", "user_creation_failed");
              errorUrl.searchParams.set(
                "message",
                "사용자 생성에 실패했습니다. 다시 시도해주세요.",
              );
              return NextResponse.redirect(errorUrl);
            }
            // 잠시 대기 후 재시도
            await new Promise((resolve) =>
              setTimeout(resolve, 100 * retryCount),
            );
          }
        }

        if (!userCreated) {
          const errorUrl = new URL("/signin", publicUrl);
          errorUrl.searchParams.set("error", "user_creation_failed");
          errorUrl.searchParams.set(
            "message",
            "사용자 생성에 실패했습니다. 다시 시도해주세요.",
          );
          return NextResponse.redirect(errorUrl);
        }
      } else {
        // Refresh Token이 없는 경우 기존 방식으로 처리
        const errorUrl = new URL("/signin", publicUrl);
        errorUrl.searchParams.set("error", "no_refresh_token");
        errorUrl.searchParams.set(
          "message",
          "리프레시 토큰이 필요합니다. 다시 시도해주세요.",
        );
        return NextResponse.redirect(errorUrl);
      }
    }

    // 등록된 유저면 JWT 생성
    const jwt = await signJWTToken({
      sub: userId,
      email: googleUser.email,
      minutes: 10,
    });

    // Refresh Token이 없는 경우 로그 메시지
    if (!tokens.refreshToken) {
      console.warn(
        "구글로부터 리프레시 토큰을 받지 못했습니다. 이는 정상적인 상황일 수 있습니다.",
      );
    }

    // 쿠키 설정 (DB 저장 성공 후)
    // Access Token (JWT)
    // ** JWT는 10분 만료, 쿠키는 30일 유지 → JWT 만료 시 자동 refresh 가능
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

    // 리다이렉트
    if (shouldRedirectToRegister) {
      // 추가 정보 입력 필요 → register 페이지로
      return NextResponse.redirect(
        `${state.register_uri}?email=${googleUser.email}&provider=GOOGLE`,
      );
    }
    // 완전히 등록된 유저 → 원래 목적지로
    return NextResponse.redirect(state.redirect_uri);
  } catch (error) {
    console.error("구글 콜백 에러 ====>", error);
    const errorUrl = new URL("/signin", getPublicURL());
    errorUrl.searchParams.set("error", "callback_failed");
    errorUrl.searchParams.set(
      "message",
      "로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
    );
    return NextResponse.redirect(errorUrl);
  }
}
