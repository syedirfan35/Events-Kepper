import React, { useEffect } from "react";
import { connect } from "react-redux";

import Events from "../events/Events";
import { getEvents } from "../../actions/eventAction";

const Guest = ({ getEvents }) => {
  useEffect(() => {
    getEvents();
  });
  return (
    <div>
      <h3>Welcome</h3>
      <Events />
    </div>
  );
};

export default connect(
  null,
  { getEvents }
)(Guest);
