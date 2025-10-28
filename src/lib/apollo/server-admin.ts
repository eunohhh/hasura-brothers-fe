import { Defer20220824Handler } from "@apollo/client/incremental";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";
import { env } from "@/env";
import { createApolloLinks } from "./apollo-links";

export const { getClient: getAdminClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: createApolloLinks({
      isServer: true,
      hasuraGraphQLEndpoint: env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      hasuraAdminSecret: env.HASURA_ADMIN_SECRET,
    }),
    incrementalHandler: new Defer20220824Handler(),
  });
});
