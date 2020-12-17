import { gql, useQuery } from '@apollo/client';
import { Pictures } from '@app/graphql/query';

import React from 'react';

export const Home = () => {
  // console.log()
  const { loading, error, data } = useQuery(Pictures, {
    variables: {
      type: 'NEW',
      query: {
        page: 1,
        pageSize: 30,
      },
    },
  });
  console.log(loading, error, data);
  return <div>home</div>;
};
