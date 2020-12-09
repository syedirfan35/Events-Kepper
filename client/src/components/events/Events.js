import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getEvents } from "../../actions/eventAction";

import EventItem from "./EventItem";

const Events = ({ events: { events, loading }, getEvents }) => {
  useEffect(() => {
    getEvents();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="row">
      {!loading && events.length === 0 ? (
        <p className="center">No events to show right now.</p>
      ) : (
        events.map(data => <EventItem data={data} key={data._id} />)
      )}
    </div>
  );
};
const mapStateToProps = state => ({
  events: state.events
});

export default connect(
  mapStateToProps,
  { getEvents }
)(Events);
