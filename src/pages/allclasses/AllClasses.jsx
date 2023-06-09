import React, { useContext, useEffect, useState } from 'react';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';

const AllClasses = () => {

    const [approvedClasses, setApprovedClasses] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/classes/approve')
        .then(res=> res.json())
        .then(data =>{
            setApprovedClasses(data)
        })
    },[])

    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    return (
        <div className='mt-16'>
            <h1 className='text-3xl font-semibold my-4'>All Classes: {approvedClasses.length}</h1>
            <div className='grid grid-cols-3 mb-4'>
            {
              approvedClasses.map(approvedclass => <div key={approvedclass._id} className='mx-auto'>
                <div className="card w-96 bg-base-100 shadow-xl">
              <figure><img src={approvedclass.image} alt="Shoes" /></figure>
              <div className="card-body">
                <h2 className="card-title">Class Name: {approvedclass.className}</h2>
                <p>Instructor Name: {approvedclass.instructorName}</p>
                <p>Instructor: {approvedclass.email}</p>
                <p>Price: {approvedclass.price}</p>
                <p>Available Seats: {approvedclass.seats}</p>
                <button disabled={isAdmin || isInstructor} className="btn text-white bg-orange-600">Select</button>
                </div>
              </div>
            </div>)
      }
            </div>
        </div>
    );
};

export default AllClasses;