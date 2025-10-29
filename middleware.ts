import { type NextRequest, NextResponse } from "next/server";
import { env } from "./env";
import { checkSameOrigin, handleCorsPreFlight } from "@/lib/auth/cors-utils";
import { validateCsrfToken } from "@/lib/auth/csrf-server-utils";
import { COMMON_CONSTS } from "@/lib/constants/consts-common";
import { verifyJWTToken } from "@/lib/auth/token-server-utils";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
const PUBLIC_ONLY_ROUTES = new Set(["/signin"]);

/**
 * Next.js 미들웨어
 *
 * 이 함수는 지정된 경로(`matcher` 참고)에 대한 모든 요청 이전에 실행됩니다.
 * 주요 역할:
 * 1. API 보안 강화: CORS, Same-Origin, CSRF 공격 방지
 * 2. CSRF 토큰 발급: 모든 사용자에게 CSRF 토큰 쿠키를 보장
 * 3. 인증 관리: 특정 경로에 대한 사용자 인증 상태를 확인하고 필요시 로그인 페이지로 리디렉션
 */
export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const { method } = request;

	/** 1. API 경로 보안 처리
	 * /api/로 시작하는 모든 요청에 대해 보안 검사를 수행합니다.
	 * (단, matcher에서 OAuth 콜백 경로는 제외되어 이 로직을 통과하지 않습니다.)
	 */
	if (pathname.startsWith("/api/")) {
		/**
		 * CORS Preflight 요청 처리
		 * 브라우저가 본 요청을 보내기 전에 OPTIONS 메서드로 전송하여 서버의 허용 정책을 확인합니다.
		 * 이 요청에 대해서는 바로 204 No Content 응답과 함께 CORS 헤더를 반환합니다.
		 */
		if (method === "OPTIONS") {
			return handleCorsPreFlight(request);
		}

		/**
		 * Same-Origin 검증 (CSRF 방어 보조)
		 * 요청의 Origin 헤더와 Host 헤더가 일치하는지 확인하여, 허용된 도메인에서의 요청인지를 검증합니다.
		 * 이를 통해 다른 도메인에서 API를 직접 호출하는 것을 방지합니다.
		 */
		const originCheck = checkSameOrigin(request);
		if (!originCheck.isAllowed && originCheck.error !== null) {
			return originCheck.error; // 불일치 시 403 Forbidden 응답
		}

		/**
		 * CSRF 토큰 검증
		 * GET, HEAD, OPTIONS와 같이 서버 상태를 변경하지 않는 '안전한' 메서드를 제외한 모든 요청에 대해,
		 * 클라이언트가 보낸 CSRF 토큰(HTTP 헤더)과 쿠키의 토큰이 유효한지 검증합니다.
		 * 이를 통해 사용자가 의도하지 않은 요청(예: 글쓰기, 삭제)을 방어합니다.
		 */
		if (!SAFE_METHODS.has(method.toUpperCase())) {
			const csrfError = validateCsrfToken(request);
			if (csrfError) return csrfError; // 유효하지 않으면 403 Forbidden 응답
		}
	}

	/** 2. 페이지 경로 인증 상태 확인
	 *	API 경로 제외 : 각 엔드포인트에서 자체적으로 인증 처리
	 */
	if (!pathname.startsWith("/api/")) {
		const accessToken = request.cookies.get(
			COMMON_CONSTS.COOKIE_ACCESS_TOKEN,
		)?.value;

		const isPublicOnlyRoute = PUBLIC_ONLY_ROUTES.has(pathname);

		let isAuthed = false;
		if (accessToken) {
			try {
				await verifyJWTToken(accessToken);
				isAuthed = true;
			} catch {
				isAuthed = false;
			}
		}

		if (isPublicOnlyRoute && isAuthed) {
			return NextResponse.redirect(new URL("/authed", request.url));
		}

		if (!isPublicOnlyRoute && !isAuthed) {
			return NextResponse.redirect(new URL("/signin", request.url));
		}
	}

	// 3. 다음 미들웨어나 최종 라우트 핸들러로 요청을 전달하기 위한 기본 응답 객체를 생성합니다.
	const response = NextResponse.next();

	/** 4. 모든 경로에 대해 CSRF 토큰 발급
	 * 사용자가 사이트에 처음 방문했거나 쿠키가 없는 경우, 새로운 CSRF 토큰을 발급합니다.
	 * 이 토큰은 클라이언트 측 JavaScript에서 읽을 수 있어야 하므로 httpOnly: false로 설정됩니다.
	 * API 요청 시 이 토큰 값을 HTTP 헤더에 담아 보내야 합니다.
	 */
	const csrfToken = request.cookies.get(COMMON_CONSTS.CSRF_TOKEN);
	if (!csrfToken) {
		// Edge Runtime에서 사용 가능한 Web Crypto API 사용
		const array = new Uint8Array(32);
		crypto.getRandomValues(array);
		const newCsrfToken = Array.from(array, (byte) =>
			byte.toString(16).padStart(2, "0"),
		).join("");
		response.cookies.set(COMMON_CONSTS.CSRF_TOKEN, newCsrfToken, {
			path: "/",
			httpOnly: false, // 클라이언트 JS에서 이 값을 읽어 API 요청 헤더에 포함시켜야 함
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 60 * 60 * 24, // 24시간
		});
	}

	// 5. 모든 처리가 완료된 후 최종 응답을 반환합니다.
	return response;
}

/**
 * 미들웨어 실행 경로 설정 (Matcher)
 *
 * `matcher` 배열에 포함된 정규식 패턴과 일치하는 경로에 대해서만 위 `middleware` 함수가 실행됩니다.
 * 배열 내의 패턴들은 "OR" 조건으로 동작합니다. 즉, 둘 중 하나라도 만족하면 미들웨어는 실행됩니다.
 * 패턴 끝에 공백을 넣지마세요. 공백 넣으면 작동하지 않습니다 [ex. good: )", bad: ) "]
 */
export const config = {
	matcher: [
		/**
		 * 1번 패턴: OAuth 콜백을 제외한 모든 API 경로
		 * 1. "/api/"로 시작하는 경로를 대상으로 합니다.
		 * 2. `(?!.*callback)`: Negative Lookahead 구문으로, 경로 내에 "callback" 문자열이 포함된 경우는 제외합니다.
		 *   - 예: `/api/auth/google/callback`은 이 미들웨어를 실행하지 않습니다.
		 *   - 예: `/api/users`는 이 미들웨어를 실행합니다.
		 */
		"/api/((?!.*callback).*)",
		/**
		 * 2번 패턴: 특정 폴더 및 파일을 제외한 모든 페이지 경로
		 * 1. `(?!api|...)`: Negative Lookahead 구문으로, 아래 항목으로 시작하는 경로는 제외합니다.
		 *   - `api`: API 경로는 1번 패턴에서 이미 처리하므로 중복을 피하기 위해 제외합니다.
		 *   - `_next/static`, `_next/image`: Next.js가 사용하는 정적 파일 및 이미지 최적화 경로입니다.
		 *   - `favicon.ico`, 이미지 확장자 등: 기타 정적 에셋 파일들입니다.
		 * 2. `/dashboard`, `/profile` 등의 페이지 경로는 이 미들웨어를 실행합니다.
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
