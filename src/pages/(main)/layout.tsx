import Footer from '@app/components/Footer'
import Header from '@app/components/Header'
import { Wrapper } from '@app/components/Layout'
import VerifyMessage from '@app/components/Layout/VerifyMessage'
import useNewNotificationSubscription from '@app/utils/hooks/useNewNotificationSubscription'
import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router'

export const Component: React.FC = () => {
  const Components = useNewNotificationSubscription()

  const location = useLocation()
  const [backgroundLocation, setBackgroundLocation] = useState(null)

  // 检查当前路由是否为 modal 路由
  const isModal = location.state?.backgroundLocation

  useEffect(() => {
    if (isModal) {
      // 如果是从 modal 导航来的，设置背景位置
      setBackgroundLocation(location.state.backgroundLocation)
    }
    else {
      // 如果不是 modal 路由，清除背景位置
      setBackgroundLocation(null)
    }
  }, [location, isModal])

  console.log(backgroundLocation || location)

  return (
    <Wrapper>
      <VerifyMessage />
      <Header />
      <Outlet context={{ backgroundLocation: backgroundLocation || location }} />
      <Components />
      <Footer />
    </Wrapper>
  )
}
