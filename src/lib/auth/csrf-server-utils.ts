import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { COMMON_CONSTS } from "@/lib/constants/consts-common";

// CSRF 토큰 비교
function compareTokens(expected: string, received: string): boolean {
  if (expected.length !== received.length) {
    return false;
  }

  const expectedBytes = new TextEncoder().encode(expected);
  const receivedBytes = new TextEncoder().encode(received);

  let result = 0;
  for (let i = 0; i < expectedBytes.length; i++) {
    result |= expectedBytes[i] ^ receivedBytes[i];
  }

  return result === 0;
}

/**
 * CSRF 토큰 검증 (미들웨어용 - Edge Runtime 호환)
 * - Internal Request는 검증 건너뛰기
 * - 토큰이 없거나 일치하지 않으면 403 에러 응답 반환
 * - 검증 성공 시 null 반환
 */
export function validateCsrfToken(request: NextRequest): NextResponse | null {
  // Internal Request는 CSRF 체크 건너뛰기
  const isInternalRequest =
    request.headers
      .get(COMMON_CONSTS.HEADER_INTERNAL_REQUEST)
      ?.toLowerCase() === "1";

  if (isInternalRequest) {
    return null;
  }

  const headerToken = request.headers.get(COMMON_CONSTS.HEADER_CSRF_TOKEN);
  const cookieToken = request.cookies.get(COMMON_CONSTS.CSRF_TOKEN)?.value;

  if (!headerToken || !cookieToken) {
    return NextResponse.json({ error: "CSRF 토큰 누락" }, { status: 403 });
  }

  // Edge Runtime용 비교 함수 사용
  if (!compareTokens(cookieToken, headerToken)) {
    return NextResponse.json({ error: "CSRF 토큰 불일치" }, { status: 403 });
  }

  return null;
}

function createCsrfToken() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

// 쿠키에 저장된 CSRF 토큰을 새 값으로 교체 - 미들웨어에서 첫 방문시 무조건 지급
export async function rotateCsrfCookie() {
  const jar = await cookies();
  const token = createCsrfToken();

  jar.set(COMMON_CONSTS.CSRF_TOKEN, token, {
    path: "/",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24시간
  });

  return token;
}
