import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, BrowserRouter, Routes, useLocation } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

import HomePage from 'pages/Home/Loadable';
import { useTranslation } from 'react-i18next';
import { DefaultLayout } from 'components/Layout';
import Account from 'pages/Account';
import Login from 'pages/Account/Login';
import Register from 'pages/Account/Register';
import { useEffect, useState } from 'react';

export function App() {
  const { i18n } = useTranslation();
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
        </Route>
        <Route path="" element={<Account />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
