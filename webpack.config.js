var webpack = require('webpack');
var config = require('./config');

var env = config.get('env');

console.log("Environment is " + env);

var defaultConfig = {
  module: {
    loaders: [{
      test: /\.(?:js|jsx)$/, loader: "6to5-loader", exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEV__': JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
      '__PROD__': JSON.stringify(JSON.parse(process.env.BUILD_PROD || 'false')),
      '__TEST__': JSON.stringify(JSON.parse(process.env.BUILD_TEST || 'false')),
      '__USERNAME__': JSON.stringify(config.get('username')),
      '__PASSWORD__': JSON.stringify(config.get('password')),
      // TODO: define your endpoint variables globally here so as to not expose them in the source code
      '__PROFILE_URL__': JSON.stringify(config.get('getProfileUrl'))
    })
  ]
};
var devConfig = {
  name: 'development',
  entry: {
    ConnectorTemplate: './index.js'
  },
  output: {
    libraryTarget: 'var',
    library: '[name]',
    path: './build',
    filename: '[name].js'
  },
  externals: defaultConfig.externals,
  module: defaultConfig.module,
  plugins: defaultConfig.plugins
};
var prodConfig = {
  name: 'production',
  entry: {
    ConnectorTemplate: './index.js'
  },
  output: {
    libraryTarget: 'var',
    library: 'ConnectorTemplate',
    path: './release',
    filename: '[name].js'
  },
  externals: defaultConfig.externals,
  module: defaultConfig.module,
  plugins: defaultConfig.plugins
};
var testConfig = {
  name: 'test',
  entry: {
    ConnectorTemplate: './index.js'
  },
  output: {
    libraryTarget: 'commonjs2',
    library: 'ConnectorTemplate',
    path: './test/build',
    filename: '[name].js'
  },
  externals: defaultConfig.externals,
  module: defaultConfig.module,
  plugins: defaultConfig.plugins
};

switch(env) {
  case 'development':
    module.exports = devConfig;
    break;
  case 'production':
    module.exports = prodConfig;
    break;
  case 'test':
    module.exports = testConfig;
    break;
}
