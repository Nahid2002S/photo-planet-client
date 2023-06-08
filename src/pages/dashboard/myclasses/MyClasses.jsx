import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../authProvider/AuthProvider';

const MyClasses = () => {
    const {user} = useContext(AuthContext);
    const [classes, setClasses] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:5000/classes/${user?.email}`)
        .then(res => res.json())
        .then(data=>{
            console.log(data)
           setClasses(data)
        })
    },[])

    return (
        <div>
            <h1 className='text-3xl font-semibold my-4'>My Classes: {classes.length}</h1>
            <div className='grid grid-cols-2 gap-4'>
            {
              classes.map(cls => <div key={cls._id}>
                <div className="card w-96 bg-base-100 shadow-xl">
              <figure><img src={cls.image} alt="Shoes" /></figure>
              <div className="card-body">
                <h2 className="card-title">Class Name: {cls.className}</h2>
                <p>Instructor Name: {cls.instructorName}</p>
                <p>Instructor: {cls.email}</p>
                <p>Price: {cls.price}</p>
                <p>Available Seats: {cls.seats}</p>
                {
                    cls.status ? <span>Status: <div className="badge badge-secondary">{cls.status}</div></span> : <span>Status: <div className="badge badge-secondary">pending</div></span>
                }
                <div className="card-actions my-2">
                  <button className="btn btn-primary">Update</button>
                </div>
              </div>
            </div>
              </div>)
      }
            </div>
        </div>
    );
};

export default MyClasses;