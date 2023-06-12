import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Banner from "../banner/Banner";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageUsers from "../pages/dashboard/manage-users/ManageUsers";
import Addclass from "../pages/dashboard/addclass/Addclass";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import MyClasses from "../pages/dashboard/myclasses/MyClasses";
import ManageClasses from "../pages/dashboard/manageclasses/ManageClasses";
import AllClasses from "../pages/allclasses/AllClasses";
import SelectedClass from "../pages/dashboard/selectedclass/SelectedClass";
import ErrorPage from "../pages/errorpage/ErrorPage";
import EnrollClasses from "../pages/dashboard/enrollClasses/EnrollClasses";
import PaymentHistory from "../pages/dashboard/paymenthistory/PaymentHistory";
import UpdateMyClass from "../pages/dashboard/updateMyClass/UpdateMyClass";
import Instructors from "../pages/instructors/Instructors";
import Payment from "../pages/dashboard/payment/Payment";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      errorElement: <ErrorPage></ErrorPage>,
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
      errorElement: <ErrorPage></ErrorPage>,
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
          path: 'myclasses/update/:id',
          element: <UpdateMyClass></UpdateMyClass>
        },
        {
          path: 'manageclasses',
          element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
        },
        {
          path: 'selectedclass',
          element: <SelectedClass></SelectedClass>
        },
        {
          path: 'payment/:id',
          element: <Payment></Payment>
        },
        {
          path: 'enrollclasses',
          element: <EnrollClasses></EnrollClasses>
        },
        {
          path: 'paymenthistory',
          element: <PaymentHistory></PaymentHistory>
        }
      ]
    }
  ]);

export default router;