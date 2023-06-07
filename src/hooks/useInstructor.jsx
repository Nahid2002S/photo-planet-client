import React, { useContext } from 'react';
import { AuthContext } from '../authProvider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useInstructor = () => {

    const {user} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const {data : isInstructor, isLoading: InstructorLoading} = useQuery({
        queryKey: ['isInstructor', user?.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/users/instructor/${user?.email}`);
            console.log(res.data)
            return res.data.instructor;
        }
    })

    return [isInstructor, InstructorLoading]
};

export default useInstructor;