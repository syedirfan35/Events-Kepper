import React, { useEffect } from "react";

import Events from "../events/Events";

import { connect } from "react-redux";
import { loadUser } from "../../actions/authAction";

import PreLoader from "../layout/Preloader";

const Home = ({ loadUser, loading }) => {
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  if (loading) {
    return <PreLoader />;
  }

  return (
    <div>
      <h4 className="center">
        Your <span className="purple-text">Event's</span> Details
      </h4>
      <Events />
    </div>
  );
};

const mapStateToProps = state => ({
  loading: Events.loading
});

export default connect(
  mapStateToProps,
  { loadUser }
)(Home);
