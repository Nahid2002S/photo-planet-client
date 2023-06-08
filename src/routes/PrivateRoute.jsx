import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../authProvider/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <span className="loading loading-bars loading-lg text-center"></span>
    }

    if(user){
        return children;
    }
    return <Navigate state={{from : location}} to="/login" replace></Navigate>
};

export default PrivateRoute;