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
                reverseOrder: -moment.tz(publishedAt, timezone).valueOf(),
                order: moment.tz(publishedAt, timezone).valueOf()
            });
            modifiedArticle = modifiedArticle.toJS();
            var key = articleSource + '_' + utilites.removeSplChars(modifiedArticle.title);
            articlesRef.child(source.country).child(key).set(modifiedArticle);
        });
    }, function (error) {
    });
};

var deleteOldArticlesByTimezone = function (country, tz) {
    db.ref('/articles/' + country).orderByChild('order').once('value').then(function (articlesSnapshot) {
        articlesSnapshot.forEach(function (articleSnapshot) {
            var article = articleSnapshot.val();
            var publishedTime = moment.tz(article.publishedAt, tz);
            var timenow = moment.tz(tz).subtract(3, 'days');
            if (publishedTime.isBefore(timenow)) {
                db.ref('/articles/' + country).child('/' + articleSnapshot.key).remove();
                console.log(`Article from ${article.source} published at ${article.publishedAt} deleted`);
            }
        });
    });
}

var loadArticlesByCountry = function (country) {
    sourcesRef.orderByChild('country').equalTo(country).once('value').then(function (dataSnapshot) {
        dataSnapshot.forEach(function (source) {
            source.sortBysAvailable.forEach(function (sortBy) {
                loadArticlesBySource(source, sortBy);
            });
        });
    });
}

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
    sourcesRef: sourcesRef,
    categoriesRef: categoriesRef,
    articlesRef: articlesRef,
    countriesRef: countriesRef,
    loadNewArticles: loadNewArticles
};

// loadArticlesByCountry('us');

// var getArticles = function () {
//     countriesRef.once('value').then(function (dataSnapshot) {
//         var countries = dataSnapshot.val();
//         for (var i = 0; i < countries.length; i++) {
//             db.ref('/articles/' + countries[i].name).orderByChild('reverseOrder').once('value').then(function (dataSnapshot) {
//                 var country = dataSnapshot.key;
//                 dataSnapshot.forEach(function (articleSnapshot) {
//                     var article = articleSnapshot.val();
//                     console.log(country, article.publishedAt);
//                 })
//             })
//         }
//     });
// };