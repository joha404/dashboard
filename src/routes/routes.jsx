import { createBrowserRouter } from "react-router-dom";
import PageWithTitle from "../shared/PageWithTitle.jsx";
import WelcomePage from "../pages/WelcomePage/WelcomePage.jsx";
import authRoutes from "./authRoutes.jsx";
import dashboardRoutes from "./dashboardRoutes.jsx";
import miscRoutes from "./miscRoutes.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageWithTitle Component={WelcomePage} title={"Admin || Welcome"} />
    ),
  },
  ...authRoutes,
  dashboardRoutes,
  ...miscRoutes,
]);

export default routes;
