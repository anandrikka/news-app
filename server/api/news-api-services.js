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

router.get('/articles/:category', function (req, res) {
    var category = req.params.category || 'all';
    var country = req.query.country;
    var dbRef;
    if (!country) {
        var countries = guessCountries();
        db.ref('/countries').once('value').then(function (countriesSnapshot) {
            var dbCountries = countriesSnapshot.val();
            var countryFound;
            for (var i = 0; i < dbCountries.length; i++) {
                var dbCountry = dbCountries[i];
                if (countries.indexOf(dbCountry.code.toUpperCase()) > -1) {
                    countryFound = dbCountry;
                    break;
                }
            }
            if (!countryFound) {
                country = 'us';
            } else {
                country = countryFound.code;
            }
            fetchArticles(res, country, category);
        });
    } else {
        fetchArticles(res, country, category);
    }

    function fetchArticles(res, country, category) {
        var dbRef = db.ref(`/articles/${country}`);
        if (category === 'all') {
            dbRef = dbRef.orderByChild('descOrder');
        } else {
            dbRef = dbRef.orderByChild('category').equalTo(category);
        }
        dbRef.once('value').then(function (articlesSnapshot) {
            var articles = {
                list: []
            };
            if(articlesSnapshot.val()) {
                var totalArticlesCount = Object.keys(articlesSnapshot.val()).length;
                articlesSnapshot.forEach(function (articleSnapshot) {
                    var articleKey = articleSnapshot.key;
                    var articleValue = articleSnapshot.val();
                    if (!articles.topKey) {
                        articles.topKey = articleValue.descOrder;
                    }
                    articles.list.push(articleValue);
                    totalArticlesCount = totalArticlesCount - 1;
                    if (totalArticlesCount === 0) {
                        articles.bottomKey = articleValue.descOrder;
                    }
                });
            }
            res.send(articles);
        });
    }
});

var guessCountries = function () {
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
    return countries;
};

module.exports = router;
