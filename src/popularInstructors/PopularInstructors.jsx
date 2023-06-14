import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { motion } from "framer-motion"

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
        <div className='px-2 pb-16'>
            <h1 className='text-center font-bold text-3xl my-8 text-violet-400'>Popular Instructors</h1>
            <div className='grid lg:grid-cols-3 grid-cols-1 lg:gap-4 gap-3'>
                {
                    topInstructors.map(topInstructor => <motion.div
                      animate={{
                        scale: [1, 1, 0.8, 0.8, 1],
                        rotate: [0, 0, 180, 180, 0],
                        borderRadius: ["20%", "20%", "50%", "50%", "20%"]
                       }}
                       transition={{duration : 3}}
                    key={topInstructor._id} className='mx-auto mb-3'>
                        <div className="card rounded-tr-lg rounded-tl-none rounded-br-none rounded-bl-lg w-86 bg-violet-200 shadow-xl">
                    <figure><img className='h-72' src={topInstructor.photo} alt="Shoes" /></figure>
                    <div className="card-body">
                      <p>Instructor Name: {topInstructor.name}</p>
                      <p>Instructor Email: {topInstructor.email}</p>
                    </div>
                  </div>
                    </motion.div>)
                }
            </div>
        </div>
    );
};

export default topInstructors;