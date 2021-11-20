const path = require('path');

const { whenProd } = require('@craco/craco');
const TerserPlugin = require('terser-webpack-plugin');
const cracoGraphqlLoader = require("craco-graphql-loader");
var OfflinePlugin = require('offline-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  webpack: {
    alias: {
      '@app': path.resolve(__dirname, 'src'),
    },
    plugins: [
      new OfflinePlugin({
        ServiceWorker: {
          events: true,
          publicPath: '/sw.js',
        },
        // caches: {
        //   main: [':rest:', 'index.html'],
        //   // additional: ['index.html'],
        // },
      }),
      // ...whenProd(() => [new WebpackBundleAnalyzer()], []),
    ],
    configure: {
      // devtool: 'eval-cheap-module-source-map',
      output: {
        publicPath: process.env.NODE_ENV !== 'production' ? '/' : 'https://cdn-oss.soapphoto.com/',
      },
      cache: {
        type: 'filesystem',
      },
      optimization: {
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            },
          }),
        ],
        splitChunks: {
          // include all types of chunks
          chunks: 'all',
          minChunks: 1,
          // 重复打包问题
          cacheGroups: {
            common: {
              test: /[\\/]node_modules[\\/]/,
              name: 'common',
              chunks: 'initial',
              priority: 2,
              minChunks: 1,
            },
          },
        },
      },
    },
  },
  devServer: {
    proxy: {
      '/graphql': {
        target: 'https://api.soapphoto.com',
        changeOrigin: true,
        ws: true
      },
      '/oauth': {
        target: 'https://api.soapphoto.com',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://api.soapphoto.com',
        changeOrigin: true,
      },
    },
  },
  plugins: [{ plugin: cracoGraphqlLoader }],
  eslint: {
    enable: false,
  },
  babel: {
    plugins: [
      [
        'babel-plugin-import',
        {
          libraryName: '@arco-design/web-react',
          libraryDirectory: 'es',
          camel2DashComponentName: false,
          style: true, // 样式按需加载
        }
      ],
      [
        'babel-plugin-import',
        {
          libraryName: "lodash",
          libraryDirectory: "",
          camel2DashComponentName: false,  // default: true
        },
        'lodash'
      ],
    ],
  }
}
