import useNewNotificationSubscription from '@app/utils/hooks/useNewNotificationSubscription'
import React, { } from 'react'

// import { Header } from '@app/components';
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../Footer'
import Header from '../Header'
import VerifyMessage from './VerifyMessage'

interface IProps {}

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
`

export const DefaultLayout: React.FC<IProps> = () => {
  const Components = useNewNotificationSubscription()
  return (
    <Wrapper>
      <VerifyMessage />
      <Header />
      <Outlet />
      <Components />
      <Footer />
    </Wrapper>
  )
}

export * from './SecurityLayout'
