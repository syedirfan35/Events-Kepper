import React, { useEffect, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import SearchBar from "./components/layout/SearchBar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import EventForm from "./components/events/EventForm";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import PrivateRoute from "./components/routing/PrivateRoute";
import setAuthToken from "./components/utils/setAuthToken";

import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    // init materialize-css
    M.AutoInit();
  });
  return (
    <Router>
      <Provider store={store}>
        <Fragment>
          <SearchBar />
          <div className="container">
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/add-event" component={EventForm} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Fragment>
      </Provider>
    </Router>
  );
};

export default App;
