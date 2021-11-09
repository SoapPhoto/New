import { AtSign, Lock, User } from '@app/components/Icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { Menu } from './components/Menu';

const SettingPage = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const menu = [
    {
      value: 'profile',
      name: t('setting.menu.profile'),
      path: '/setting/profile',
      icon: User,
    },
    {
      value: 'account',
      name: t('setting.menu.account'),
      path: '/setting/account',
      icon: AtSign,
    },
    {
      value: 'resetPassword',
      name: t('setting.menu.resetPassword'),
      path: '/setting/resetPassword',
      icon: Lock,
    },
  ];
  console.log(menu);
  return (
    <div>
      <Menu data={menu}>
        <Outlet />
      </Menu>
    </div>
  );
};

export default SettingPage;
