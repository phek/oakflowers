import React from "react";
import { Route } from "react-router-dom";
import { appRoutes } from "./App.routes";

const App = () =>
  appRoutes.map((route, i) => (
    <Route
      key={i}
      path={route.path}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  ));

export default App;
