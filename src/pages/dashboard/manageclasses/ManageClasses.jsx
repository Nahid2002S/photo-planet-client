import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageClasses = () => {

    const [allClasses, setAllClasses] = useState([])
    const [axiosSecure] = useAxiosSecure();

    useEffect(()=>{
        fetch('http://localhost:5000/classes')
        .then(res => res.json())
        .then(data=>{
            setAllClasses(data)
        })
    },[allClasses])

    const handleApproved = id =>{
        fetch(`http://localhost:5000/classes/approve/${id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {

        })
    }

    const handleDeny = id =>{
        fetch(`http://localhost:5000/classes/deny/${id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {

        })
    }

    return (
        <div>
            <h1 className='text-3xl font-semibold my-4'>Manage Classes: {allClasses.length}</h1>
            <div className='grid grid-cols-2 gap-4'>
            {
              allClasses.map(singleclass => <div key={singleclass._id}>
                <div className="card w-96 bg-base-100 shadow-xl">
              <figure><img src={singleclass.image} alt="Shoes" /></figure>
              <div className="card-body">
                <h2 className="card-title">Class Name: {singleclass.className}</h2>
                <p>Instructor Name: {singleclass.instructorName}</p>
                <p>Instructor: {singleclass.email}</p>
                <p>Price: {singleclass.price}</p>
                <p>Available Seats: {singleclass.seats}</p>
                {
                    singleclass.status ? <span>Status: <div className="badge badge-secondary">{singleclass.status}</div></span> : <span>Status: <div className="badge badge-secondary">pending</div></span>
                }
                <div className='flex gap-2'>
                <button onClick={()=>handleApproved(singleclass._id)} className="btn btn-sm text-white bg-green-600" disabled={singleclass.status === 'approved' || singleclass.status === 'denied'}>Approve</button>
                <button onClick={()=>handleDeny(singleclass._id)} className="btn btn-sm text-white bg-red-600" disabled={singleclass.status === 'approved' || singleclass.status === 'denied'}>Deny</button>
                <Link to='/dashboard/feedback'><button className="btn btn-sm text-white bg-orange-600">Send Feedback</button></Link>
                </div>
              </div>
            </div>
              </div>)
      }
            </div>
        </div>
    );
};

export default ManageClasses;