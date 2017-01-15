'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../../app'); //source path of bundle files
const defaultPort = 8000;

var ExtractTextPlugin = require('extract-text-webpack-plugin'); //Combines all scss files into a single css file


// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

function defaultModules() {
    return {
        preLoaders: [
            {
                test: /\.(js | jsx)$/,
                include: srcPath,
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract('style-loader!css-loader!sass-loader')
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf)$/,
                loader: 'url-loader?limit=4096'
            },
            {
                test: /\.(mp4|ogg|svg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'react-hot!babel-loader',
                include: [].concat(
                    additionalPaths,
                    [ srcPath ]
                )
            }
        ]
    }
}

module.exports = {
    srcPath: srcPath,
    port: defaultPort,
    publicPath: '/public/dist/', //logical path served by server
    getDefaultModules: defaultModules,
    additionalPaths: additionalPaths
};
