import { createBrowserRouter } from "react-router-dom";

import { Home, Map } from "../pages";
import Frame from "../components/common/Frame";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Frame />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/map", element: <Map /> },
    ],
  },
]);

export default routes;