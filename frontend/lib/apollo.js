import { createHttpLink } from "apollo-link-http";
import withApollo from "next-with-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-unfetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const link = createHttpLink({
  fetch,
  uri: `${API_URL}/graphql`,
});

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      link,
      cache: new InMemoryCache().restore(initialState || {}),
    })
);
