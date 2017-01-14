'use-strict';

var axios = require('axios'),
    Immutable = require('immutable'),
    firebase = require('./firebase-initialize'),
    db = firebase.database(),
    newsApi = require('../../config/news-api'),
    utilites = require('../utilities'),
    baseUrl = newsApi.baseUrl,
    apiKey = process.env.newsApiKey || newsApi.apiKey,
    articlesRef = db.ref('/articles'),
    sourcesRef = db.ref('/sources'),
    categoriesRef = db.ref('/categories');

var createSourceRefs = function () {
    return axios.get(baseUrl + '/sources', {
        params: {
            language: 'en'
        }
    }).then(function (response) {
        var sources = response.data.sources;
        var categories = [];
        for (var i = 0; i < sources.length; i++) {
            var source = sources[i];
            if (categories.indexOf(source.category) < 0) {
                categories.push(source.category);
            }
            sourcesRef.child(source.id).set(source);
        }
        categoriesRef.set(categories);
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
        articles.forEach(function (article) {
            var modifiedArticle = Immutable.Map(article);
            modifiedArticle = modifiedArticle.merge(modifiedArticle, {
                category: source.category,
                source: source.id,
                language: source.language,
                country: source.country,
                sortBy: sortBy
            });
            modifiedArticle = modifiedArticle.toJS();
            var key = articleSource + '_' + utilites.removeSplChars(modifiedArticle.title);
            articlesRef.child(key).set(modifiedArticle);
        });
    }, function (error) {
    });
};

var deleteOldArticles = function () {
    var updateArticles = {};
    articlesRef.once('value').then(function (articlesSnapshot) {
        articlesSnapshot.forEach(function (articleSnapShot) {
            var article = articleSnapShot.val();
            if (!article.publishedAt) {
                articlesRef.child('/' + articleSnapShot.key).remove();
            } else {
                var date = moment().subtract(1, 'days').format('YYYY-MM-DD');
                var articleDate = moment('2017-01-14T17:58:54Z').format('YYYY-MM-DD');
                if (moment(articleDate).isBefore(date)) {
                    articlesRef.child('/' + articleSnapShot.key).remove();
                }
                //articlesRef.child('/' + articleSnapShot.key).remove();
            }
        });
    })
};

var loadNewArticles = function () {
    sourcesRef.once('value').then(function (dataSnapshot) {
        dataSnapshot.forEach(function (sourceSnapshot) {
            var source = sourceSnapshot.val();
            source.sortBysAvailable.forEach(function (sortBy) {
                loadArticlesBySource(source, sortBy);
            });
        });
    });
}

module.exports = {
    createSourceRefs: createSourceRefs,
    loadArticlesBySource: loadArticlesBySource,
    deleteOldArticles: deleteOldArticles,
    sourcesRef: sourcesRef,
    categoriesRef: categoriesRef,
    articlesRef: articlesRef,
    loadNewArticles: loadNewArticles
};