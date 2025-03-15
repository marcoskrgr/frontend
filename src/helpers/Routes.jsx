import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages";
import Frame from "../components/common/Frame";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Frame />,
    children: [
      { path: "/", element: <Home /> },
    ],
  },
]);

export default routes;