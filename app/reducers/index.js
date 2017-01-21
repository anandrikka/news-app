import { combineReducers } from 'redux';

import newsReducer from './news-reducer';
import containerReducer from './container-reducer';

export default combineReducers({
    news: newsReducer,
    app: containerReducer
});