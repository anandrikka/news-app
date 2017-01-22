import Immutable from 'immutable';
import ActionConstants from '../actions/ActionConstants';

const defaultState = {
    articles: {
        list: []
    },
    newArticlesCount: 0,
    selectedCategory: 'all'
};

function app(state = defaultState, action) {
    let modifiedState;
    switch (action.type) {
        case ActionConstants.LOAD_ARTICLES:
            modifiedState = Immutable.fromJS(state);    
            const { articles } = action.payload;
            modifiedState = modifiedState.updateIn(['articles', 'list'], list => articles.list);
            modifiedState = modifiedState.mergeDeep({
                articles: {
                    topKey: articles.topKey,
                    bottomKey: articles.bottomKey
                },
                selectedCategory: action.payload.selectedCategory,
                selectedCountry: articles.selectedCountry
            });
            return modifiedState.toJS();
        case ActionConstants.SELECTED_COUNTRY:
            const { selectedCountry } = action.payload;
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.mergeDeep({
                selectedCountry: selectedCountry
            });
            return modifiedState.toJS();
        default:
            return state; 
    }
};

export default app;