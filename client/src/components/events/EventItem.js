import React, { Fragment } from "react";
import { connect } from "react-redux";
import { deleteEvent } from "../../actions/eventAction";
import M from "materialize-css/dist/js/materialize.min.js";

const EventItem = ({
  data,
  deleteEvent,
  userData: { isAuthenticated, user }
}) => {
  const {
    eventName,
    eventTime,
    eventDetails,
    eventOrganiser,
    eventVenue,
    _id
  } = data;
  // console.log(eventName);
  const onDelete = () => {
    deleteEvent(_id);
    M.toast({ html: "Deleted Successfully.", classes: "rounded" });
  };

  const showDelete = (
    <a
      href="#!"
      className="btn-floating halfway-fab waves-effect waves-light teal"
      onClick={onDelete}
    >
      <i className="material-icons">delete</i>
    </a>
  );

  return (
    <Fragment>
      <div className="col l4 m6 s12">
        <div className="card hoverable">
          <div className="card-image">
            <img
              src="https://picsum.photos/500/300/?image=10"
              alt="demo-img"
            ></img>
            <span className="card-title">{eventName}</span>
            {isAuthenticated && showDelete}
          </div>
          <div className="card-content">
            <div>
              <b className="date-text">{eventTime + ","}</b>
              <p className="flow-text">{eventVenue + ","}</p>
              <span className="divider"></span>
              <p className="purple-text flow-text">{eventOrganiser}</p>
            </div>
          </div>
          <div className="card-action">
            <div className="purple-text flow-text">{eventDetails}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  userData: state.user
});

export default connect(
  mapStateToProps,
  { deleteEvent }
)(EventItem);
