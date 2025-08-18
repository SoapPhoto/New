import { AtSign, Lock, User } from '@app/components/Icons'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { Menu } from './components/Menu'

function SettingPage() {
  const { t } = useTranslation()
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
  ]
  return (
    <div>
      <Menu data={menu}>
        <Outlet />
      </Menu>
    </div>
  )
}

export default SettingPage
