import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ManageClasses = () => {

    const [allClasses, setAllClasses] = useState([])

    const [feedback, setFeedback] = useState('');

    const singleClasses = allClasses.map(classs => classs._id);
    console.log(singleClasses)

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

    const handleFeedback = event =>{
        const adminFeedback = event.target.value;
        setFeedback(adminFeedback)
    }

    const handleSend = () =>{
        const [axiosSecure] = useAxiosSecure();

       const {data : feedback = [], refetch} = useQuery(['feedback'], async() => {
        const res = await axiosSecure.patch('/classes/feedback/${}')
        console.log(res.data)
        return res.data;
    })
        console.log(feedback)
    }


    return (
        <div>
         <div>
         <dialog id="my_modal_3" className="modal">
         <div className='modal-box'>
          <form method="dialog" className="">
          <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-red-500 text-white">✕</button>
            <h3 className="font-bold text-3xl my-4">Send Feedback!</h3>
            <textarea onChange={(event)=> handleFeedback(event)} placeholder="Feedback" name='text' className="textarea textarea-bordered w-[29rem] h-[8rem]" ></textarea>
            <button className='btn btn-primary my-3'>Send</button>
          </form>
         </div>
           </dialog>
            </div>

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
                <button className="btn btn-sm text-white bg-orange-600" onClick={()=>window.my_modal_3.showModal()}>Send Feedback</button>
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