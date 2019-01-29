import { combineReducers } from "redux";
import authReducer from "./routes/state/Auth.reducers";

export default combineReducers({
  auth: authReducer
});
