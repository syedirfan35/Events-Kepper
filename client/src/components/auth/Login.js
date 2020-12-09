import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login, clearErrors } from "../../actions/authAction";
import { Redirect } from "react-router-dom";

import M from "materialize-css/dist/js/materialize.min.js";

const Register = ({ login, userData, clearErrors }) => {
  const { isAuthenticated, error } = userData;
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  useEffect(() => {
    if (error === "Invalid Credentials") {
      M.toast({ html: "Invalid Credentials", classes: "rounded" });
      clearErrors();
    }

    if (isAuthenticated) {
      M.toast({ html: "Logged in successfully.", classes: "rounded" });
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated]);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      M.toast({
        html: "Please enter all fields to continue.",
        classes: "rounded"
      });
    } else {
      login({
        email,
        password
      });
      //clear filters
      setUser({
        email: "",
        password: ""
      });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="row">
      <form className="col s12" onSubmit={onSubmit}>
        <h3 className="center" id="login-header">
          Account <span className="center purple-text">Login</span>
        </h3>

        <div className="row">
          <div className="input-field col l6 m6 s12">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
            />
            <label htmlFor="email">Email ID</label>
          </div>
          <div className="input-field col l6 m6 s12">
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="center">
          <button className="btn waves-effect waves-light purple" type="submit">
            Submit
            <i className="material-icons right">send</i>
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  userData: state.user
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(Register);
