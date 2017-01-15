'use strict';

const path = require('path');
let defaultSettings = require('./defaults');

module.exports = {
    additionalPaths: defaultSettings.additionalPaths,
    port: defaultSettings.port,
    debug: true,
    devtool: 'eval',
    output: {
        path: path.join(__dirname, '/../public/dist/'), // path to keep the files
        filename: 'app.js',
        publicPath: defaultSettings.publicPath //logical path served by actual server
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV
        }
    },
    module: {}
};