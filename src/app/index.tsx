import React, { useEffect, useLayoutEffect } from 'react';
import { observer } from 'mobx-react';
import { Helmet } from 'react-helmet-async';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTheme } from 'styled-components';
import dayjs from 'dayjs';

import { GlobalStyle } from '../styles/global-styles';

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
import User from '@app/pages/User';
import TagPage from '@app/pages/Tag';

const Router = () => {
  return (
    <Routes>
      <Route path="" element={<DefaultLayout />}>
        <Route path="" element={<HomePage />}></Route>
        <Route path="picture/:id" element={<PicturePage />}></Route>
        <Route path="test" element={<Test />} />
        <Route path="upload" element={<Upload />} />
        <Route path={`/@:username/*`} element={<User />} />
        <Route path={`/tag/:name`} element={<TagPage />} />
      </Route>
      <Route path="" element={<Account />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

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
