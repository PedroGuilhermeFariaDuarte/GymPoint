import React from 'react';
import { Route } from 'react-router-dom';

// Pages
import Login from '../pages/login';
import Home from '../pages/Home';
import Plan from '../pages/Plan';
import Enrollment from '../pages/Enrollment';
import Help from '../pages/Help';

function Routes() {
    return (
        <>
            <Route path="/" exact={true} component={Login} />
            <Route path="/home" exact={true} component={Home} />
            <Route path="/plan" exact={true} component={Plan} />
            <Route path="/enrollment" exact={true} component={Enrollment} />
            <Route path="/help" exact={true} component={Help} />
        </>
    );
}

export default Routes;
