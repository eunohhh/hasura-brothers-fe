import { SERVER_CONSTS } from "@/constants/server.consts";
import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function setCsrfCookieIfMissing(request: NextRequest, response: NextResponse) {
  if (request.cookies.get(SERVER_CONSTS.COOKIE_CSRF_TOKEN)) {
    return response;
  }

  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  const token = Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");

  response.cookies.set(SERVER_CONSTS.COOKIE_CSRF_TOKEN, token, {
    path: "/",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });

  return response;
}

function respond(request: NextRequest, response: NextResponse) {
  return setCsrfCookieIfMissing(request, response);
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(SERVER_CONSTS.COOKIE_AUTH_TOKEN);
  const internalHeaders: Record<string, string> = {
    Cookie: request.headers.get("cookie") || "",
  };

  internalHeaders[SERVER_CONSTS.HEADER_INTERNAL_REQUEST] = "1";

  // authed 폴더 안의 페이지는 로그인 페이지로 리다이렉트
  if (!token && request.nextUrl.pathname.startsWith("/authed")) {
    // 로그인 페이지로 리다이렉트하면서 원래 가려던 페이지 저장
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return respond(request, NextResponse.redirect(loginUrl));
    }

    try {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.HASURA_JWT_SECRET!),
      );

      // ✅ 만료 5분 전이면 자동 갱신 시도
      const exp = verified.payload.exp!;
      const now = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = exp - now;

      if (timeUntilExpiry < 5 * 60) {
        // 5분 미만 남음
        // 백그라운드에서 갱신 (응답에는 영향 없음)
        fetch(new URL("/api/auth/refresh", request.url), {
          method: "POST",
          headers: internalHeaders,
        }).catch(console.error);
      }

      return respond(request, NextResponse.next());
    } catch (error) {
      // 토큰 만료 - refresh 시도
      const refreshResponse = await fetch(
        new URL("/api/auth/refresh", request.url),
        {
          method: "POST",
          headers: internalHeaders,
        },
      );

      if (refreshResponse.ok) {
        // 갱신 성공 - 요청 계속 진행
        const response = NextResponse.next();

        // 새 토큰을 쿠키에 설정
        const setCookieHeader = refreshResponse.headers.get("set-cookie");
        if (setCookieHeader) {
          response.headers.set("set-cookie", setCookieHeader);
        }

        return respond(request, response);
      } else {
        // 갱신 실패 - 로그인 페이지로
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
        loginUrl.searchParams.set("session_expired", "true");
        return respond(request, NextResponse.redirect(loginUrl));
      }
    }
  }

  return respond(request, NextResponse.next());
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
