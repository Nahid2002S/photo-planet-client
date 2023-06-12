import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const topInstructors = () => {

    const [topInstructors, setTopInstructors] = useState([]);
    useEffect(()=>{
        fetch('https://assignment-12-server-bice.vercel.app/users/top/instructors')
        .then(res => res.json())
        .then(data => {
            setTopInstructors(data)
        })
    },[])

    return (
        <div className='px-2'>
            <h1 className='text-center font-semibold text-3xl my-8'>Top Instructors</h1>
            <div className='grid lg:grid-cols-3 grid-cols-1 lg:gap-4 gap-3'>
                {
                    topInstructors.map(topInstructor => <div key={topInstructor._id} className='mx-auto mb-3'>
                        <div className="card w-86 bg-base-100 shadow-xl">
                    <figure><img src={topInstructor.photo} alt="Shoes" /></figure>
                    <div className="card-body">
                      <p>Instructor Name: {topInstructor.name}</p>
                      <p>Instructor Email: {topInstructor.email}</p>
                    </div>
                  </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default topInstructors;