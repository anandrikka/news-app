'use strict';

var express = require('express');
var app = express();

require('./server/job-scheduler');

var firebaseDataService = require('./server/firebase/firebase-data-service');
var firebase = require('./server/firebase/firebase-initialize');

// firebaseDataService.createSourceRefs().then(function () {
//     firebaseDataService.loadNewArticles();
// });

app.use('/public', express.static(__dirname + '/public'));
//app.use('/assets', express.static(__dirname + '/public/assets'));

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(process.env.PORT || 3000, function () {
    console.log('app starting listening on ', 3000); 
});