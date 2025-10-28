import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { GetRefreshTokenByPkQuery } from "@/generated/graphql";
import { GET_REFRESH_TOKEN_BY_PK } from "@/graphql/queries";
import { getAdminClient } from "@/lib/apollo/server-admin";
import { rotateCsrfCookie } from "@/lib/auth/csrf-server-utils";
import { signJWTToken } from "@/lib/auth/token-server-utils";
import {
  COMMON_CONSTS,
  OAUTH_ERROR_MESSAGES,
} from "@/lib/constants/consts-common";

// GET /api/auth/refresh: 저장된 refresh 토큰으로 새 access 토큰을 발급
export async function GET() {
  try {
    // 쿠키의 리프레시 토큰 값 가져오기
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(COMMON_CONSTS.COOKIE_REFRESH_TOKEN); // ✅ UUID 가져오기

    // TODO: 쿠키 값이 없을 경우 에러 처리 - 중요: 재로그인으로 이동해야 함
    if (!refreshToken || !refreshToken.value) {
      return NextResponse.json(
        {
          error: OAUTH_ERROR_MESSAGES.NO_REFRESH_TOKEN_FOUND,
          requiresReauth: true,
        },
        { status: 401 },
      );
    }

    // 현재 refresh Token(uuid)로 DB에서 리프레시 토큰 조회
    const client = getAdminClient();
    const { data: refreshTokenData, error } =
      await client.query<GetRefreshTokenByPkQuery>({
        query: GET_REFRESH_TOKEN_BY_PK,
        variables: { id: refreshToken.value },
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 토큰이 아예 없을 경우(삭제되었거나 존재하지 않음)
    if (!refreshTokenData || !refreshTokenData.user_tokens_by_pk) {
      return NextResponse.json(
        {
          error: OAUTH_ERROR_MESSAGES.NO_REFRESH_TOKEN_FOUND,
          requiresReauth: true,
        },
        { status: 401 },
      );
    }

    const storedToken = refreshTokenData.user_tokens_by_pk;

    // expired_at 체크 - 만료된 리프레시 토큰 처리
    const now = new Date();
    const expiresAt = new Date(storedToken.expired_at);
    const isExpired = expiresAt <= now;

    // ✅ 만료된 경우 재인증 요청
    if (isExpired) {
      // 삭제는 하지 않고(cron job으로 주기적으로 삭제) 재인증 요구 필수
      return NextResponse.json(
        {
          error: OAUTH_ERROR_MESSAGES.REFRESH_TOKEN_EXPIRED,
          requiresReauth: true,
        },
        { status: 401 },
      );
    }

    // ✅ 만료되지 않은 경우: 새 access token(JWT)만 발급 (refresh token은 재사용)
    // email 없을 경우 에러처리
    if (!refreshTokenData.user_tokens_by_pk.user.email) {
      return NextResponse.json(
        { error: OAUTH_ERROR_MESSAGES.USER_EMAIL_NOT_FOUND },
        { status: 500 },
      );
    }

    // 새로운 access token(JWT) 생성
    const newJwt = await signJWTToken({
      sub: refreshTokenData.user_tokens_by_pk.user_id,
      email: refreshTokenData.user_tokens_by_pk.user.email,
      minutes: 10,
    });

    // Access Token 쿠키 업데이트
    // ** JWT는 10분 만료, 쿠키는 refresh token 만료 시간과 동일하게 유지
    // → JWT 만료 시에도 쿠키는 남아있어 자동 refresh 가능
    cookieStore.set(COMMON_CONSTS.COOKIE_ACCESS_TOKEN, newJwt, {
      path: "/",
      maxAge: Math.floor((expiresAt.getTime() - now.getTime()) / 1000), // refresh token 남은 시간
      httpOnly: true,
      secure: true, // HTTPS 필수 (개발 환경도 HTTPS 사용)
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
    });

    // CSRF 토큰 로테이션
    await rotateCsrfCookie();

    // 성공 응답
    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("리프레시 토큰 갱신 에러 ====>", error);
    return NextResponse.json(
      { error: OAUTH_ERROR_MESSAGES.FAILED_TO_REFRESH_TOKEN },
      { status: 500 },
    );
  }
}
