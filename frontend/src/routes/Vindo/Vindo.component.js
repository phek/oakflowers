import React from "react";
import { Route, Redirect } from "react-router-dom";
import { appRoutes } from "routes/_router/App.routes";
import Content from "components/Content/Content.component";
import Link from "components/Link/Link.component";
import Navbar from "components/Navbar";

const Vindo = ({ routes }) => {
  const rootRoute = appRoutes.vindo.path;
  const indexRoute = rootRoute + routes.tennis.path;

  return (
    <>
      <Navbar>
        <Navbar.SubNav>
          <Link to={rootRoute + routes.tennis.path}>Tennis</Link>
          <Link to={rootRoute + routes.bastu.path} disabled>
            Bastu
          </Link>
          <Link to={rootRoute + routes.stuga.path} disabled>
            Stuga
          </Link>
        </Navbar.SubNav>
      </Navbar>
      <Content hasSubNav>
        <Route
          path={rootRoute}
          exact
          render={(props) => <Redirect to={indexRoute} />}
        />
        {Object.keys(routes).map((key) => {
          const route = routes[key];
          const path = rootRoute + route.path;

          return (
            <Route
              key={key}
              path={path}
              render={(props) => (
                <route.component {...props} routes={route.routes} />
              )}
            />
          );
        })}
      </Content>
    </>
  );
};

export default Vindo;
