import React from 'react';
import styled from 'styled-components';

import { Header } from '@app/components';
import { Outlet } from 'react-router-dom';

interface IProps {}

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
`;

export const DefaultLayout: React.FC<IProps> = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
};
