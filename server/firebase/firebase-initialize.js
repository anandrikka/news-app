'use strict';

var admin = require('firebase-admin');
var firebaseProps = require('../../config/firebase-props');

var app = admin.initializeApp({
    credential: admin.credential.cert(firebaseProps.accountInfo),
    databaseURL: firebaseProps.url
});

module.exports = app;