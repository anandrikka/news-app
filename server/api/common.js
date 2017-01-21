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

router.get('/system', function (req, res) {
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
            countryFound = {code: 'us', name: 'America', tz: 'America/New_York'};
        } else {
            countryFound = countryFound;
        }
        res.send({
            countryCode: countryFound.code,
            countryName: countryFound.name,
            tz: countryFound.tz
        });
    })
});

router.get('/categories', function (req, res) {
    db.ref('/categories').once('value').then(function (categoriesSnapshot) {
        res.send(categoriesSnapshot.val())
    });
});

router.get('/countries', function (req, res) {
    db.ref('/countries').once('value').then(function (countriesSnapshot) {
        res.send(countriesSnapshot.val())
    });
});

module.exports = router;