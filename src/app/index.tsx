import React, { useEffect, useLayoutEffect } from 'react';
import { observer } from 'mobx-react';
import { Helmet } from 'react-helmet-async';
import {
  Route, BrowserRouter, Routes, Navigate,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTheme } from 'styled-components/macro';
import dayjs from 'dayjs';
import Loadable from '@loadable/component';

import HomePage from '@app/pages/Home/Loadable';
import { useTranslation } from 'react-i18next';
import { DefaultLayout, SecurityLayout } from '@app/components/Layout';
import Account from '@app/pages/Account';
import Login from '@app/pages/Account/Login';
import Register from '@app/pages/Account/Register';
import { useAccount } from '@app/stores/hooks';
import Test from '@app/pages/Test';
import PicturePage from '@app/pages/Picture/Loadable';
import OauthRedirectPage from '@app/pages/Oauth/Redirect';
import Upload from '@app/pages/Upload';
import UploadModal from '@app/components/UploadModal';
import UserPage from '@app/pages/User/Loadable';
import TagPage from '@app/pages/Tag';
import UserHome from '@app/pages/User/Picture';
import { UserPictureType } from '@app/common/enum/picture';
import SettingPage from '@app/pages/Setting';
import { OauthLayout } from '@app/components/Layout/OauthLayout';
import ScrollToTop from '@app/components/ScrollToTop';
import { GlobalStyle } from '../styles/global-styles';

const SettingProfilePage = Loadable(() => import('@app/pages/Setting/Profile'));

const Router = () => (
  <Routes>
    <Route path="" element={<DefaultLayout />}>
      <Route path="" element={<HomePage />} />
      <Route path="picture/:id" element={<PicturePage />} />
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
            element={<div>2</div>}
          />
          <Route
            path="resetPassword"
            element={<div>3</div>}
          />
        </Route>
        <Route path="/setting" element={<Navigate replace to="/setting/profile" />} />
        <Route path="/setting/:type" element={<Navigate replace to="/setting/profile" />} />
      </Route>
    </Route>
    <Route path="" element={<Account />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
    <Route path="" element={<OauthLayout />}>
      <Route path="redirect/oauth/:type" element={<OauthRedirectPage />} />
    </Route>
  </Routes>
);

export const App = observer(() => {
  const { widget } = useTheme();
  const { i18n } = useTranslation();
  const { initHandle } = useAccount();
  useLayoutEffect(() => {
    initHandle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (i18n.language === 'en') {
      dayjs.locale('en');
    } else {
      dayjs.locale('zh-cn');
    }
  }, [i18n.language]);
  console.log(i18n.language);
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
    </BrowserRouter>
  );
});
