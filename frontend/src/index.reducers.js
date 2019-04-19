import { combineReducers } from "redux";
import authReducer from "./routes/_state/auth/Auth.reducers";

export default combineReducers({
  auth: authReducer
});
