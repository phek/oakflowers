import { combineReducers } from "redux";
import authReducer from "./auth/Auth.reducers";
import eventReducer from "./event/Event.reducers";

export default combineReducers({
  auth: authReducer,
  events: eventReducer
});
