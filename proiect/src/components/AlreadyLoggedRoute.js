import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils';

const SpecialRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Redirect to="/addevent" />
            : <Component {...props} />
        )} />
    );
};

export default SpecialRoute;