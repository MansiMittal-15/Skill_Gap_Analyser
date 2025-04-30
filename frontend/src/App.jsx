import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import MobileNavigation from "./components/MobileNavigation";
import AnalyseForm from "./components/AnalyseForm";
import Services from "./components/Services";
import SkillGapAnalysis from "./components/SkillGapAnalysis";
import BuyCredits from "./components/BuyCredits";
import Plans from "./components/Plans";

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
    path: "/analyse",
    element: <SkillGapAnalysis />,
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
    path: "/credits",
    element: <BuyCredits />,
  },
  {
    path: "/mobileNavigation",
    element: <MobileNavigation />,
  },
  {
    path: "/plans",
    element: <Plans />,
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
