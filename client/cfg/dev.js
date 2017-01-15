'use strict';

const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./base');
const defaultSettings = require('./defaults');

const devServerConfig = {
    contentBase: './client/src/',
    publicPath: '/public/dist/'
    //historyApiFallback: true,
    //hot: true,
    //port: defaultSettings.port,
    //noInfo: false,
    //inline: true
};

const config = Object.assign({}, baseConfig, {
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
        'webpack/hot/only-dev-server',
        path.join(__dirname, '../src/app')
    ],
    devServer: devServerConfig,
    cache: true,
    devtool: 'eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    module: defaultSettings.getDefaultModules()
});


// Push more loaders if needed
/*
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});
*/

module.exports = config;