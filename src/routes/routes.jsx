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
import InstructorRoute from "./InstructorRoute";
import StudentsRoute from "./StudentsRoute";
import DashboardHome from "../pages/dashboard/dashboardHome/DashboardHome";

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
        },
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: 'dashboardhome',
          element: <DashboardHome></DashboardHome>
        },
        {
          path: 'manageusers',
          element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path: 'addclass',
          element: <InstructorRoute><Addclass></Addclass></InstructorRoute>
        },
        {
          path: 'myclasses',
          element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
        },
        {
          path: 'myclasses/update/:id',
          element: <InstructorRoute><UpdateMyClass></UpdateMyClass></InstructorRoute>
        },
        {
          path: 'manageclasses',
          element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
        },
        {
          path: 'selectedclass',
          element: <StudentsRoute><SelectedClass></SelectedClass></StudentsRoute>
        },
        {
          path: 'payment/:id',
          element: <StudentsRoute><Payment></Payment></StudentsRoute>
        },
        {
          path: 'enrollclasses',
          element: <StudentsRoute><EnrollClasses></EnrollClasses></StudentsRoute>
        },
        {
          path: 'paymenthistory',
          element: <StudentsRoute><PaymentHistory></PaymentHistory></StudentsRoute>
        }
      ]
    }
  ]);

export default router;