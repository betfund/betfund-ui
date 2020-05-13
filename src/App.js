import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import { AuthenticatedRoute, UnauthenticatedRoute, loading } from './auth'

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const ForgotPassword = React.lazy(() => import('./views/Pages/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./views/Pages/ResetPassword'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <UnauthenticatedRoute exact path="/login" name="Login Page" component={Login} />
              <UnauthenticatedRoute exact path="/register" name="Register Page" component={Register} />
              <UnauthenticatedRoute exact path="/forgot" name="Forgot Password Page" component={ForgotPassword} />
              <UnauthenticatedRoute exact path="/reset/:token" name="Reset Password Page" component={ResetPassword} />
              <Route exact path="/404" name="Page 404" component={Page404} />
              <Route exact path="/500" name="Page 500" component={Page500} />
              <AuthenticatedRoute path="/" name="Home" component={DefaultLayout} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}


export default App;
