import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../authProvider/AuthProvider';
import { Link } from 'react-router-dom';

const MyClasses = () => {
    const {user} = useContext(AuthContext);
    const [classes, setClasses] = useState([])

    const [showFeedback, setShowFeedback] = useState('')
    useEffect(()=>{
        fetch(`http://localhost:5000/classes/${user?.email}`)
        .then(res => res.json())
        .then(data=>{
            console.log(data)
           setClasses(data)
        })
    },[])

    const handleSeeFeedback = feedback =>{
      setShowFeedback(feedback)
    }

    return (
        <div>

<input type="checkbox" id="my_modal_7" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="text-3xl font-bold mb-3">Admin Feedback:</h3>
    <p>{showFeedback}</p>
    <div className="modal-action">
      <label htmlFor="my_modal_7" className="btn">Close!</label>
    </div>
  </div>
</div>

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
                <p>Total enrolled Students: {cls.student}</p>
                 <span>Status: <div className="badge badge-secondary">{cls.status}</div></span>
                <div className="card-actions my-2">
                  <Link to={`/dashboard/myclasses/update/${cls._id}`}><button className="btn btn-primary">Update</button></Link>
                  {
                  cls.feedback ? <label htmlFor="my_modal_7" className="btn btn-primary" onClick={()=>handleSeeFeedback(cls.feedback.feedback)}>See Feedback</label> : ''
                }
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