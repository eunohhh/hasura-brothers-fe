"use client";

import { Defer20220824Handler } from "@apollo/client/incremental";
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { env } from "@/env";
import { refreshTokenManager } from "../auth/token-client-utils";
import { createApolloLinks } from "./apollo-links";

function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: createApolloLinks({
      isServer: false,
      // getToken: async () => {
      // 	// 매 GraphQL 요청마다 동적으로 토큰을 가져옴 ✅
      // 	// makeClient 는 한번만 실행되지만, getToken은 매 요청마다 실행됨
      // 	// 로그인 전: null 반환 → Hasura가 인가 판단하여 invalid-jwt 에러 반환
      // 	// Apollo Link의 ErrorLink에서 invalid-jwt 에러 감지 시 자동으로 토큰 갱신 시도
      // 	// 로그인 후: 토큰 반환 → Hasura가 인가 판단하여 요청 처리
      // 	return await ensureValidToken();
      // },
      refreshTokenManager: refreshTokenManager,
      hasuraGraphQLEndpoint: env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    }),
    incrementalHandler: new Defer20220824Handler(),
  });
}

export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
