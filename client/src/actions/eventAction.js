import {
  EVENTS_ERROR,
  SET_LOADING,
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT
} from "./types";
import Axios from "axios";

//add new event
export const addEvent = newEvent => async dispatch => {
  // setLoading();
  dispatch(setLoading());
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await Axios.post("api/events", newEvent, config);

    dispatch({
      type: ADD_EVENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENTS_ERROR,
      payload: err.response.msg
    });
  }
};
//get all events
export const getEvents = () => async dispatch => {
  // setLoading();
  dispatch(setLoading());
  try {
    const res = await Axios.get("api/events");
    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENTS_ERROR,
      payload: err.response.msg
    });
  }
};

//delete event
export const deleteEvent = id => async dispatch => {
  try {
    await Axios.delete(`/api/events/${id}`);
    dispatch({
      type: DELETE_EVENT,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: EVENTS_ERROR,
      payload: err.response.msg
    });
  }
};

//set loading
const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
