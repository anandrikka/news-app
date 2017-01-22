import Immutable from 'immutable';
import ActionConstants from '../actions/ActionConstants';

const defaultState = {
    categories: [],
    isLoading: false,
    sources: {},
    system: {},
    countries: []
};

function app(state = defaultState, action) {
    let modifiedState;
    switch (action.type) {
        case ActionConstants.LOAD_SYSTEM_DETAILS:
            modifiedState = Immutable.Map(state);
            const { system } = action.payload;
            modifiedState = modifiedState.mergeDeep({
                system
            });
            return modifiedState.toJS();
        case ActionConstants.LOAD_CATEGORIES:
            modifiedState = Immutable.Map(state);
            const {categories} = action.payload;
            modifiedState = modifiedState.mergeDeep({
                categories
            });
            return modifiedState.toJS();
        case ActionConstants.LOAD_COUNTRIES:
            modifiedState = Immutable.Map(state);
            const { countries } = action.payload;
            modifiedState = modifiedState.mergeDeep({
                countries
            });
            return modifiedState.toJS();
        case ActionConstants.CLEAR_ARTICLES:
            modifiedState = Immutable.fromJS(state);
            const articles1 = {
                list: []
            };
            modifiedState = modifiedState.updateIn(['articles'], articles => articles1);
            return modifiedState.toJS();
        case ActionConstants.LOAD_SOURCES:
            modifiedState = Immutable.Map(state);
            const { sources } = action.payload;
            modifiedState = modifiedState.mergeDeep({
                sources
            });
            return modifiedState.toJS();
        case ActionConstants.LOADING_FLAG:
            modifiedState = Immutable.Map(state);
            modifiedState = modifiedState.mergeDeep({
                isLoading: action.payload.isLoading
            });
            return modifiedState.toJS();
        default:
            return state; 
    }
};

export default app;