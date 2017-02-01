var webpack = require("webpack"),
  path = require("path");

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai-immutable'],
    files: [
      // Test dependencies
      //'node_modules/expect.js/index.js',
      'node_modules/sinon-chrome/bundle/sinon-chrome-webextensions.min.js',

      // Source
      //'addon/*.js',

      // Tests
      'tests/pages/**/*.test.js',
      'tests/*.test.js'
    ],
    preprocessors: {
      'tests/pages/**/*.test.js': ["webpack"],
      'tests/*.test.js': ["webpack"]
    },
    webpack: {
      module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
          { test: /\.css$/, exclude: /node_modules/, use: [ 'style-loader', 'css-loader' ] }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx'],
        modules: [ path.resolve(__dirname, 'node_modules') ]
      },
      plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') })
      ],
      devtool: 'sourcemap'
    },
    webpackMiddleware: {
      noInfo: true
    },
    exclude: [
      'dist',
    ],

    client: {
      mocha: {
        // change Karma's debug.html to the mocha web reporter
        reporter: 'html',
      },
    },
    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-chai-immutable"),
      require("karma-sinon-chrome"),
      require("karma-firefox-launcher")
    ],
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Firefox'],
    singleRun: true,
    concurrency: Infinity,
  });
};
