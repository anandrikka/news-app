import axios from 'axios';

import ActionConstants from './ActionConstants';
import resources from '../utilities/resources';

const loading = (isLoading) => ({
    type: ActionConstants.LOADING_FLAG,
    payload: {
        isLoading
    }
});

export const loadArticles = (category, country) => (dispatch) => {
    var resource = `${resources.baseUrl}/news/articles/${category}`;
    dispatch(loading(true));
    return axios.get(resource, {
        params: {
            country
        }
    }).then((response) => {
        dispatch(loading(false));
        dispatch({
            type: ActionConstants.LOAD_ARTICLES,
            payload: {
                articles: response.data,
                selectedCategory: category
            }
        })
    }, (error) => {
        dispatch(loading(false));
    });
}

export const loadMore15 = () => ({
    type: ActionConstants.LOAD_MORE_15
});