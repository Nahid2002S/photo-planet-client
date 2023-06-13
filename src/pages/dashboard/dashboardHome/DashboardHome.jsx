import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../authProvider/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import useInstructor from '../../../hooks/useInstructor';

const DashboardHome = () => {

    const {user} = useContext(AuthContext)
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    console.log(user)

    return (
        <div className="card w-96 bg-gradient-to-r from-violet-500 to-purple-700 shadow-xl text-white">
  <div>
  <figure className="px-10 pt-10">
    <img src={user?.photoURL} alt="Shoes" className="w-[120px] h-[120px] rounded-full" />
  </figure>
  </div>
  <div className="card-body items-center text-left">
    <h2 className="card-title text-left">Name: {user?.displayName}</h2>
    <p className='font-semibold'>Email: {user?.email}</p>
    {
        isAdmin ? <p className='font-semibold'>Role: Admin</p> : ''
    }
    {
        isInstructor ? <p className='font-semibold'>Role: Instructor</p> : ''
    }
    {
        !isInstructor && !isAdmin ? <p className='font-semibold'>Role: Student</p> : ''
    } 
  </div>
</div>
    );
};

export default DashboardHome;