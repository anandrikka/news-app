import React from 'react';

import { Route, IndexRoute } from 'react-router';

import Home from './components/HomeComponent';
import PageNotFound from './components/PageNotFound';
import Main from './containers/Container';

const routes = (
    <Route path='/' component={Main}>
        <IndexRoute component={Home} />
    </Route>
);

export default routes;