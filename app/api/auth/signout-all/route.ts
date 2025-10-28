import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { REVOKE_REFRESH_TOKEN_ALL } from "@/graphql/mutations";
import { getAdminClient } from "@/lib/apollo/server-admin";
import { rotateCsrfCookie } from "@/lib/auth/csrf-server-utils";
import { verifyJWTToken } from "@/lib/auth/token-server-utils";
import {
  COMMON_CONSTS,
  OAUTH_ERROR_MESSAGES,
} from "@/lib/constants/consts-common";

// DELETE /api/auth/signout-all: 모든 기기의 refresh 토큰 expired_at 업데이트하고 세션을 초기화
export async function DELETE() {
  try {
    // Access Token에서 userId 추출
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(
      COMMON_CONSTS.COOKIE_ACCESS_TOKEN,
    )?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: OAUTH_ERROR_MESSAGES.NO_ACCESS_TOKEN_FOUND },
        { status: 401 },
      );
    }

    // JWT에서 userId 추출
    const verified = await verifyJWTToken(accessToken);

    const claims = verified.payload["https://hasura.io/jwt/claims"] as {
      "x-hasura-user-id": string;
    };
    const userId = claims["x-hasura-user-id"];

    // 사용자의 모든 활성 세션 expired_at 업데이트 (expired_at을 과거로 설정)
    const client = getAdminClient();
    const pastDate = new Date(0).toISOString(); // 1970-01-01 (과거 날짜)
    const result = await client.mutate({
      mutation: REVOKE_REFRESH_TOKEN_ALL,
      variables: { userId, expired_at: pastDate },
    });

    // expired_at 업데이트된 세션 수 확인
    const expiredCount =
      (result.data as any)?.update_refresh_token?.affected_rows || 0;
    console.log(`Updated ${expiredCount} sessions for user ${userId}`);

    // 현재 쿠키 삭제
    cookieStore.delete(COMMON_CONSTS.COOKIE_ACCESS_TOKEN);
    cookieStore.delete(COMMON_CONSTS.COOKIE_REFRESH_TOKEN);

    // CSRF 로테이션
    await rotateCsrfCookie();

    // 성공 응답
    return NextResponse.json({
      success: true,
      expiredSessions: expiredCount,
    });
  } catch (error) {
    console.error("모든 기기 로그아웃 에러 ====>", error);
    return NextResponse.json(
      { error: OAUTH_ERROR_MESSAGES.FAILED_TO_LOGOUT_ALL },
      { status: 500 },
    );
  }
}
