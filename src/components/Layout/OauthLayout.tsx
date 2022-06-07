import React from 'react';
import styled from 'styled-components/macro';

// import { Header } from '@app/components';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

interface IProps {}

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
`;

export const OauthLayout: React.FC<IProps> = () => (
  <Wrapper>
    <Header right={false} />
    <Outlet />
  </Wrapper>
);
