import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from './reducers';
import config from 'config';

const logger = createLogger({
    collapsed: true,
    diff: true
});

const defaultState = {};

export default createStore(
    rootReducer,
    defaultState,
    config.appEnv === 'dist' ? applyMiddleware(thunkMiddleware) : applyMiddleware(thunkMiddleware, logger)
);