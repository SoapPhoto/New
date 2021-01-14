const {
  override,
  addWebpackAlias,
  overrideDevServer,
  addWebpackPlugin,
  addDecoratorsLegacy,
  disableEsLint,
  addBabelPlugins,
} = require('customize-cra');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const devServer = () => config => {
  config.quiet = false;
  config.proxy = {
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
  };
  return config;
};
const webpackConfig = () => (config, env) => {
  config.mode = 'development';
  config.devtool = 'eval-cheap-module-source-map';
  const gqlExtension = /\.(graphql|gql)$/;

  const flatten = array =>
    array.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

  const fileLoader = flatten(
    config.module.rules.map(rule => rule.oneOf || rule),
  ).find(rule => rule.loader && rule.loader.indexOf('file-loader') !== -1);

  fileLoader && fileLoader.exclude.push(gqlExtension);

  const gqlTagRule = {
    test: gqlExtension,
    loader: 'graphql-tag/loader',
    exclude: /node_modules/,
  };
  config.module.rules.push(gqlTagRule);
  return config;
};
module.exports = {
  webpack: override(
    addWebpackAlias({
      '@app': path.resolve(__dirname, 'src'),
    }),
    addWebpackPlugin(
      new HardSourceWebpackPlugin({
        // cacheDirectory是在高速缓存写入。默认情况下，将缓存存储在node_modules下的目录中
        // 'node_modules/.cache/hard-source/[confighash]'
        cacheDirectory: path.join(
          __dirname,
          './node_modules/.cache/hard-source/[confighash]',
        ),
        // configHash在启动webpack实例时转换webpack配置，
        // 并用于cacheDirectory为不同的webpack配置构建不同的缓存
        configHash: function (webpackConfig) {
          // node-object-hash on npm can be used to build this.
          return require('node-object-hash')({ sort: false }).hash(
            webpackConfig,
          );
        },
        // 当加载器、插件、其他构建时脚本或其他动态依赖项发生更改时，
        // hard-source需要替换缓存以确保输出正确。
        // environmentHash被用来确定这一点。如果散列与先前的构建不同，则将使用新的缓存
        environmentHash: {
          root: process.cwd(),
          directories: [],
          files: ['package-lock.json', 'yarn.lock'],
        },
        // An object. 控制来源
        info: {
          // 'none' or 'test'.
          mode: 'none',
          // 'debug', 'log', 'info', 'warn', or 'error'.
          level: 'debug',
        },
        // Clean up large, old caches automatically.
        cachePrune: {
          // Caches younger than `maxAge` are not considered for deletion. They must
          // be at least this (default: 2 days) old in milliseconds.
          maxAge: 2 * 24 * 60 * 60 * 1000,
          // All caches together must be larger than `sizeThreshold` before any
          // caches will be deleted. Together they must be at least this
          // (default: 50 MB) big in bytes.
          sizeThreshold: 50 * 1024 * 1024,
        },
      }),
    ),
    addDecoratorsLegacy(),
    webpackConfig(),
    ...addBabelPlugins('babel-plugin-styled-components'),
    disableEsLint(),
    addWebpackPlugin(
      new HardSourceWebpackPlugin.ExcludeModulePlugin([
        {
          test: /.*\.DS_Store/,
        },
      ]),
    ),
    // removeModuleScopePlugin(),
  ),
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  devServer: overrideDevServer(devServer()),
};
