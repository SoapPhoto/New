import { ApolloProvider } from '@apollo/client'
import { client } from '@app/apollo/client'

import { App } from '@app/app'
import { stores } from '@app/stores'
import { ThemeProvider } from '@app/styles/theme/ThemeProvider'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import { Provider } from 'mobx-react'

import * as React from 'react'

import { createRoot } from 'react-dom/client'

import { HelmetProvider } from 'react-helmet-async'

import './styles/tailwind.css'

/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
// import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable'
// Use consistent styling
import 'sanitize.css/sanitize.css'
// Initialize languages
import './locales/i18n'

import 'dayjs/locale/en'
import 'dayjs/locale/zh-cn'

const MOUNT_NODE = document.getElementById('root') as HTMLElement

dayjs.extend(relativeTime)
// dayjs.locale('zh-cn');
const root = createRoot(MOUNT_NODE)

root.render(
  <ApolloProvider client={client}>
    <Provider {...stores}>
      <ThemeProvider>
        <HelmetProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </HelmetProvider>
      </ThemeProvider>
    </Provider>
  </ApolloProvider>,
)
