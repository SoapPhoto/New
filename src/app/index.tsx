import React, { useEffect, useLayoutEffect } from 'react';
import { observer } from 'mobx-react';
import { Helmet } from 'react-helmet-async';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTheme } from 'styled-components/macro';
import dayjs from 'dayjs';

import HomePage from '@app/pages/Home/Loadable';
import { useTranslation } from 'react-i18next';
import { DefaultLayout } from '@app/components/Layout';
import Account from '@app/pages/Account';
import Login from '@app/pages/Account/Login';
import Register from '@app/pages/Account/Register';
import { useAccount } from '@app/stores/hooks';
import Test from '@app/pages/Test';
import PicturePage from '@app/pages/Picture/Loadable';
import Upload from '@app/pages/Upload';
import UploadModal from '@app/components/UploadModal';
import UserPage from '@app/pages/User/Loadable';
import TagPage from '@app/pages/Tag';
import UserHome from '@app/pages/User/Picture';
import { UserPictureType } from '@app/common/enum/picture';
import { GlobalStyle } from '../styles/global-styles';

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
    </Route>
    <Route path="" element={<Account />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
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
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <Router />
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
