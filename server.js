'use strict';

var express = require('express');
var app = express();

var firebase = require('./server/firebase/firebase-initialize');
var firebaseDataService = require('./server/firebase/firebase-data-service');

var isProd = process.env.PORT ? true : false;
var serviceVersion = 'v1';


firebaseDataService.createSourceRefs().then(function () {
    firebaseDataService.loadNewArticles();
});

require('./server/job-scheduler');

var routes = require('./server/api/routes');
var routeKeys = Object.keys(routes);
for (let i = 0; i < routeKeys.length; i++) {
    let resourcePath = '/api/' + serviceVersion + '/' + routeKeys[i];
    console.log('Resources for Path: ' + '\'' + resourcePath + '\'' + ' created');
    app.use(resourcePath, routes[routeKeys[i]]);
}



app.use('/public', express.static(__dirname + '/public'));

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(process.env.PORT || 3000, function () {
    console.log('app starting listening on ', 3000);
});