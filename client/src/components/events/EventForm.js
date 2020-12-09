import React, { useState } from "react";
import { connect } from "react-redux";
import { addEvent } from "../../actions/eventAction";
import { Redirect } from "react-router-dom";

import M from "materialize-css/dist/js/materialize.min.js";

const EventForm = ({ addEvent, eventsData: { newEventAdded } }) => {
  const [event, setEvent] = useState({
    eventName: "",
    eventTime: "",
    eventVenue: "",
    eventDetails: "",
    eventOrganiser: ""
  });

  const {
    eventName,
    eventTime,
    eventVenue,
    eventDetails,
    eventOrganiser
  } = event;

  const onChange = e => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    if (
      eventName === "" ||
      eventTime === "" ||
      eventDetails === "" ||
      eventVenue === "" ||
      eventOrganiser === ""
    ) {
      M.toast({ html: "Please enter valid details.", classes: "rounded" });
    } else {
      const newEvent = event;
      addEvent(newEvent);
      //clear-fields
      setEvent({
        eventName: "",
        eventTime: "",
        eventVenue: "",
        eventDetails: "",
        eventOrganiser: ""
      });
    }
  };
  if (newEventAdded) {
    return <Redirect to="/" />;
  }

  return (
    <div className="row">
      <form className="col s12" onSubmit={onSubmit}>
        <h3 className="center purple-text">Add Event</h3>
        <div className="row">
          <div className="input-field col l6 m6 s12">
            {/* <i className="material-icons prefix">assignment_turned_in</i> */}
            <input
              type="text"
              name="eventName"
              value={eventName}
              onChange={onChange}
            />
            <label htmlFor="eventName">Event Name</label>
          </div>
          <div className="input-field col l6 m6 s12">
            {/* <i className="material-icons prefix">event</i> */}
            <input
              type="text"
              name="eventTime"
              value={eventTime}
              onChange={onChange}
            />
            <label htmlFor="eventTime">Event Time</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col l6 m6 s12">
            {/* <i className="material-icons prefix">add_location_alt</i> */}
            <input
              type="text"
              name="eventVenue"
              value={eventVenue}
              onChange={onChange}
            />
            <label htmlFor="eventVenue">Event Venue</label>
          </div>
          <div className="input-field col l6 m6 s12">
            {/* <i className="material-icons prefix">beenhere</i> */}
            <input
              type="text"
              name="eventOrganiser"
              value={eventOrganiser}
              onChange={onChange}
            />
            <label htmlFor="eventOrganiser">Event Organiser</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col  s12">
            {/* <i className="material-icons prefix">info</i> */}
            <textarea
              className="materialize-textarea"
              name="eventDetails"
              value={eventDetails}
              onChange={onChange}
            ></textarea>
            <label htmlFor="eventDetails">Event Details</label>
          </div>
        </div>

        <div className="row"></div>
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
  eventsData: state.events
});

export default connect(
  mapStateToProps,
  { addEvent }
)(EventForm);
