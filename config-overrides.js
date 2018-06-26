const {
  rewireWebpack: rewireTypescript,
  rewireJest: rewireTypescriptJest,
  rewireTSLint
} = require("react-app-rewire-typescript-babel-preset");

const rewireWebpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer');
const rewireDefinePlugin = require('react-app-rewire-define-plugin');
const rewirePolyfills = require('@baristalabs/react-app-rewire-polyfills')
const rewireCssModules = require('@baristalabs/react-app-rewire-css-modules');
const rewireRawLoader = require('@baristalabs/react-app-rewire-raw-loader')

module.exports = {
  webpack: function(config, env) {
    config = rewirePolyfills(config);
    config = rewireTypescript(config);
    config = rewireTSLint(config /* {} - optional tslint-loader options */);
    config = rewireDefinePlugin(config, env, {
      'process.env.VERSION': JSON.stringify(require('./package.json').version)
    });
    config = rewireCssModules(config, env);
    config = rewireRawLoader(config, env);
    if (env === "production" || env === "test") {
      config = rewireWebpackBundleAnalyzer(config, env, {
        analyzerMode: 'static',
        reportFilename: 'report.html'
      })
    } else {
      
    }
    return config;
  },
  jest: function(config) {
    return rewireTypescriptJest(config);
  }
};
