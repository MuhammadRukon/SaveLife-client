import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Blog from "../pages/Blog";
import Funding from "../pages/Funding";
import DonationRequest from "../pages/DonationRequest";
import Home from "../pages/Home";
import SearchDonor from "../pages/SearchDonor";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Profile from "../pages/dashboard/Profile";
import ManageContent from "../pages/dashboard/ManageContent";
import BloodDonationRequests from "../pages/dashboard/BloodDonationRequests";
import Users from "../pages/dashboard/Users";
import ManageContentHome from "../pages/dashboard/ManageContentHome";
import AddBlog from "../pages/dashboard/AddBlog";
import AdminRoute from "./AdminRoute";
import VolunteerRoute from "./VolunteerRoute";
import MyDonationRequest from "../pages/dashboard/MyDonationRequest";
import CreateDonationRequest from "../pages/dashboard/CreateDonationRequest";
import EditDonationRequest from "../pages/dashboard/EditDonationRequest";
import BloodDonationRequestDetails from "../pages/dashboard/BloodDonationRequestDetails";
import axiosSecure from "../api";
import DonorRoute from "./DonorRoute";

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
        element: (
          <PrivateRoute>
            <Funding />
          </PrivateRoute>
        ),
      },
      {
        path: "/donation-request",
        element: <DonationRequest />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Users />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "content-management",
        element: (
          <PrivateRoute>
            <VolunteerRoute>
              <ManageContent />
            </VolunteerRoute>
          </PrivateRoute>
        ),

        children: [
          {
            index: true,
            element: <ManageContentHome />,
          },
          {
            path: "add-blog",
            element: (
              <PrivateRoute>
                <VolunteerRoute>
                  <AddBlog />
                </VolunteerRoute>
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "all-blood-donation-request",
        element: (
          <PrivateRoute>
            <VolunteerRoute>
              <BloodDonationRequests />
            </VolunteerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-blood-donation-requests",
        element: (
          <PrivateRoute>
            <DonorRoute>
              <MyDonationRequest />
            </DonorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "create-donation-request",
        element: (
          <PrivateRoute>
            {/* donor */}
            <CreateDonationRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "blood-donation-request/update/:id",
        element: (
          <PrivateRoute>
            <EditDonationRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "blood-donation-request/details/:id",
        element: (
          <PrivateRoute>
            <BloodDonationRequestDetails />
          </PrivateRoute>
        ),
        // loader: ({ params }) => axiosSecure(`/blood-donation/${params.id}`),
      },
    ],
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
