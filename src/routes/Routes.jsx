import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Blog from "../pages/Blog";
import Dashboard from "../pages/Dashboard";
import Funding from "../pages/Funding";
import DonationRequest from "../pages/DonationRequest";
import Home from "../pages/Home";
import SearchDonor from "../pages/SearchDonor";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/search-donors",
        element: <SearchDonor />,
      },
      {
        path: "/fundings",
        element: <Funding />,
      },
      {
        path: "/donation-request",
        element: <DonationRequest />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default router;
