import React from 'react'
import {
    Switch,
    Route,
    Link,
    withRouter
  } from "react-router-dom";

import Intro from '../pages/Intro';
import Register from '../pages/Register';
import Login from '../pages/Login'
import AddEvent from '../pages/AddEvent'
import PrivateRoute from './PrivateRoute';
import UserPage from '../pages/UserPage';
import Statistics from '../pages/Statistics';
import {isLogin} from '../utils/index'
import '../styles/Styles.css'
import SpecialRoute from './AlreadyLoggedRoute';

function Navigator({...rest}) {
  const esteLogat = isLogin();
  console.log(rest.location.pathname,esteLogat)
    return (
      <div>
        {(rest.location.pathname === '/register' || rest.location.pathname === '/login') && (
        /*<nav className="navigator">
          <ul className="text-plat">
            <li>
              <Link to="/" exact>Welcome Page</Link>
            </li>
            <li>
              <Link to='/register'>Sign Up</Link>
            </li>
            <li>
                <Link to='login'>Login</Link>
            </li>
          </ul>
        </nav>*/
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link className="nav-link" to='/'>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/register'>Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/login'>Login</Link>
            </li>
          </ul>
        )}
        {(esteLogat && rest.location.pathname !== '/' && rest.location.pathname !== '/register' && rest.location.pathname !== '/login') &&
        (<nav className="navigator-user">
        <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link className="nav-link" to='/stats'>Statistics</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/addevent'>Events</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/profile'>Profile Page</Link>
            </li>
          </ul>
      </nav>
        )}
        <Switch>
          <Route path="/" exact>
            <Intro/>
          </Route>
          <SpecialRoute component={Register} path='/register' exact/>
          <SpecialRoute component={Login} path='/login' exact/>
          <PrivateRoute component={AddEvent} path="/addevent" exact />
          <PrivateRoute component={Statistics} path="/stats" exact />
          <PrivateRoute component={UserPage} path="/profile" exact />
        </Switch>
      </div>

    )
};

export default withRouter(Navigator)