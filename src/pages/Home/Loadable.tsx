import * as React from 'react';
import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'components/LoadingIndicator';
import styled from 'styled-components/macro';

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomePage = lazyLoad(
  () => import('./index'),
  module => module.Home,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export default HomePage;
