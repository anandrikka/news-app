'use strict';

var express = require('express');
var app = express();

require('./server/job-scheduler');

var firebaseDataService = require('./server/firebase/firebase-data-service');
var firebase = require('./server/firebase/firebase-initialize');

// firebaseDataService.createSourceRefs().then(function () {
//     firebaseDataService.loadNewArticles();
// });

app.listen(3000, function () {
    console.log('app starting listening on ', 3000); 
});