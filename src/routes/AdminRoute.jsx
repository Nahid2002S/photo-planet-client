import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../authProvider/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    const [isAdmin, adminLoading] = useAdmin();

    if(loading || adminLoading){
        return <span className="loading loading-bars loading-lg"></span>
    }

    if(user && isAdmin){
        return children;
    }
    return <Navigate state={{from : location}} to="/login" replace></Navigate>
};

export default AdminRoute;