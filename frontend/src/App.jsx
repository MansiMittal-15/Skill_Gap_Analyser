import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import MobileNavigation from "./components/MobileNavigation";
import AnalyseForm from "./components/AnalyseForm";
import Services from "./components/Services";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path:'/services',
    element: <Services />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/analyse-form",
    element: <AnalyseForm />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/mobileNavigation",
    element: <MobileNavigation />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default App;
