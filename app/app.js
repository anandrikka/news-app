import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';
import Routes from './routes';
import css from './assets/styles/scss/app.scss';

const provider = (
    <Provider store={ store }>
        <Router history={ hashHistory }>
            { Routes }
        </Router>
    </Provider>
);

ReactDOM.render(provider, document.getElementById('app'));

