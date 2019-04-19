import React from "react";
import { Route } from "react-router-dom";
import { appRoutes } from "./_router/App.routes";

const App = () => (
  <>
    {Object.keys(appRoutes).map(key => {
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
