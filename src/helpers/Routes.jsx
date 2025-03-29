import { createBrowserRouter } from "react-router-dom";

import { Home, Register } from "../pages";
import Frame from "../components/common/Frame";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Frame />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
    ],
  }
]);

export default routes;