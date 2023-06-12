import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../authProvider/AuthProvider';
import useTitle from '../../../hooks/useTitle';

const EnrollClasses = () => {
    const {user} = useContext(AuthContext)
    const [enrollClasses, setEnrollClasses] = useState([]);

    useEffect(()=>{
        fetch(`https://assignment-12-server-bice.vercel.app/payments/${user?.email}`)
        .then(res => res.json())
        .then(data => {
            setEnrollClasses(data)
        })
    },[])

    useTitle('Enrolled Classes')

    return (
        <div className='w-full'>
            <h1 className='text-3xl font-semibold w-2/3 mx-auto my-4'>Enrolled Classes: {enrollClasses.length}</h1>
            <table className="table w-2/3 mx-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         {
            enrollClasses.map((enrollclass, index) =>  <tr key={enrollclass._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask w-[5rem] h-[5rem] rounded-full">
                        <img src={enrollclass.image} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{enrollclass.instructorName}</td>
                <td>{enrollclass.email}</td>
                <td><button className='btn btn-primary'>View</button></td>
              </tr>)
         }
        </tbody>
        
      </table>
        </div>
    );
};

export default EnrollClasses;