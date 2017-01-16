'use strict';

const path = require('path');
const webpack = require('webpack');

const baseConfig = require('./base');
const defaultSettings = require('./defaults');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


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
    path: path.join(__dirname, '/../../public/'),
    publicPath: defaultSettings.publicPath
  },
  cache: false,
  devtool: 'sourcemap',
  plugins: [
     new CleanWebpackPlugin(['*'], {
      root: path.join(__dirname, '/../../public'),
      verbose: true, 
      dry: false,
      //exclude: ['shared.js']
    }),
    new CopyWebpackPlugin([
        {
          from: path.join(__dirname + '/../assets'),
          to: path.join(__dirname + '/../../public/assets')
        }
    ], {
          ignore: [
            '*.scss'
          ],
          debug: 'info'
    }),
    new webpack.optimize.CommonsChunkPlugin('libs', 'libs.[hash].js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'production'"
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: true, sourceMap: false}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'News App',
      //filename: path.join(__dirname, '/../../public/index.html'),
      template: path.join(__dirname, '/../template.html'),
      inject: false
    }),
    new ExtractTextPlugin('assets/styles/main.[hash].css')
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
