import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";
import { createApolloLinks } from "./apollo-links";
import { getTokenFromCookie } from "./server-utils";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: createApolloLinks({ isServer: true, getToken: getTokenFromCookie }),
  });
});
