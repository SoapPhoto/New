import { UserPictureType } from '@app/common/enum/picture'
import { DefaultLayout, SecurityLayout } from '@app/components/Layout'

import { OauthLayout } from '@app/components/Layout/OauthLayout'
import { NotFound } from '@app/components/page/NotFound'
import { Component as HomePage } from '@app/pages/(main)/index'
import { Component as MainLayout } from '@app/pages/(main)/layout'
import Account from '@app/pages/Account'
import AuthCompletePage from '@app/pages/Account/Complete'

import Login from '@app/pages/Account/Login'
import Register from '@app/pages/Account/Register'
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
import Loadable from '@loadable/component'
import { useEffect, useRef } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'

const SettingProfilePage = Loadable(() => import('@app/pages/Setting/Profile'))
const SettingAccountPage = Loadable(() => import('@app/pages/Setting/Account'))
const ResetPasswordPage = Loadable(() => import('@app/pages/Setting/ResetPassword'))

export function Router() {
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
        <Route path="" element={<MainLayout />}>
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
          <Route path="*" element={<NotFound />} />
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
