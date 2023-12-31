import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../authProvider/AuthProvider';
import useInstructor from '../hooks/useInstructor';

const InstructorRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    const [isInstructor, instructorLoading] = useInstructor();

    if(loading || instructorLoading){
        return <span className="loading loading-bars loading-lg"></span>
    }

    if(user && isInstructor){
        return children;
    }
    return <Navigate state={{from : location}} to="/login" replace></Navigate>
};

export default InstructorRoute;