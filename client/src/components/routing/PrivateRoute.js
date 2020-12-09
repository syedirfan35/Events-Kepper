import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ userData, component: Component, ...rest }) => {
  const { isAuthenticated, loading } = userData;
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  userData: state.user
});

export default connect(mapStateToProps)(PrivateRoute);
