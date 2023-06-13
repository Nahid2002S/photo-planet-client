import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const PopularClasses = () => {
    const [popularClasses, setPopularClasses] = useState([]);
    useEffect(()=>{
        fetch('https://assignment-12-server-bice.vercel.app/classes/popular')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setPopularClasses(data)
        })
    },[])
    return (
        <div className='px-2'>
            <h1 className='text-center font-bold text-3xl my-8 uppercase text-violet-400'>Popular Classes</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                {
                    popularClasses.map(popular => <div key={popular._id} className='mx-auto'>
                        <div className="card w-86 bg-violet-200 shadow-xl">
                    <figure><img className='h-72' src={popular.image} alt="Shoes" /></figure>
                    <div className="card-body">
                      <h2 className="card-title">Class Name: {popular.className}</h2>
                      <p>Instructor Name: {popular.instructorName}</p>
                      <p>Instructor Email: {popular.email}</p>
                      <p>Seats: {popular.seats}</p>
                      <p>Price: {popular.price}</p>
                      <p>Student: {popular.student}</p>
                    </div>
                  </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default PopularClasses;