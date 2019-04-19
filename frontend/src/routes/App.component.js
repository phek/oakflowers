import React from "react";
import { Route } from "react-router-dom";
import Navbar from "components/Navbar/Navbar.component";
import { appRoutes } from "./App.routes";

const App = () => (
  <>
    <Navbar />
    {Object.keys(appRoutes).forEach(key => {
      const route = appRoutes[key];

      return (
        <Route
          exact={route.exact}
          key={key}
          path={route.path}
          render={props => <route.component {...props} routes={route.routes} />}
        />
      );
    })}
  </>
);

export default App;
