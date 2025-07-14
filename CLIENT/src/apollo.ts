import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { SSELink } from './useGraphQLSSE';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const sseLink = new SSELink({
  url: 'http://localhost:4000/graphql',
});

const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  sseLink,
  httpLink,
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
