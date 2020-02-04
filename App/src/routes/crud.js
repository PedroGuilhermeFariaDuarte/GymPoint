import React from 'react';
import { Route } from 'react-router-dom';

// Pages
import Enrollment from '../components/Enrollment';
import Plans from '../components/Plans';
import Student from '../components/Student';

function Routes() {
    return (
        <>
            <Route path="/myenrollment" exact={true} component={Enrollment} />
            <Route path="/myplans" exact={true} component={Plans} />
            <Route path="/student" exact={true} component={Student} />
        </>
    );
}

export default Routes;
