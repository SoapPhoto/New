import * as React from 'react';
import { useLayoutEffect } from 'react';
import { observer } from 'mobx-react';
import { Helmet } from 'react-helmet-async';
import { Route, BrowserRouter, Routes, useLocation } from 'react-router-dom';

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

export const App = observer(() => {
  const { i18n } = useTranslation();
  const { initHandle } = useAccount();
  useLayoutEffect(() => {
    initHandle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <Routes>
        <Route path="" element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/picture/:id" element={<PicturePage />}></Route>
          <Route path="test" element={<Test />} />
        </Route>
        <Route path="" element={<Account />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
});
