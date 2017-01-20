'use strict';

var router = require('express').Router();
var firebase = require('../firebase/firebase-initialize');
var db = firebase.database();
var moment = require('moment-timezone');
var countryTimezones = require('../config/country-timezones');
var timezoneCountryMap = countryTimezones.timezoneCountryMap;
var guessTzMap = countryTimezones.guessTzMap;

router.use(function (req, res, next) {
    req.params = req.params || {};
    req.query = req.query || {};
    req.body = req.body || {};
    next();
});

router.get('/articles', function (req, res) {
    var country;
    if (!req.query.country) {
        var guessTz = moment.tz.guess();
        var countries = [];
        if (timezoneCountryMap[guessTz]) {
            countries = timezoneCountryMap[guessTz].countries;
        } else if (guessTzMap[guessTz]) {
            guessTz = guessTzMap[guessTz];
            if (timezoneCountryMap[guessTz]) {
                countries = timezoneCountryMap[guessTz].countries;
            }
        }
        var countryFound;
        db.ref('/countries').once('value').then(function (countriesSnapshot) {
            var dbCountries = countriesSnapshot.val();
            for (var i = 0; i < dbCountries.length; i++) {
                var dbCountry = dbCountries[i];
                if (countries.indexOf(dbCountry.code.toUpperCase()) > -1) {
                    countryFound = dbCountry;
                    break;
                }
            }
            if (!countryFound) {
                countryFound = 'us';
            } else {
                countryFound = countryFound.code;
            }
            db.ref('/articles/' + countryFound)
                .orderByChild('reverseOrder').limitToFirst(30).once('value').then(function (articlesSnapshot) {
                    var articles = {
                        list: []
                    };
                    var totalArticlesCount = Object.keys(articlesSnapshot.val()).length;
                    articlesSnapshot.forEach(function (articleSnapshot) {
                        var articleKey = articleSnapshot.key;
                        var articleValue = articleSnapshot.val();
                        if (!articles.topKey) {
                            articles.topKey = articleKey;
                        }
                        articles.list.push(articleValue);
                        totalArticlesCount = totalArticlesCount - 1;
                        if (totalArticlesCount === 0) {
                            articles.bottomKey = articleKey;
                        }
                    });
                    res.send(articles);
            });
        });
    }
});

module.exports = router;
