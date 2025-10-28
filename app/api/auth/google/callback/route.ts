import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { env } from "@/env";
import {
  GetUserByEmailQuery,
  GetUserByEmailQueryVariables,
  RegisterUserMutation,
  RegisterUserMutationVariables,
  SaveRefreshTokenMutation,
  SaveRefreshTokenMutationVariables,
  UpdateUserByProviderMutation,
  UpdateUserByProviderMutationVariables,
} from "@/generated/graphql";
import {
  REGISTER_USER,
  SAVE_REFRESH_TOKEN,
  UPDATE_USER_BY_PROVIDER,
} from "@/graphql/mutations";
import { GET_USER_BY_EMAIL } from "@/graphql/queries";
import { getAdminClient } from "@/lib/apollo/server-admin";
import { getPublicURL } from "@/lib/auth/common-utils";
import { rotateCsrfCookie } from "@/lib/auth/csrf-server-utils";
import { checkPKCECookies } from "@/lib/auth/pkce-utils";
import { exchangeToken } from "@/lib/auth/server-utils";
import { signJWTToken } from "@/lib/auth/token-server-utils";
import {
  COMMON_CONSTS,
  OAUTH_ERROR_MESSAGES,
} from "@/lib/constants/consts-common";
import type { GoogleUser } from "@/types/types";

// GET /api/auth/google/callback: OAuth 인증 후 세션/CSRF 쿠키 설정 및 리다이렉트
export async function GET(request: NextRequest) {
  try {
    // 요청 파라미터 체크
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const stateParam = searchParams.get("state");

    if (!code || !stateParam) {
      return NextResponse.json(
        { error: OAUTH_ERROR_MESSAGES.INVALID_REQUEST },
        { status: 400 },
      );
    }

    // PKCE 쿠키 체크
    const publicUrl = getPublicURL();
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
      return NextResponse.json(
        { error: OAUTH_ERROR_MESSAGES.INVALID_STATE_FORMAT },
        { status: 400 },
      );
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
      return NextResponse.json(
        { error: OAUTH_ERROR_MESSAGES.FAILED_TO_GET_TOKENS },
        { status: 500 },
      );
    }

    if (!tokens.accessToken) {
      return NextResponse.json(
        { error: OAUTH_ERROR_MESSAGES.FAILED_TO_GET_ACCESS_TOKEN },
        { status: 500 },
      );
    }

    // 유저 정보 가져오기
    const userInfoResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      },
    );

    if (!userInfoResponse.ok) {
      return NextResponse.json(
        { error: OAUTH_ERROR_MESSAGES.FAILED_TO_GET_USER_INFO },
        { status: 500 },
      );
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

    let userId: string;
    let shouldRedirectToRegister = false;
    // 사용자 확인 및 처리
    if (foundUserByEmail) {
      // Case 1: 이메일로 이미 등록된 사용자인데 카카오로 로그인 된 경우(provider가 구글이 아닌 경우)
      if (foundUserByEmail.provider !== "GOOGLE") {
        // Provider 업데이트
        const { data: updatedUser, error: updateError } = await client.mutate<
          UpdateUserByProviderMutation,
          UpdateUserByProviderMutationVariables
        >({
          mutation: UPDATE_USER_BY_PROVIDER,
          variables: {
            email: googleUser.email,
            provider: "GOOGLE",
            provider_id: googleUser.sub,
          },
        });
        if (updateError || !updatedUser?.update_user?.returning?.[0]) {
          return NextResponse.json(
            { error: OAUTH_ERROR_MESSAGES.FAILED_TO_UPDATE_USER },
            { status: 500 },
          );
        }
        userId = updatedUser.update_user.returning[0].id;
        // 구글로 로그인 된 경우
      } else {
        userId = foundUserByEmail.id;
      }
    } else {
      // Case 2: 이메일로 찾아지지 않은 경우, 유저 생성
      const { data: newUser, error: createUserError } = await client.mutate<
        RegisterUserMutation,
        RegisterUserMutationVariables
      >({
        mutation: REGISTER_USER,
        variables: {
          email: googleUser.email,
          provider: "GOOGLE",
          provider_id: googleUser.sub,
        },
      });

      if (createUserError || !newUser?.insert_user_one) {
        return NextResponse.json(
          { error: OAUTH_ERROR_MESSAGES.FAILED_TO_CREATE_PI },
          { status: 500 },
        );
      }

      userId = newUser.insert_user_one.id;
      shouldRedirectToRegister = true; // 추가 정보 입력 페이지로 이동 필요
    }

    // 등록된 유저면 JWT 생성
    const jwt = await signJWTToken({
      sub: userId,
      email: googleUser.email,
      minutes: 10,
    });

    // 새 Refresh Token 생성 및 저장 (쿠키 설정 전에 먼저 처리)
    let tokenId: string | null = null;

    // Google은 최초 인증 시에만 refresh_token을 반환
    if (tokens.refreshToken) {
      try {
        // ✅ 만료 시간 설정 (30일)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        const { data: newRefreshToken, error: refreshTokenError } =
          await client.mutate<
            SaveRefreshTokenMutation,
            SaveRefreshTokenMutationVariables
          >({
            mutation: SAVE_REFRESH_TOKEN,
            variables: {
              object: {
                user_id: userId,
                expired_at: expiresAt.toISOString(), // ✅ ISO 문자열
              },
            },
          });

        if (refreshTokenError || !newRefreshToken?.insert_user_tokens_one?.id) {
          return NextResponse.json(
            { error: OAUTH_ERROR_MESSAGES.FAILED_TO_CREATE_REFRESH_TOKEN },
            { status: 500 },
          );
        }

        tokenId = newRefreshToken.insert_user_tokens_one.id;
      } catch (error) {
        return NextResponse.json(
          { error: OAUTH_ERROR_MESSAGES.FAILED_TO_CREATE_REFRESH_TOKEN },
          { status: 500 },
        );
      }
    } else {
      // ⚠️ Google이 refresh_token을 반환하지 않은 경우
      // 이미 인증된 계정이거나, OAuth 설정 문제일 수 있음
      console.warn("구글로 부터 리프레시 토큰을 받지 못했습니다.");
      // 에러 반환 (엄격)
      return NextResponse.json(
        { error: OAUTH_ERROR_MESSAGES.NO_REFRESH_TOKEN_RECEIVED },
        { status: 500 },
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

    if (!tokenId) {
      return NextResponse.json(
        { error: OAUTH_ERROR_MESSAGES.NO_REFRESH_TOKEN_RECEIVED },
        { status: 500 },
      );
    }

    // Refresh Token UUID 로 쿠키 설정
    cookieStore.set(COMMON_CONSTS.COOKIE_REFRESH_TOKEN, tokenId, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30일
      httpOnly: true,
      secure: true, // HTTPS 필수 (개발 환경도 HTTPS 사용)
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
    });

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
    return NextResponse.json(
      { error: OAUTH_ERROR_MESSAGES.FAILED_TO_TRY_CALLBACK },
      { status: 500 },
    );
  }
}
