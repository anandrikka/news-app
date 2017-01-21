import axios from 'axios';

import ActionConstants from './ActionConstants';
import resources from '../utilities/resources';

export const getCategories = () => (dispatch) => {
    return axios.get(resources.categories).then((response) => {
        dispatch({
            type: ActionConstants.LOAD_CATEGORIES,
            payload: {
                categories: response.data
            }
        });
    }, (error) => {
    });
};


export const getSources = () => (dispatch) => {
    return axios.get(resources.sources).then((response) => {
        dispatch({
            type: ActionConstants.LOAD_SOURCES,
            payload: {
                categories: response.data
            }
        });
    });
};

export const systemDetails = () => (dispatch) => {
    return axios.get(resources.getSystemDetails).then((response) => {
        dispatch({
            type: ActionConstants.LOAD_SYSTEM_DETAILS,
            payload: {
                system: response.data
            }
        });
    }, (error) => {

    });
};