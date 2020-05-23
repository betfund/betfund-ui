import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { betfundApi } from './api';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const isAuthenticated = async () => {
  try {
    const response = await betfundApi.isActiveToken(localStorage.getItem('token'));
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
          return loading();
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
          return loading();
        }
        return !authenticated
          ? <Component {...props} />
          : <Redirect to="/" />;
      }}
    />
  );
};

export { AuthenticatedRoute, UnauthenticatedRoute, loading };