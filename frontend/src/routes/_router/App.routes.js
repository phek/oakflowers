/* App Routes */
import Home from "routes/Home/Home.component";
import Vindo from "routes/Vindo/Vindo.component";
import Nerja from "routes/Nerja/Nerja.component";
import AloeVera from "routes/AloeVera/AloeVera.component";

/* Vindo Routes */
import Tennis from "routes/Vindo/Tennis/Tennis.component";

export const appRoutes = {
  home: {
    exact: true,
    path: "/",
    component: Home
  },
  vindo: {
    path: "/vindo",
    component: Vindo,
    routes: {
      tennis: {
        path: "/tennis",
        component: Tennis
      },
      bastu: {
        path: "/bastu",
        component: Tennis
      },
      stuga: {
        path: "/stuga",
        component: Tennis
      }
    }
  },
  nerja: {
    path: "/nerja",
    component: Nerja
  },
  aloeVera: {
    path: "/aloe-vera",
    component: AloeVera
  }
};
