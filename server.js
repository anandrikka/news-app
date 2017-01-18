'use strict';

var express = require('express');
var app = express();

var firebase = require('./server/firebase/firebase-initialize');
var firebaseDataService = require('./server/firebase/firebase-data-service');

var isProd = process.env.PORT ? true : false;

firebaseDataService.createSourceRefs().then(function () {
    firebaseDataService.loadNewArticles();
});

require('./server/job-scheduler');

app.use('/public', express.static(__dirname + '/public'));

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(process.env.PORT || 3000, function () {
    console.log('app starting listening on ', 3000);
});