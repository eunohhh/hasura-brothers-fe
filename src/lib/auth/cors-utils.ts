import "server-only";
import { type NextRequest, NextResponse } from "next/server";

/**
 * 같은 도메인에서만 API 요청을 허용하는 유틸리티
 * - CSRF 토큰과 함께 사용하여 이중 보안
 * - OAuth 콜백은 제외 (Google, Kakao로부터의 리다이렉트)
 */
export function checkSameOrigin(request: NextRequest): {
  isAllowed: boolean;
  error: NextResponse | null;
} {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  // Origin 헤더가 없는 경우 (같은 도메인 또는 직접 요청)
  if (!origin) {
    return { isAllowed: true, error: null };
  }

  // Origin과 Host 비교
  try {
    const originUrl = new URL(origin);
    const isAllowed = originUrl.host === host;

    if (!isAllowed) {
      return {
        isAllowed: false,
        error: NextResponse.json(
          { error: "Cross-origin requests are not allowed" },
          {
            status: 403,
            headers: {
              "Access-Control-Allow-Origin": origin,
              "Access-Control-Allow-Methods": "POST, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
            },
          },
        ),
      };
    }

    return { isAllowed: true, error: null };
  } catch {
    return {
      isAllowed: false,
      error: NextResponse.json({ error: "Invalid origin" }, { status: 400 }),
    };
  }
}

/**
 * CORS 헤더를 설정하여 같은 도메인만 허용
 */
export function createCorsHeaders(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  // Same-Origin 검증: origin과 host가 일치하는 경우만 허용
  let allowedOrigin: string | null = null;

  if (origin && host) {
    try {
      const originUrl = new URL(origin);
      if (originUrl.host === host) {
        allowedOrigin = origin;
      }
    } catch {
      // Invalid origin URL - 허용하지 않음
      allowedOrigin = null;
    }
  }

  return {
    "Access-Control-Allow-Origin": allowedOrigin || "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-CSRF-Token",
    "Access-Control-Allow-Credentials": "true",
  };
}

/**
 * OPTIONS 요청 처리 (Preflight)
 */
export function handleCorsPreFlight(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 204,
      headers: createCorsHeaders(request),
    },
  );
}
