import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../authProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTitle from '../../hooks/useTitle';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';

const AllClasses = () => {

    const [approvedClasses, setApprovedClasses] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch('https://assignment-12-server-bice.vercel.app/classes/approve')
        .then(res=> res.json())
        .then(data =>{
            setApprovedClasses(data)
        })
    },[])

    const {user} = useContext(AuthContext)

    const [currentUser, setCurrentUser] = useState([]);

    useEffect(()=>{
      fetch(`https://assignment-12-server-bice.vercel.app/approvedclass/${user?.email}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setCurrentUser(data)
      })
    },[user])

    const handleSelected = classes =>{

      if(!user){
        Swal.fire({
          title: 'Please Login First',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Login'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login')
          }
        })
        return
      }

      const {_id, className, email, image, instructorName, price, seats, student} = classes;

      fetch('https://assignment-12-server-bice.vercel.app/selected', {
        method: 'POST',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify({className, email, image, instructorName, price, seats, selectedBy : user?.email, classId : _id, student})
      })
      .then(res => res.json())
      .then(data =>{
        if(data.insertedId){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Class Successfully Selected',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }

    console.log(currentUser.role)

    useTitle('Classes')

    return (
        <div className='mt-16'>
            <h1 className='text-3xl font-semibold my-4'>All Classes: {approvedClasses.length}</h1>
            <div className='grid grid-cols-3 mb-4'>
            {
              approvedClasses.map(approvedclass => <div key={approvedclass._id} className='mx-auto mb-3'>
                <div className={`card w-96 ${approvedclass.seats == 0 ? 'bg-red-400' : 'bg-violet-200'} shadow-xl`}>
              <figure><img className='h-72' src={approvedclass.image} alt="Shoes" /></figure>
              <div className="card-body">
                <h2 className="card-title">Class Name: {approvedclass.className}</h2>
                <p>Instructor Name: {approvedclass.instructorName}</p>
                <p>Instructor Email: {approvedclass.email}</p>
                <p>Price: {approvedclass.price}</p>
                <p>Available Seats: {approvedclass.seats}</p>
                <button onClick={()=> handleSelected(approvedclass)} disabled={currentUser?.role === 'admin' || currentUser?.role === 'instructor' || approvedclass.seats == 0} className="bg-gradient-to-r from-violet-300 to-violet-400 px-4 py-2 rounded-md text-black font-semibold">Select</button>
                </div>
              </div>
            </div>)
      }
            </div>
        </div>
    );
};

export default AllClasses;