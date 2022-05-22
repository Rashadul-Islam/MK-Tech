import React from 'react';
import { useSelector } from 'react-redux';
import {Route, Redirect} from 'react-router-dom'



const ProtectedRoute = ({ children, ...rest }) => {
    const user = useSelector((state) =>
    state.userLogin.userInfo ? state.userLogin.userInfo : ""
  );
    return (
        <Route
          {...rest}
          render={({ location }) =>
            user.email ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location }
                }}
              />
            )
          }
        />
      );
};

export default ProtectedRoute;