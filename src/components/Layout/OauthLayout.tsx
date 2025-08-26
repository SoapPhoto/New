import React from 'react'
// import { Header } from '@app/components';
import { Outlet } from 'react-router'

import styled from 'styled-components'
import Header from '../Header'

interface IProps {}

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
`

export const OauthLayout: React.FC<IProps> = () => (
  <Wrapper>
    <Header right={false} />
    <Outlet />
  </Wrapper>
)
