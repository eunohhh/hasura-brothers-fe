// CSRF 토큰 발급 및 검증 유틸리티 모음
import { Buffer } from "node:buffer";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SERVER_CONSTS } from "@/constants/server.consts";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function createCsrfToken() {
  return randomBytes(32).toString("hex");
}

function compareTokens(expected: string, received: string) {
  if (expected.length !== received.length) {
    return false;
  }

  return timingSafeEqual(
    Buffer.from(expected, "utf8"),
    Buffer.from(received, "utf8"),
  );
}

// 쿠키에 저장된 CSRF 토큰을 새 값으로 교체
export async function rotateCsrfCookie() {
  const jar = await cookies();
  const token = createCsrfToken();

  jar.set(SERVER_CONSTS.COOKIE_CSRF_TOKEN, token, {
    path: "/",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });

  return token;
}

type Handler<TArgs extends unknown[] = []> = (
  request: NextRequest,
  ...args: TArgs
) => Promise<NextResponse> | NextResponse;

interface CsrfOptions {
  ignoreMethods?: string[];
  rotateOnSuccess?: boolean;
}

function shouldIgnore(method: string, ignore?: Set<string>) {
  const upper = method.toUpperCase();
  return SAFE_METHODS.has(upper) || (ignore?.has(upper) ?? false);
}

// 요청 헤더와 쿠키의 토큰을 비교해 일치할 때만 실제 핸들러를 실행
export function withCsrfProtection<TArgs extends unknown[]>(
  handler: Handler<TArgs>,
  options?: CsrfOptions,
) {
  const ignored = options?.ignoreMethods
    ? new Set(options.ignoreMethods.map((method) => method.toUpperCase()))
    : undefined;

  return async (request: NextRequest, ...args: TArgs) => {
    if (shouldIgnore(request.method, ignored)) {
      return handler(request, ...args);
    }

    if (
      request.headers
        .get(SERVER_CONSTS.HEADER_INTERNAL_REQUEST)
        ?.toLowerCase() === "1"
    ) {
      return handler(request, ...args);
    }

    const headerToken = request.headers.get(SERVER_CONSTS.HEADER_CSRF_TOKEN);
    const cookieToken = request.cookies.get(
      SERVER_CONSTS.COOKIE_CSRF_TOKEN,
    )?.value;

    if (!headerToken || !cookieToken) {
      return NextResponse.json(
        { error: "Invalid CSRF token" },
        {
          status: 403,
        },
      );
    }

    if (!compareTokens(cookieToken, headerToken)) {
      return NextResponse.json(
        { error: "Invalid CSRF token" },
        {
          status: 403,
        },
      );
    }

    const response = await handler(request, ...args);

    if (options?.rotateOnSuccess) {
      const jar = await cookies();
      const token = createCsrfToken();
      jar.set(SERVER_CONSTS.COOKIE_CSRF_TOKEN, token, {
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
      });
    }

    return response;
  };
}
