import { defineConfig } from 'vite';
import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import vitePluginImp from 'vite-plugin-imp';
import graphql from '@rollup/plugin-graphql';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import globals from 'rollup-plugin-node-globals';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), graphql()],
  resolve: {
    alias: [
      { find: '@app', replacement: path.resolve(__dirname, 'src') },
      // fix less import by: @import ~
      // less import no support webpack alias '~' · Issue #2185 · vitejs/vite
      { find: /^~/, replacement: '' },
    ],
  },
  server: {
    proxy: {
      '/graphql': {
        target: 'https://soapphoto.com',
        changeOrigin: true,
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
