import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Main from "./components/Main";
import AllTask from "./components/AllTask";
import AllProjects from "./components/AllProject";
import Dashboard from "./components/Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/alltask",
        element: <AllTask />,
      },
      {
        path: "/allproject",
        element: <AllProjects />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
    errorElement: <h1 className='text-amber-300'>hello abhinav from error </h1>,
  },
]);

root.render(<RouterProvider router={router} />);
