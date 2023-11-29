import React from 'react';
import {PropTypes} from 'prop-types';
import {Route, Router, Switch} from 'dva/router';
import IndexPage from './modules/index/indexPage';

function RouterConfig({history}) {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" component={IndexPage}/>
            </Switch>
        </Router>
    );
}

RouterConfig.propTypes = {
    history: PropTypes.object.isRequired, // eslint-disable-line
};

export default RouterConfig;
