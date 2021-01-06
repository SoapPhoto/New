import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { isString } from 'lodash';
import { BatchHttpLink } from '@apollo/client/link/batch-http';

export function initClient() {
  const batchLink = new BatchHttpLink({
    uri: process.env.REACT_APP_API_URL + 'graphql',
    credentials: 'include',
  });
  const authLink = new ApolloLink((operation, next) => {
    let Authorization = '';
    const token = localStorage.getItem('token');
    if (token && JSON.parse(token)) {
      const { accessToken } = JSON.parse(token);
      Authorization = `Bearer ${accessToken || ''}`;
    }
    operation.setContext(context => ({
      ...context,
      headers: {
        accept: 'application/json',
        ...context.headers,
        Authorization,
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

  // const link = ApolloLink.split(({ query }) => {
  //   const definition = getMainDefinition(query);
  //   return (
  //     definition.kind === 'OperationDefinition' &&
  //     definition.operation === 'subscription'
  //   );
  // }, httpLink);
  const client = new ApolloClient({
    connectToDevTools: false,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            pictures: {
              keyArgs: false,
              merge(existing, incoming) {
                if (!existing) {
                  return incoming;
                }
                return {
                  ...incoming,
                  data: [...existing.data, ...incoming.data],
                };
              },
            },
          },
        },
      },
    }),
    link: httpLink,
  });
  return client;
}

export const client = initClient();
