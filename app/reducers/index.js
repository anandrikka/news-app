import { combineReducers } from 'redux';

import newsReducer from './news-reducer';

export default combineReducers({
    news: newsReducer
});