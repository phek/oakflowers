import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./reduxStore";
import { AUTHENTICATED } from "./routes/_state/auth/Auth.actions";
import App from "routes/App.component";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";

const store = configureStore();
const user = localStorage.getItem("user");

if (user) {
  store.dispatch({ type: AUTHENTICATED });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
