import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Banner from "../banner/Banner";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageUsers from "../pages/dashboard/manage-users/ManageUsers";
import Addclass from "../pages/dashboard/addclass/Addclass";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Instructors from "../pages/instructors/instructors";
import MyClasses from "../pages/dashboard/myclasses/MyClasses";
import ManageClasses from "../pages/dashboard/manageclasses/ManageClasses";
import Feedback from "../pages/dashboard/feedback/feedback";
import AllClasses from "../pages/allclasses/AllClasses";
import SelectedClass from "../pages/dashboard/selectedclass/SelectedClass";
import Payment from "../pages/dashboard/payment/payment";

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
        },
        {
          path: 'instructors',
          element: <Instructors></Instructors>
        },
        {
          path: 'classes',
          element: <AllClasses></AllClasses>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
      children: [
        {
          path: 'manageusers',
          element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path: 'addclass',
          element: <Addclass></Addclass>
        },
        {
          path: 'myclasses',
          element: <MyClasses></MyClasses>
        },
        {
          path: 'manageclasses',
          element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
        },
        {
          path: 'feedback',
          element: <AdminRoute><Feedback></Feedback></AdminRoute>
        },
        {
          path: 'selectedclass',
          element: <SelectedClass></SelectedClass>
        },
        {
          path: 'payment',
          element: <Payment></Payment>
        }
      ]
    }
  ]);

export default router;