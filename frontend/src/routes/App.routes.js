import Home from "routes/Home/Home.component";
import Vindo from "routes/Vindo/Vindo.component";
import Nerja from "routes/Nerja/Nerja.component";
import AloeVera from "routes/AloeVera/AloeVera.component";

export const appRoutes = {
  home: {
    exact: true,
    path: "/",
    component: Home,
    routes: []
  },
  vindo: {
    path: "/vindo",
    component: Vindo,
    routes: []
  },
  nerja: {
    path: "/nerja",
    component: Nerja,
    routes: []
  },
  aloeVera: {
    path: "/aloe-vera",
    component: AloeVera,
    routes: []
  }
};
