import { defineConfig } from 'vite';
import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import graphql from '@rollup/plugin-graphql';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import macrosPlugin from 'vite-plugin-babel-macros';
import vitePluginImp from 'vite-plugin-imp';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), graphql(), macrosPlugin(),
    vitePluginImp([
      {
        libraryName: '@arco-design/web-react',
        libraryDirectory: 'es',
        camel2DashComponentName: false,
        style: (name) => {
          return `@arco-design/web-react/es/${name}/style/index.js`;
        },
      },
    ])
  ],
  build: {
    minify: false,
  },
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
        target: 'http://localhost:3001',
        changeOrigin: true,
        ws: true
      },
      '/oauth': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:3001',
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
