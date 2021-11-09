import React from 'react';
import styled from 'styled-components/macro';

// import { Header } from '@app/components';
import { Outlet } from 'react-router-dom';
import VerifyMessage from './VerifyMessage';
import Header from '../Header';

interface IProps {}

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
`;

export const DefaultLayout: React.FC<IProps> = ({ children }) => (
  <Wrapper>
    <VerifyMessage />
    <Header />
    <Outlet />
  </Wrapper>
);

export * from './SecurityLayout';
