import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authAction";
import M from "materialize-css/dist/js/materialize.min.js";

const SearchBar = ({ logout, userData }) => {
  useEffect(() => {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {});
    //eslint-disable-next-line
  }, []);
  const { isAuthenticated, user } = userData;

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}!</li>

      <li>
        <Link to="/" className="sidenav-close">
          Home
        </Link>
      </li>
      <li>
        <Link to="/add-event" className="sidenav-close">
          Add Event
        </Link>
      </li>
      <li>
        <a href="#!" className="sidenav-close" onClick={() => logout()}>
          <i className="material-icons">logout</i>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register" className="sidenav-close">
          Register
        </Link>
      </li>
      <li>
        <Link to="/login" className="sidenav-close">
          Login
        </Link>
      </li>
    </Fragment>
  );
  return (
    <Fragment>
      <div className="navbar-fixed">
        <nav style={{ marginBottom: "30px" }} className="purple lighten-1">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo" id="logo">
              Event's Keeper
            </a>
            <a href="#!" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              {isAuthenticated ? authLinks : guestLinks}
            </ul>
          </div>
        </nav>
      </div>
      <ul className="sidenav" id="mobile-demo">
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  userData: state.user
});

export default connect(
  mapStateToProps,
  { logout }
)(SearchBar);
