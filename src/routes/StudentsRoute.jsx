import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../authProvider/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';

const StudentsRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    if(loading){
        return <span className="loading loading-bars loading-lg text-center"></span>
    }

    if(user && !isAdmin && !isInstructor){
        return children;
    }
    return <Navigate state={{from : location}} to="/login" replace></Navigate>
};

export default StudentsRoute;