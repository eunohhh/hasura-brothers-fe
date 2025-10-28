import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { REVOKE_REFRESH_TOKEN } from "@/graphql/mutations";
import { getAdminClient } from "@/lib/apollo/server-admin";
import { rotateCsrfCookie } from "@/lib/auth/csrf-server-utils";
import {
  COMMON_CONSTS,
  OAUTH_ERROR_MESSAGES,
} from "@/lib/constants/consts-common";

// DELETE /api/auth/signout: 현재 세션과 refresh 토큰을 정리한 뒤 CSRF 토큰을 갱신
export async function DELETE() {
  try {
    // 2️⃣ Refresh Token 쿠키 읽기
    const cookieStore = await cookies();
    const tokenId = cookieStore.get(COMMON_CONSTS.COOKIE_REFRESH_TOKEN)?.value;

    // 3️⃣ DB에서 expired_at 업데이트 (소프트 삭제)
    if (tokenId) {
      const client = getAdminClient();
      await client.mutate({
        mutation: REVOKE_REFRESH_TOKEN,
        variables: { id: tokenId, expired_at: new Date().toISOString() },
      });
    }

    // 4️⃣ 쿠키 삭제 (Access + Refresh Token만)
    cookieStore.delete(COMMON_CONSTS.COOKIE_ACCESS_TOKEN);
    cookieStore.delete(COMMON_CONSTS.COOKIE_REFRESH_TOKEN);

    // 5️⃣ CSRF 로테이션 (삭제 하면 안됨~!)
    await rotateCsrfCookie();

    // 6️⃣ Success 반환
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("로그아웃 에러 ====>", error);
    return NextResponse.json(
      { error: OAUTH_ERROR_MESSAGES.FAILED_TO_LOGOUT },
      { status: 500 },
    );
  }
}
