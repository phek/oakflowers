import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
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
const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  store.dispatch({ type: AUTHENTICATED, payload: user });
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
