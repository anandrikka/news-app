import React from 'react';

import { Route, IndexRoute } from 'react-router';

import Home from './components/HomeComponent';
import PageNotFound from './components/PageNotFound';
import TestComponent from './components/TestComponent';
import Main from './containers/Container';

const routes = (
    <Route path='/' component={Main}>
        <IndexRoute component={Home} />
        <Route path='/test' component={TestComponent}></Route>
        <Route path="*" component={PageNotFound}></Route>
    </Route>
);

export default routes;