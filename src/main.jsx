import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './routes/routes.jsx';

import {
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './authProvider/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
