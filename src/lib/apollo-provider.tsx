"use client";

import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { createApolloLinks } from "./apollo-links";

function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: createApolloLinks({ isServer: false }),
  });
}

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
