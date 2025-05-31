import React from "react";
import {createRoot} from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import routes from "./helpers/Routes";
import "./global.css";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(<RouterProvider router={routes} />);
