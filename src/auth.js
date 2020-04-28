import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { betfundApi } from './api';

const isAuthenticated = async () => {
  try {
    const response = await betfundApi.isActiveToken(sessionStorage.getItem('token'));
    return response.ok;
  } catch (error) {
    return false;
  }
};

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(null);
  useEffect(() => {
    isAuthenticated().then((bool) => setAuthenticated(bool));
  }, []);

  return (
    <Route {...rest} render={(props) => {
        if (authenticated === null) {
          return 'Loading...';
        }
        return authenticated
          ? <Component {...props} />
          : <Redirect to="/login" />;
      }}
    />
  );
};

const UnauthenticatedRoute = ({ component: Component, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(null);
  useEffect(() => {
    isAuthenticated().then((bool) => setAuthenticated(bool));
  }, []);
  return (
    <Route {...rest} render={(props) => {
        if (authenticated === null) {
          return 'Loading...';
        }
        return !authenticated
          ? <Component {...props} />
          : <Redirect to="/" />;
      }}
    />
  );
};

export { AuthenticatedRoute, UnauthenticatedRoute };