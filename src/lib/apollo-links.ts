import { ApolloLink, HttpLink } from "@apollo/client";
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from "@apollo/client/errors";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { CLIENT_CONSTS } from "@/constants/client.consts";
import { SERVER_CONSTS } from "@/constants/server.consts";
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "./client-utils";

export interface CreateLinksOptions {
  isServer: boolean;
  getToken: (
    cookieName: string,
  ) => Promise<string | null | undefined> | string | null | undefined;
}

export function createApolloLinks(options: CreateLinksOptions) {
  const { isServer, getToken } = options;
  const prefix = isServer ? "🖥️ [Server]" : "💻 [Client]";

  // 1. Auth Link
  const authLink = new SetContextLink(async (prevContext, operation) => {
    let token: string | null | undefined;
    if (getToken) {
      const tokenResult = getToken(SERVER_CONSTS.COOKIE_AUTH_TOKEN);
      token = tokenResult instanceof Promise ? await tokenResult : tokenResult;
    } else if (!isServer && typeof window !== "undefined") {
      token = getTokenFromLocalStorage(SERVER_CONSTS.COOKIE_AUTH_TOKEN);
    }

    return {
      headers: {
        ...prevContext.headers,
        ...(token && { authorization: `Bearer ${token}` }),
        "x-request-from": isServer ? "server" : "client",
      },
    };
  });

  // 2. Error Link
  const errorLink = new ErrorLink(({ error, operation }) => {
    if (CombinedGraphQLErrors.is(error)) {
      for (const err of error.errors) {
        const { message, locations, path, extensions } = err;
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );

        // 클라이언트에서만 UI 처리
        if (!isServer && typeof window !== "undefined") {
          if (extensions?.code === "UNAUTHENTICATED") {
            removeTokenFromLocalStorage(CLIENT_CONSTS.LOCAL_STORAGE_AUTH_TOKEN);
            window.location.href = "/login";
          } else if (extensions?.code === "FORBIDDEN") {
            // toast.error('권한이 없습니다')
          }
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
    uri:
      process.env.HASURA_GRAPHQL_ENDPOINT ?? "http://localhost:8080/v1/graphql",
    credentials: "include",
    ...(isServer && {
      fetch: fetch,
      fetchOptions: {
        cache: "no-store",
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
          retryIf: (error) => {
            // 네트워크 에러만 재시도
            return !!error && !error.message.includes("Network error");
          },
        },
      })
    : null;

  const links = [
    authLink,
    errorLink,
    ...(retryLink ? [retryLink] : []),
    httpLink,
  ];

  return ApolloLink.from(links);
}
