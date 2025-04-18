import { createBrowserRouter } from "react-router-dom";

import { Home, Map, Wordle, Register } from "../pages";
import Frame from "@components/common/Frame";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Frame />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/map", element: <Map /> },
      { path: "/wordle", element: <Wordle /> },
    ],
  }
]);

export default routes;