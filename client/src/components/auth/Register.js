import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { push } from "connected-react-router";
import { Redirect } from "react-router-dom";

import { register, clearErrors, loadUser } from "../../actions/authAction";

import M from "materialize-css/dist/js/materialize.min.js";

const Register = ({ register, clearErrors, userData, loadUser }) => {
  const { isAuthenticated, error } = userData;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  // console.log(userData.error);

  useEffect(() => {
    if (isAuthenticated) {
      M.toast({ html: "Registered Successfully.", classes: "rounded" });
    }

    if (error === "User already exists") {
      M.toast({ html: "User already exists.", classes: "rounded" });
      clearErrors();
    }

    //eslint-disable-next-line
  }, [error, isAuthenticated]);

  const { name, email, password, password2 } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      M.toast({
        html: "Please enter correct password.",
        classes: "rounded"
      });
    } else if (
      name === "" ||
      email === "" ||
      password === "" ||
      password2 === ""
    ) {
      M.toast({
        html: "Please enter all fields to continue.",
        classes: "rounded"
      });
    } else {
      register({
        name,
        email,
        password
      });
      // dispatch(push("/"));
      //clear filters
      setUser({
        name: "",
        email: "",
        password: "",
        password2: ""
      });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="row">
      <form className="col s12" onSubmit={onSubmit}>
        <h3 className="center" id="register-header">
          Account <span className="purple-text">Register</span>
        </h3>

        <div className="row">
          <div className="input-field col l6 m6 s12">
            <input type="text" name="name" value={name} onChange={onChange} />
            <label htmlFor="name">Name</label>
          </div>
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
          <div className="input-field col l6 m6 s12">
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
            />
            <label htmlFor="password">Confirm Password</label>
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
Register.propTypes = {
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  userData: state.user
});
export default connect(
  mapStateToProps,
  { register, clearErrors, loadUser }
)(Register);
