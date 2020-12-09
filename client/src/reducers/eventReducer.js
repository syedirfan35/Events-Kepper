import {
  EVENTS_ERROR,
  SET_LOADING,
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT
} from "../actions/types";

const initialState = {
  events: [],
  loading: false,
  error: null,
  newEventAdded: false,
  current: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
        loading: false,
        newEventAdded: false
      };
    case ADD_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events],
        loading: false,
        newEventAdded: true
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event._id !== action.payload)
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case EVENTS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
