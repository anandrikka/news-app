import axios from 'axios';

import ActionConstants from './ActionConstants';
import resources from '../utilities/resources';

// export const loadArticles = (category, country) => (dispatch) => {
//     return axios.get(resources.loadArticles, {
//         params: {
//             country,
//             firstKey
//         }
//     }).then((response) => {
//         dispatch({
//             type: ActionConstants.LOAD_ARTICLES,
//             payload: {
//                 articles: response.data,
//                 selectedCategory: 'all'
//             }
//         });
//     }, (error) => {

//     });
// };

// export const loadNewsByCategory = (category, country, firstKey) => (dispatch) => {
//     return axios.get(resources.baseUrl+'/news/articles/'+category, {
//         params: {
//             country,
//             firstKey
//         }
//     }).then((response) => {
//         if (!firstKey) {
//             dispatch({
//                 type: ActionConstants.CLEAR_ARTICLES
//             });
//         }
//         dispatch({
//             type: ActionConstants.LOAD_ARTICLES,
//             payload: {
//                 articles: response.data,
//                 selectedCategory: category
//             }
//         });
//     }, (error) => {
//     });
// };

export const loadArticles = (category, country) => (dispatch) => {
    var resource = `${resources.baseUrl}/news/articles/${category}`
    return axios.get(resource, {
        params: {
            country
        }
    }).then((response) => {
        dispatch({
            type: ActionConstants.LOAD_ARTICLES,
            payload: {
                articles: response.data,
                selectedCategory: category
            }
        })
    }, (error) => {
        
    });
}