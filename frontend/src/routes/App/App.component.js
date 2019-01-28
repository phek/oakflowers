import React from "react";
import { Route } from "react-router-dom";
import Navbar from "components/Navbar/Navbar.component";
import { appRoutes } from "./App.routes";

const App = () => (
  <>
    <Navbar />
    {appRoutes.map((route, i) => (
      <Route
        key={i}
        path={route.path}
        render={props => <route.component {...props} routes={route.routes} />}
      />
    ))}
  </>
);

export default App;
