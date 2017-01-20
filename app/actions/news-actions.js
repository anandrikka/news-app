import axios from 'axios';

import ActionConstants from './ActionConstants';
import Resources from '../utilities/resources';

export const loadArticles = (country) => (dispatch) => {
    return axios.get(Resources.loadArticles, {
        params: {
            country
        }
    }).then((response) => {
        dispatch({
            type: ActionConstants.LOAD_ARTICLES,
            payload: {
                articles: response.data
            }
        });
    }, (error) => {

    });
};

export const systemDetails = () => (dispatch) => {
    return axios.get(Resources.getSystemDetails).then((response) => {
        dispatch({
            type: ActionConstants.LOAD_SYSTEM_DETAILS,
            payload: {
                system: response.data
            }
        });
    }, (error) => {

    });
};