import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../authProvider/AuthProvider';
import Swal from 'sweetalert2';

const SelectedClass = () => {
    const {user} = useContext(AuthContext)
    const [selectedClasses, setSelectedClasses] = useState([])

    useEffect(()=>{
      fetch(`http://localhost:5000/selected/${user?.email}`)
      .then(res => res.json())
      .then(data =>{
        setSelectedClasses(data)
      })
    },[selectedClasses])

    const handleDelete = id =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/selected/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount){
                Swal.fire(
                    'Deleted!',
                    'Your selected class has been deleted.',
                    'success'
                  )
            }
        })
            }
          })
    }

    return (
        <div>
            <div className='mt-16'>
            <h1 className='text-3xl font-semibold my-4'>Selected Classes: {selectedClasses.length}</h1>
            <div className='grid grid-cols-2 mb-4 gap-4'>
            {
              selectedClasses.map(selectedClass => <div key={selectedClasses._id} className='mx-auto'>
                <div className="card w-96 bg-base-100 shadow-xl">
              <figure><img src={selectedClass.image} alt="Shoes" /></figure>
              <div className="card-body">
                <h2 className="card-title">Class Name: {selectedClass.className}</h2>
                <p>Instructor Name: {selectedClass.instructorName}</p>
                <p>Instructor Email: {selectedClass.email}</p>
                <p>Price: {selectedClass.price}</p>
                <p>Available Seats: {selectedClass.seats}</p>
                <div className='flex gap-2'>
                <button className='btn bg-orange-600'>Pay</button>
                <button onClick={()=> handleDelete(selectedClass._id)} className='btn bg-red-600'>Delete</button>
                </div>
                </div>
              </div>
            </div>)
      }
            </div>
        </div>
        </div>
    );
};

export default SelectedClass;