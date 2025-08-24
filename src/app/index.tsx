import { UserPictureType } from '@app/common/enum/picture'
import { DefaultLayout, SecurityLayout } from '@app/components/Layout'
import { OauthLayout } from '@app/components/Layout/OauthLayout'
import ScrollToTop from '@app/components/ScrollToTop'
import UploadModal from '@app/components/UploadModal'
import NotPage from '@app/pages/404'
import Account from '@app/pages/Account'

import AuthCompletePage from '@app/pages/Account/Complete'
import Login from '@app/pages/Account/Login'
import Register from '@app/pages/Account/Register'
import HomePage from '@app/pages/Home/Loadable'
import OauthRedirectPage from '@app/pages/Oauth/Redirect'
import PicturePage from '@app/pages/Picture/Loadable'

import PictureModal from '@app/pages/Picture/Modal'
import SearchPage from '@app/pages/Search'
import SettingPage from '@app/pages/Setting'
import TagPage from '@app/pages/Tag'
import Test from '@app/pages/Test'
import Upload from '@app/pages/Upload'
import UserPage from '@app/pages/User/Loadable'
import UserHome from '@app/pages/User/Picture'
import ValidatorEmailPage from '@app/pages/ValidatorEmail'
import ReloadPrompt from '@app/ReloadPrompt'
import { useAccount } from '@app/stores/hooks'
import Loadable from '@loadable/component'
import dayjs from 'dayjs'

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react'

import { Helmet } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { useTheme } from 'styled-components'
import { GlobalStyle } from '../styles/global-styles'

const SettingProfilePage = Loadable(() => import('@app/pages/Setting/Profile'))
const SettingAccountPage = Loadable(() => import('@app/pages/Setting/Account'))
const ResetPasswordPage = Loadable(() => import('@app/pages/Setting/ResetPassword'))

function Router() {
  const initRef = useRef(false)
  const location = useLocation()
  const oldLocation = useRef(location.pathname)
  const state = location.state as { backgroundLocation?: Location }
  useEffect(() => {
    if (location.pathname !== oldLocation.current) {
      oldLocation.current = location.pathname
    }
  }, [location.pathname])
  if (location.pathname !== oldLocation.current) {
    initRef.current = true
  }
  return (
    <>
      <Routes location={!initRef.current ? location : state?.backgroundLocation ?? location}>
        <Route path="" element={<DefaultLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="s/:search" element={<SearchPage />} />
          <Route path="s" element={<SearchPage />} />
          <Route path="test" element={<Test />} />
          <Route path="upload" element={<Upload />} />
          <Route path="/user/:username" element={<UserPage />}>
            <Route
              path="like"
              element={
                <UserHome type={UserPictureType.LIKED} />
              }
            />
            <Route
              path="choice"
              element={
                <UserHome type={UserPictureType.CHOICE} />
              }
            />
            <Route
              path=""
              element={<UserHome type={UserPictureType.MY} />}
            />
          </Route>
          <Route path="/tag/:name" element={<TagPage />} />
          <Route path="" element={<SecurityLayout />}>
            <Route path="/setting" element={<SettingPage />}>
              <Route
                path="profile"
                element={<SettingProfilePage />}
              />
              <Route
                path="account"
                element={<SettingAccountPage />}
              />
              <Route
                path="resetPassword"
                element={<ResetPasswordPage />}
              />
            </Route>
            <Route path="/setting" element={<Navigate replace to="/setting/profile" />} />
            <Route path="/setting/:type" element={<Navigate replace to="/setting/profile" />} />
          </Route>
        </Route>
        <Route path="picture/:id" element={<PicturePage />} />
        <Route path="" element={<Account />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="auth/complete" element={<AuthCompletePage />} />
        </Route>
        <Route path="validatoremail" element={<ValidatorEmailPage />} />
        <Route path="" element={<OauthLayout />}>
          <Route path="redirect/oauth/:type" element={<OauthRedirectPage />} />
        </Route>
        <Route path="*" element={<DefaultLayout />}>
          <Route path="*" element={<NotPage />} />
        </Route>
      </Routes>
      {initRef.current && state?.backgroundLocation && (
        <Routes>
          <Route path="/picture/:id" element={<PictureModal />} />
        </Routes>
      )}
    </>
  )
}

export function App() {
  const { widget } = useTheme()
  const { i18n } = useTranslation()
  const { initHandle } = useAccount()
  useLayoutEffect(() => {
    initHandle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (i18n.language === 'en') {
      dayjs.locale('en')
    }
    else {
      dayjs.locale('zh-cn')
    }
  }, [i18n.language])
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s"
        defaultTitle="Soap"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="有趣的方式来和小伙伴分享你生活的照片。" />
      </Helmet>
      <ScrollToTop>
        <Router />
      </ScrollToTop>
      <UploadModal />
      <GlobalStyle />
      <Toaster
        toastOptions={{
          style: {
            ...widget.toaster,
          },
        }}
      />
      <ReloadPrompt />
    </BrowserRouter>
  )
}
