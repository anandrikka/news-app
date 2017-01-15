'use strict';

const path = require('path');
const webpack = require('webpack');

const baseConfig = require('./base');
const defaultSettings = require('./defaults');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const libs = [
  'react',
  'react-dom'
]

const config = Object.assign({}, baseConfig, {
  entry: {
    app: path.join(__dirname, '../app'),
    libs: libs
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '/../../public/dist/')
  },
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("libs", "libs.[hash].js"),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
        filename: path.join(__dirname, '/../../public/index.html')
        //template: path.join(__dirname, '/../../public/index.html')
    })
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
/*config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});*/

module.exports = config;
