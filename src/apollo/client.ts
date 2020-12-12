import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from 'apollo-utilities';
import { isString } from 'lodash';
import { BatchHttpLink } from '@apollo/client/link/batch-http';

export function initClient() {
  console.log(process.env.REACT_APP_API_URL);
  const batchLink = new BatchHttpLink({
    uri: process.env.REACT_APP_API_URL,
    credentials: 'include',
  });
  const authLink = new ApolloLink((operation, next) => {
    const token = localStorage.getItem('token');

    operation.setContext(context => ({
      ...context,
      headers: {
        ...context.headers,
        Authorization: token,
      },
    }));

    return next ? next(operation) : null;
  });
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(err => {
        if (isString(err.message)) {
          console.error(
            `[GraphQL error]{${err.path}}: Message: ${err.message}`,
          );
        } else {
          console.error(
            `[GraphQL error]{${
              err.path
            }}: Message: ${(err.message as any)?.error?.toString()}`,
          );
        }
      });
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  const httpLink = ApolloLink.from([errorLink, authLink, batchLink]);

  const link = ApolloLink.split(({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  }, httpLink);
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
  return client;
}
