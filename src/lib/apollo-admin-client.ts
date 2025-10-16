import { HttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";

export const { getClient: getAdminClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri:
        process.env.HASURA_GRAPHQL_ENDPOINT ??
        "http://localhost:8080/v1/graphql",
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET ?? "",
      },
    }),
  });
});
