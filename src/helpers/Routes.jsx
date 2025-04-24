import { createBrowserRouter } from "react-router-dom";

import { Home, Map, Wordle, Register, ConfirmPhone, Phrase } from "../pages";
import Frame from "@components/common/Frame";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Frame />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/confirm-phone", element: <ConfirmPhone /> },
      { path: "/map", element: <Map /> },
      { path: "/wordle", element: <Wordle /> },
      { path: "/phrase", element: <Phrase /> },
    ],
  }
]);

export default routes;