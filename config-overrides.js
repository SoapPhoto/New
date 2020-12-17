const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackResolve,
  addWebpackPlugin,
  overrideDevServer,
  addWebpackExternals,
} = require('customize-cra');

const devServer = () => config => {
  config.quiet = false;
  config.proxy = {
    '/graphql': {
      target: 'https://soapphoto.com',
      changeOrigin: true,
    },
  };
  return config;
};
const webpackConfig = () => (config, env) => {
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
  webpack: override(webpackConfig()),
  devServer: overrideDevServer(devServer()),
};
