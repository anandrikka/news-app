import axios from 'axios';

import ActionConstants from './ActionConstants';
import resources from '../utilities/resources';

import moment from 'moment-timezone';
import * as countryTimezones from '../data/country-timezones';
const timezoneCountryMap = countryTimezones.timezoneCountryMap;
const guessTzMap = countryTimezones.guessTzMap;

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
                sources: response.data
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

// const loading = (isLoading) => ({
//     type: ActionConstants.LOADING_FLAG,
//     isLoading
// });

export const getCountries = () => (dispatch) => {
    return axios.get(resources.countries).then((response) => {
        var dbCountries = response.data;
        const countries = guessCountries();
        dispatch({
            type: ActionConstants.LOAD_COUNTRIES,
            payload: {
                countries: dbCountries
            }
        });
        let countryFound, country;
        for (let i = 0; i < dbCountries.length; i++) {
            let dbCountry = dbCountries[i];
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
        dispatch({
            type: ActionConstants.SELECTED_COUNTRY,
            payload: {
                selectedCountry: country
            }
        });
    }, (error) => {

    });
}

const guessCountries = () => {
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