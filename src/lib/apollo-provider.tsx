"use client";

import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { createApolloLinks } from "./apollo-links";
import { getTokenFromLocalStorage } from "./client-utils";

function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: createApolloLinks({
      isServer: false,
      getToken: getTokenFromLocalStorage,
    }),
  });
}

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
