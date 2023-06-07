import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Banner from "../banner/Banner";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageUsers from "../pages/dashboard/manage-users/ManageUsers";
import Addclass from "../pages/dashboard/addclass/Addclass";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
          path: '/',
          element: <Banner></Banner>
        },
        {
          path: 'register',
          element: <Register></Register>
        },
        {
          path: 'login',
          element: <Login></Login>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <DashboardLayout></DashboardLayout>,
      children: [
        {
          path: 'manageusers',
          element: <ManageUsers></ManageUsers>
        },
        {
          path: 'addclass',
          element: <Addclass></Addclass>
        }
      ]
    }
  ]);

export default router;