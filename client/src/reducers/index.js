import { combineReducers } from "redux";
import eventReducer from "./eventReducer";
import authReducer from "./authReducer";

export default combineReducers({
  events: eventReducer,
  user: authReducer
});
