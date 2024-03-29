/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
// import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { ApolloProvider } from '@apollo/client';

import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

// Use consistent styling
import 'sanitize.css/sanitize.css';

import { App } from '@app/app';

import { HelmetProvider } from 'react-helmet-async';

import { ThemeProvider } from '@app/styles/theme/ThemeProvider';

// Initialize languages
import './locales/i18n';
import { stores } from '@app/stores';
import { client } from '@app/apollo/client';

import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

dayjs.extend(relativeTime);
// dayjs.locale('zh-cn');

ReactDOM.render(
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
  MOUNT_NODE,
);
