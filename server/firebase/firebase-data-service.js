'use-strict';

var axios = require('axios'),
    Immutable = require('immutable'),
    moment = require('moment-timezone'),
    firebase = require('./firebase-initialize'),
    countryTimezoneMap = require('../config/country-timezones').countryTimezoneMap,
    newsApi = require('../config/news-api'),
    utilites = require('../utilities'),
    baseUrl = newsApi.baseUrl,
    apiKey = newsApi.apiKey,
    db = firebase.database(),
    articlesRef = db.ref('/articles'),
    sourcesRef = db.ref('/sources'),
    categoriesRef = db.ref('/categories'),
    countriesRef = db.ref('/countries');

/**
 *Create nodes categories, sources and countries - One time activity.
 */
var createSourceRefs = function () {
    return axios.get(baseUrl + '/sources', {
        params: {
            language: 'en'
        }
    }).then(function (response) {
        var sources = response.data.sources;
        var categories = [];
        var countries = [];
        var tempCountries = [];
        for (var i = 0; i < sources.length; i++) {
            var source = sources[i];
            if (categories.indexOf(source.category) < 0) {
                categories.push(source.category);
            }
            if (tempCountries.indexOf(source.country) < 0) {
                tempCountries.push(source.country);
                var countryDetails = countryTimezoneMap[source.country.toUpperCase()];
                countries.push({
                    code: source.country,
                    name: countryDetails.name,
                    tz: countryDetails.zones[0]
                });
            }
            sourcesRef.child(source.id).set(source);
        }
        categoriesRef.set(categories);
        countriesRef.set(countries);
    }, function (error) {
    });
};

/**
 *Load articles by source and sort by.
 */
var loadArticlesBySource = function (source, sortBy) {
    return axios.get(baseUrl + '/articles', {
        params: {
            source: source.id,
            apiKey: apiKey,
            sortBy: sortBy || 'top'
        }
    }).then(function (response) {
        var articles = response.data.articles;
        var articleSource = response.data.source;
        var timezone = countryTimezoneMap[source.country.toUpperCase()].zones[0];
        articles.forEach(function (article) {
            var modifiedArticle = Immutable.Map(article);
            var publishedAt = modifiedArticle.get('publishedAt');
            if (!publishedAt || (publishedAt && publishedAt.charAt(0) === '0')) {
                publishedAt = moment.tz(timezone).utc().format();
            }
            modifiedArticle = modifiedArticle.merge(modifiedArticle, {
                category: source.category,
                source: source.id,
                language: source.language,
                country: source.country,
                sortBy: sortBy,
                publishedAt: publishedAt,
                timezone: timezone,
                descOrder: -moment.tz(publishedAt, timezone).unix(),
                ascOrder: moment.tz(publishedAt, timezone).unix()
            });
            modifiedArticle = modifiedArticle.toJS();
            var key = utilites.removeSplChars(modifiedArticle.title, true).toLowerCase().trim();
            articlesRef.child(source.country).child(key).set(modifiedArticle);
        });
    }, function (error) {
    });
};

/**
 *Delete articles for each country by timezone.
 */
var deleteOldArticlesByTimezone = function (country, tz) {
    db.ref('/articles/' + country).orderByChild('ascOrder')
    .once('value').then(function (articlesSnapshot) {
        articlesSnapshot.forEach(function (articleSnapshot) {
            var article = articleSnapshot.val();
            var publishedTime = moment.tz(article.publishedAt, tz);
            var timenow = moment.tz(tz).subtract(2, 'days');
            if (publishedTime.isBefore(timenow)) {
                db.ref('/articles/' + country).child('/' + articleSnapshot.key).remove();
                console.log(`Article from ${article.source} published at 
                    ${moment(publishedTime).format('YYYY-MM-DD HH:mm')} deleted`);
            }
        });
    });
}

/**
 *Load articles by country.
 */
var loadArticlesByCountry = function (country) {
    console.log('Started loading articles for country: ', country);
    sourcesRef.orderByChild('country').equalTo(country).once('value').then(function (dataSnapshot) {
        dataSnapshot.forEach(function (sourceSnapshot) {
            var source = sourceSnapshot.val();
            source.sortBysAvailable.forEach(function (sortBy) {
                loadArticlesBySource(source, sortBy);
            });
        });
    });
}

/**
 *One time activity for loading new articles and save them into firebase db.
 */
var loadNewArticles = function () {
    sourcesRef.once('value').then(function (dataSnapshot) {
        dataSnapshot.forEach(function (sourceSnapshot) {
            var source = sourceSnapshot.val();
            source.sortBysAvailable.forEach(function (sortBy) {
                loadArticlesBySource(source, sortBy);
            });
        });
    });
};

module.exports = {
    createSourceRefs: createSourceRefs,
    loadArticlesByCountry: loadArticlesByCountry,
    deleteOldArticlesByTimezone: deleteOldArticlesByTimezone,
    loadNewArticles: loadNewArticles,
    sourcesRef: sourcesRef,
    categoriesRef: categoriesRef,
    articlesRef: articlesRef,
    countriesRef: countriesRef
};
