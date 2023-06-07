import React, { useContext } from 'react';
import { AuthContext } from '../authProvider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {

    const {user} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const {data : isAdmin, isLoading: adminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            console.log(res);
            return res.data.admin;
        }
    })

    return [isAdmin, adminLoading]
};

export default useAdmin;