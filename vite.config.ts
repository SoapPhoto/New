import { defineConfig } from 'vite';
import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import react from '@vitejs/plugin-react';
import graphql from '@rollup/plugin-graphql';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import macrosPlugin from 'vite-plugin-babel-macros';
import vitePluginImp from 'vite-plugin-imp';
import visualizer from "rollup-plugin-visualizer";
import { VitePWA } from 'vite-plugin-pwa'

var isDev = process.env.NODE_ENV !== 'production'

export default defineConfig({
  base: isDev ? '/' : 'https://cdn-oss.soapphoto.com/',
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: true,
              fileName: false
            }
          ]
        ]
      }
    }),
    graphql(),
    macrosPlugin(),
    VitePWA({
      base: '/',
      // base: isDev ? '/' : 'https://cdn-oss.soapphoto.com/',
      includeAssets: [
          "favicon.ico",
          "robots.txt",
      ],
      manifest: {
        "name": "Soap Photos",
        "short_name": "Soap",
        "background_color": "#FFFFFF",
        "theme_color": "#ffffff",
        "display": "standalone",
        "start_url": "/",
        "icons": [
          {
            "src": "icon/logo-72x72.png",
            "type": "image/png",
            "sizes": "72x72"
          },
          {
            "src": "icon/logo-96x96.png",
            "type": "image/png",
            "sizes": "96x96"
          },
          {
            "src": "icon/logo-192x192.png",
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "icon/logo-512x512.png",
            "type": "image/png",
            "sizes": "512x512"
          }
        ]
      },
      workbox: {
        swDest: "./dist/sw.js",
        navigateFallbackDenylist: [
          /^\/api/,
          /^\/graphql/,
          /^\/oauth/,
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn-oss\.soapphoto\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'soap-cdn',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          }
        ]
      }
    }),
    vitePluginImp({
      libList: [
        {
          libName: 'lodash',
          libDirectory: '',
          camel2DashComponentName: false,
          style: () => {
            return false;
          },
        },
        {
          libName: '@arco-design/web-react',
          libDirectory: 'es',
          camel2DashComponentName: false,
          style: (name) => {
            return `@arco-design/web-react/es/${name}/style/index.js`;
          },
        },
      ]
    }),
    // visualizer({
    //   gzipSize: true,
    //   brotliSize: true,
    // })
  ],
  resolve: {
    alias: [
      { find: '@app', replacement: path.resolve(__dirname, 'src') },
      // fix less import by: @import ~
      // less import no support webpack alias '~' · Issue #2185 · vitejs/vite
      { find: /^~/, replacement: '' },
    ],
  },
  server: {
    port: 3002,
    proxy: {
      '/graphql': {
        target: 'https://soapphoto.com',
        changeOrigin: true,
        ws: true
      },
      '/oauth': {
        target: 'https://soapphoto.com',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://soapphoto.com',
        changeOrigin: true,
      },
    },
  },
  rollupInputOptions: {
    plugins: [nodePolyfills()],
  },
  define: {
    'process.env': {},
  },
});
