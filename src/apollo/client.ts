import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import isString from 'lodash/isString';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

export function initClient() {
  const batchLink = new BatchHttpLink({
    uri: `${import.meta.env.VITE_API_URL}graphql`,
    credentials: 'include',
  });
  const wsLink = new WebSocketLink({
    uri: `${import.meta.env.VITE_WS_URL}/graphql`,
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: async () => {
        let Authorization = '';
        const token = localStorage.getItem('token');
        if (token && JSON.parse(token)) {
          const { accessToken } = JSON.parse(token);
          Authorization = `Bearer ${accessToken || ''}`;
        }
        return {
          Authorization,
        };
      },
    },
  });
  const authLink = new ApolloLink((operation, next) => {
    let Authorization = '';
    const token = localStorage.getItem('token');
    if (token && JSON.parse(token)) {
      const { accessToken } = JSON.parse(token);
      Authorization = `Bearer ${accessToken || ''}`;
    }
    operation.setContext((context) => ({
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
      graphQLErrors.forEach((err) => {
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

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition'
        && definition.operation === 'subscription'
      );
    },
    wsLink as any,
    httpLink,
  );
  const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache({
      typePolicies: {
        User: {
          keyFields: ['username'],
        },
        Query: {
          fields: {
            pictures: {
              keyArgs: [],
              merge(existing, incoming, options) {
                if (!existing) {
                  return incoming;
                }
                if (existing.page === incoming.page) {
                  return incoming;
                }
                return {
                  ...incoming,
                  data: [...existing.data, ...incoming.data],
                };
              },
            },
            userPicturesByName: {
              keyArgs: ['username', 'type'],
              merge(existing, incoming, options) {
                if (!existing) {
                  return incoming;
                }
                if (existing.page === incoming.page) {
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
    defaultOptions: {
      query: {
        notifyOnNetworkStatusChange: true,
      },
      watchQuery: {
        notifyOnNetworkStatusChange: true,
      },
    },
    link: splitLink,
  });
  return client;
}

export const client = initClient();
