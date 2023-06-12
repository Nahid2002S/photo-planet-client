import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageUsers = () => {

    const [axiosSecure] = useAxiosSecure();

    const {data : users = [], refetch} = useQuery(['users'], async() => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })

    const handleMakeAdmin = user =>{
        fetch(`https://assignment-12-server-bice.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                refetch()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an Admin now!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    const handleDelete = id =>{
        fetch(`https://assignment-12-server-bice.vercel.app/users/${id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            refetch()
            if(data.deletedCount){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: ' User Successfully Deleted!',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    const handleMakeInstructor = user =>{
        fetch(`https://assignment-12-server-bice.vercel.app/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                refetch()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an Instructor now!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    return (
        <div className='w-full px-6'>
            <h1 className='text-3xl font-semibold my-4'>Total Users: {users.length}</h1>
            <div className="overflow-x-auto">
  <table className="table table-zebra text-center">
    <thead className='bg-green-400'>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user, index) => <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user?.role ? <p>{user.role}</p> : <p>student</p>}</td>
            <td>
                <button onClick={()=> handleMakeAdmin(user)} className='btn btn-accent text-white p-2 rounded-md font-semibold mr-2' disabled={user.role === 'admin' || user.role === 'instructor'}>Make Admin</button>
                <button onClick={() => handleMakeInstructor(user)} className='btn btn-info text-white p-2 rounded-md font-semibold' disabled={user.role === 'admin' || user.role === 'instructor'}>Make Instructor</button>
                <button onClick={()=> handleDelete(user._id)} className='bg-red-600 p-2 text-white rounded-md ml-2'><FaTrashAlt></FaTrashAlt></button>
            </td>
          </tr>)
      }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ManageUsers;