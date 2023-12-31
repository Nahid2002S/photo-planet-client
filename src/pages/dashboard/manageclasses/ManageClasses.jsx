import React, { useEffect, useState } from 'react';
import useTitle from '../../../hooks/useTitle';
import Swal from 'sweetalert2';

const ManageClasses = () => {

    const [allClasses, setAllClasses] = useState([])

    const [feedback, setFeedback] = useState('');
    const [newId, setNewId] = useState('');

    useEffect(()=>{
        fetch('https://assignment-12-server-bice.vercel.app/classes')
        .then(res => res.json())
        .then(data=>{
            setAllClasses(data)
        })
    },[allClasses])

    const handleApproved = id =>{
        fetch(`https://assignment-12-server-bice.vercel.app/classes/approve/${id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {

        })
    }

    const handleDeny = id =>{
        fetch(`https://assignment-12-server-bice.vercel.app/classes/deny/${id}`, {
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

    const handleId = (id) =>{
        setNewId(id)
    }

    const handleSend = () =>{
        fetch(`https://assignment-12-server-bice.vercel.app/classes/feedback/${newId}`,{
            method : 'PUT',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify({feedback : feedback})
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            if(data.modifiedCount){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Feedback Send Successful',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        }) 
    }

    useTitle('Manage Classes')


    return (
        <div>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal">
          <div className="modal-box bg-gradient-to-r from-violet-500 to-purple-700 text-white">
            <h3 className="font-bold text-lg mb-4">Send Feedback!</h3>
            <textarea onChange={(event)=> handleFeedback(event)} placeholder="Write Feedback" className="textarea textarea-bordered w-[29rem] h-[6rem] text-black" ></textarea>
            <button onClick={handleSend} className='my-2 btn bg-gradient-to-r from-violet-300 to-violet-400 px-4 py-2 rounded-md text-black font-semibold'>Send</button>
           <div className="modal-action">
          <label htmlFor="my_modal_6" className="btn">Close!</label>
       </div>
      </div>
    </div>

            <h1 className='text-3xl font-semibold my-4'>Manage Classes: {allClasses.length}</h1>
            <div className='grid grid-cols-2 gap-4'>
            {
              allClasses.map(singleclass => <div key={singleclass._id}>
                <div className="card w-96 bg-base-100 shadow-xl">
              <figure><img className='h-64' src={singleclass.image} alt="Shoes" /></figure>
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
                <label onClick={()=> handleId(singleclass._id)} className="btn btn-sm text-white bg-orange-600" htmlFor="my_modal_6">Send Feedback</label>
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