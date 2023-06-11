import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const PopularClasses = () => {
    const [popularClasses, setPopularClasses] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/classes/popular')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setPopularClasses(data)
        })
    },[])
    return (
        <div className='px-2'>
            <h1 className='text-center font-semibold text-3xl my-8'>Popular Classes</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                {
                    popularClasses.map(popular => <div key={popular._id} className='mx-auto'>
                        <div className="card w-86 bg-base-100 shadow-xl">
                    <figure><img src={popular.image} alt="Shoes" /></figure>
                    <div className="card-body">
                      <h2 className="card-title">Class Name: {popular.className}</h2>
                      <p>Instructor Name: {popular.instructorName}</p>
                      <p>Instructor Email: {popular.email}</p>
                      <p>Seats: {popular.seats}</p>
                      <p>Instructor Email: {popular.price}</p>
                    </div>
                  </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default PopularClasses;