import { Defer20220824Handler } from "@apollo/client/incremental";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";
import { env } from "@/env";
import { createApolloLinks } from "./apollo-links";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: createApolloLinks({
      isServer: true,
      hasuraGraphQLEndpoint: env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    }),
    incrementalHandler: new Defer20220824Handler(),
  });
});
