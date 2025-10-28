import { ApolloLink, HttpLink, Observable } from "@apollo/client";
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from "@apollo/client/errors";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { SSRMultipartLink } from "@apollo/client-integration-nextjs";
import { tap } from "rxjs/operators";

export interface CreateLinksOptions {
  isServer: boolean;
  getToken?: () =>
    | Promise<string | null | undefined>
    | string
    | null
    | undefined;
  hasuraAdminSecret?: string;
  hasuraGraphQLEndpoint?: string;
  refreshTokenManager?: {
    refreshAccessToken: () => Promise<boolean>;
  };
}

// 아폴로 링크 팩토리 함수
export function createApolloLinks(options: CreateLinksOptions) {
  const {
    isServer,
    getToken,
    hasuraAdminSecret,
    hasuraGraphQLEndpoint,
    refreshTokenManager,
  } = options;
  const prefix = isServer ? "🖥️ [Server]" : "💻 [Client]";
  const endpoint = hasuraGraphQLEndpoint;

  // 1. Auth Link
  // 서버: 쿠키에서 토큰을 읽어 Authorization 헤더 설정
  // 클라이언트: credentials: "include"로 쿠키 자동 전송 (Authorization 헤더 불필요)
  const authLink = new SetContextLink(async (prevContext, _operation) => {
    let token: string | null | undefined;

    // 명시적으로 토큰을 헤더에 추가
    // if (getToken) {
    // 	console.log(`${prefix} 🔑 apollo-links에서 헤더에 토큰 추가 시도 시작`);
    // 	token = await getToken();
    // 	console.log(
    // 		`${prefix} 🔑 apollo-links에서 토큰 조회 성공:`,
    // 		token ? `${token.substring(0, 20)}...` : "null",
    // 	);
    // } else {
    // 	console.log(`${prefix} 🔑 getToken 함수가 제공되지 않았습니다`);
    // }

    const headers = {
      ...prevContext.headers,
      ...(token && { authorization: `Bearer ${token}` }),
      "x-request-from": isServer ? "server" : "client",
    };

    // console.log(`${prefix} 📤 Request headers:`, headers); // 테스트용

    return {
      headers,
    };
  });

  // 2. Error Link - 인증 에러 발생 시 토큰 갱신 및 재시도
  const errorLink = new ErrorLink(({ error, operation, forward }) => {
    if (CombinedGraphQLErrors.is(error)) {
      for (const err of error.errors) {
        const { message, locations, path, extensions } = err;
        console.log(
          `${prefix} ❌ [GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );

        // ** 클라이언트 토큰 갱신 처리 **
        if (!isServer && typeof window !== "undefined") {
          // invalid-jwt 또는 UNAUTHENTICATED 에러 감지
          if (
            extensions?.code === "invalid-jwt" ||
            extensions?.code === "UNAUTHENTICATED"
          ) {
            console.log(
              `${prefix} 🔄 apollo-links에서 토큰 갱신 시도 시작: ${operation.operationName}`,
            );

            // Observable을 반환하여 토큰 갱신 후 재시도
            return new Observable((observer) => {
              if (!refreshTokenManager) {
                console.error(`${prefix} ❌ refreshTokenManager 없음`);
                observer.error(error);
                return;
              }
              refreshTokenManager
                .refreshAccessToken()
                .then((success: boolean) => {
                  if (success) {
                    // 토큰 갱신 성공 - 원래 요청 재시도
                    console.log(
                      `${prefix} ♻️ 토큰 갱신 성공, ${operation.operationName} 재시도 시작`,
                    );
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    };
                    forward(operation).subscribe(subscriber);
                  } else {
                    // 토큰 갱신 실패 - 에러 전달
                    observer.error(error);
                  }
                })
                .catch((refreshError: unknown) => {
                  console.error(`${prefix} ❌ 토큰 갱신 에러:`, refreshError);
                  observer.error(error);
                });
            });
          }
          if (extensions?.code === "FORBIDDEN") {
            // 권한 부족 에러
            console.warn(`${prefix} ⛔ Forbidden 인가 검토 필요: ${message}`);
            // TODO: forbidden 일때 처리 방법 논의 필요 ***
            // toast.error('권한이 없습니다?')
          }
        } else {
          // 서버에서는 토큰 갱신 불가 - 클라이언트에서 처리해야 함
          // 1. 서버는 브라우저 쿠키에 직접 접근 불가
          // 2. RSC는 이미 렌더링 중이라 쿠키 수정 불가
          // 3. 에러를 자동으로 전파하여 클라이언트에서 재인증 처리
          // (ErrorLink에서 아무것도 반환하지 않으면 에러가 자동 전파됨)
        }
      }
    } else if (CombinedProtocolErrors.is(error)) {
      for (const err of error.errors) {
        const { message, extensions } = err;
        console.log(
          `${prefix} ❌ [Protocol] ${operation.operationName}: ${message}`,
          { extensions },
        );
      }
    } else {
      console.error(`${prefix} 🔌 [Network error]:`, error);
    }
  });

  // 3. HTTP Link
  const httpLink = new HttpLink({
    uri: endpoint,
    credentials: "include",
    ...(isServer && {
      fetch: fetch,
      fetchOptions: {
        cache: "no-store",
      },
    }),
    ...(!!hasuraAdminSecret && {
      headers: {
        "x-hasura-admin-secret": hasuraAdminSecret,
      },
    }),
  });

  // 4. Retry Link (클라이언트만)
  const retryLink = !isServer
    ? new RetryLink({
        delay: {
          initial: 300,
          max: 5000,
          jitter: true,
        },
        attempts: {
          max: 3,
          retryIf: (error) =>
            !!error && error.message.includes("Network error"),
        },
      })
    : null;

  // 5. SSR Multipart Link
  const ssrMultipartLink = isServer
    ? new SSRMultipartLink({
        stripDefer: true,
      })
    : null;

  // 6. Logger Link - 개발 환경에서만 GraphQL 작업 로깅
  // Apollo Client 4.0에서 asyncMap이 제거되어 rxjs의 tap 연산자 사용
  // tap은 사이드 이펙트(로깅)만 처리하고 응답은 그대로 전달
  const loggerLink = new ApolloLink((operation, forward) => {
    // 프로덕션 환경에서는 로깅 비활성화
    if (process.env.NODE_ENV !== "development") {
      return forward(operation);
    }

    // 요청 시작 로그 (작업 이름과 변수 출력)
    console.log(`${prefix} 🚀 ${operation.operationName}`, {
      variables: operation.variables,
    });
    const start = Date.now();

    // 응답 완료 시 소요 시간 로그
    // 1초 이상 걸리면 🐌, 그 이하면 ⚡ 이모지 표시
    return forward(operation).pipe(
      tap(() => {
        const duration = Date.now() - start;
        const emoji = duration > 1000 ? "🐌" : "⚡";
        console.log(
          `${prefix} ${emoji} ${operation.operationName} (${duration}ms)`,
        );
      }),
    );
  });

  // 최종적으로 링크들 배열 생성
  const links = [
    loggerLink,
    errorLink,
    ...(retryLink ? [retryLink] : []),
    ...(ssrMultipartLink ? [ssrMultipartLink] : []),
    authLink.concat(httpLink),
  ];

  return ApolloLink.from(links);
}
