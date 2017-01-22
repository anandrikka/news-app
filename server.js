'use strict';

var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var compression = require('compression')

var firebase = require('./server/firebase/firebase-initialize');
var firebaseDataService = require('./server/firebase/firebase-data-service');

var isProd = process.env.PORT ? true : false;
var serviceVersion = 'v1';

app.use(compression());

firebase.database().ref('/articles').remove();

//One Time Activity to Feed information into firebase db.
firebaseDataService.createSourceRefs().then(function () {
    firebaseDataService.loadNewArticles();
});

//Scheduler to load new articles and delete old articles.
require('./server/job-scheduler');

//Exposed REST Api calls
var routes = require('./server/api/routes');
var routeKeys = Object.keys(routes);
for (let i = 0; i < routeKeys.length; i++) {
    let resourcePath = '/api/' + serviceVersion + '/' + routeKeys[i];
    console.log('Resources for Path: ' + '\'' + resourcePath + '\'' + ' created');
    app.use(resourcePath, routes[routeKeys[i]]);
}

//static folder public served via /public uri.
app.use('/public', express.static(__dirname + '/public'));

//rest of calls will be redirected to index.html
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

var port = process.env.PORT || 3000;

io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
});

server.listen(port, function () {
    console.log('app starting listening on ', port);
});