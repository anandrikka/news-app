import Immutable from 'immutable';
import ActionConstants from '../actions/ActionConstants';

const defaultState = {
    articles: {
        list: []
    },
    newArticlesCount: 0,
    categories: [],
    countries: [],
    isLoading: false
};

function app(state = defaultState, action) {
    let modifiedState;
    switch (action.type) {
        case ActionConstants.LOAD_ARTICLES:
            modifiedState = Immutable.fromJS(state);    
            const { articles } = action.payload;
            modifiedState = modifiedState.updateIn(['articles', 'list'], list => list.concat(articles.list));
            modifiedState = modifiedState.mergeDeep({
                articles: {
                    topKey: articles.topKey,
                    bottomKey: articles.bottomKey
                }
            });
            return modifiedState.toJS();
        case ActionConstants.LOAD_SYSTEM_DETAILS:
            modifiedState = Immutable.Map(state);
            const { system } = action.payload;
            modifiedState = modifiedState.mergeDeep({
                system
            });
            return modifiedState.toJS();
        default:
            return state; 
    }
};

export default app;