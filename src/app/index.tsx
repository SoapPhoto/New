import UploadModal from '@app/components/UploadModal'
import ReloadPrompt from '@app/ReloadPrompt'

import { useAccount } from '@app/stores/hooks'

import dayjs from 'dayjs'
import {
  useEffect,
  useLayoutEffect,
} from 'react'
import { Helmet } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  BrowserRouter,
} from 'react-router'
import { useTheme } from 'styled-components'

import { GlobalStyle } from '../styles/global-styles'
import { Router } from './route'

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
      <ReloadPrompt />
    </BrowserRouter>
  )
}
