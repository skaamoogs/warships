import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apollClient = new ApolloClient({
  uri: "https://vortex.korabli.su/api/graphql/glossary/",
  cache: new InMemoryCache(),
});
