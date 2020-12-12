/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';

import 'stores';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import FontFaceObserver from 'fontfaceobserver';
import * as serviceWorker from 'serviceWorker';
import { ApolloProvider } from '@apollo/client';

// Use consistent styling
import 'sanitize.css/sanitize.css';

import { App } from 'app';

import { HelmetProvider } from 'react-helmet-async';

import { ThemeProvider } from 'styles/theme/ThemeProvider';

// Initialize languages
import './locales/i18n';
import { stores } from 'stores';
import { initClient } from 'apollo/client';

// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Inter', {});

// When Inter is loaded, add a font-family using Inter to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const client = initClient();

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

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

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
