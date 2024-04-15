import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Main from './Main';

const ProtectedRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        loggedIn ? <Main {...props} /> : <Redirect to="/signin" />
      )}
    />
  );
};

export default ProtectedRoute;