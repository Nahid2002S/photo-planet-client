import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Instructors = () => {

    const [axiosSecure] = useAxiosSecure();

    const {data : instructors = [], refetch} = useQuery(['instructors'], async() => {
        const res = await axiosSecure.get('/users/instructors')
        console.log(res.data)
        return res.data;
    })


    return (


        <div className="overflow-x-auto px-12 mt-16">
  <table className="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Photo</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
        instructors.map((instructor, index) =>  <tr key={instructor._id}>
            <th>{index + 1}</th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask w-[5rem] h-[5rem] rounded-full">
                    <img src={instructor.photo} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
              </div>
            </td>
            <td>{instructor.name}</td>
            <td>{instructor.email}</td>
          </tr>)
     }
    </tbody>
    
  </table>
</div>
    );
};

export default Instructors;