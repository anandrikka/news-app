const baseUrl = '/api/v1';

const resources = {
    baseUrl,
    loadArticles: baseUrl + '/news/articles',
    getSystemDetails: baseUrl + '/common/system',
    categories: baseUrl + '/common/categories',
    countries: baseUrl + '/common/countries',
    sources: baseUrl + '/common/sources'
};

export default resources;