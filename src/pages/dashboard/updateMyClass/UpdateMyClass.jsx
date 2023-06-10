import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../authProvider/AuthProvider';
import Swal from 'sweetalert2';

const UpdateMyClass = () => {

    const selectedClass = useParams();
    const {user} = useContext(AuthContext)
    const [updateClass, setUpdateClass] = useState([])
  
    useEffect(()=>{
        fetch(`http://localhost:5000/classes/${user?.email}/${selectedClass.id}`)
        .then(res => res.json())
        .then(data=>{
            setUpdateClass(data)
        })
    },[])

    const handleUpdateClass = event =>{

        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const seats = form.seats.value;
        const price = form.price.value;

        const updatedData = {name, seats, price}

       fetch(`http://localhost:5000/classes/${user?.email}/${selectedClass.id}`,{
        method: 'PUT',
        headers: {
           'content-type' : 'application/json'
        },
        body : JSON.stringify(updatedData)
       })
       .then(res => res.json())
       .then(data => {
        if(data.modifiedCount){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Class Successfully Updated',
                showConfirmButton: false,
                timer: 1500
              })
        }
       })
    }

    return (
        <div className='px-12 my-4 bg-gradient-to-r from-indigo-600 to-sky-950 text-white py-12 rounded-md w-2/3'>
        <h1 className='text-4xl font-extrabold text-center mb-6'>Update: {updateClass.className}</h1>
        <form onSubmit={handleUpdateClass}>
            <div>
                <label>
                    Class Name: <br />
                    <input defaultValue={updateClass.className} type="text" name='name' className='w-[100%] text-black px-4 py-2 rounded-md mb-2' required />
                </label> <br />

                <label htmlFor="">
                    Available Seats: <br />
                    <input defaultValue={updateClass.seats} type="text" name='seats' className='w-[100%] text-black px-4 py-2 rounded-md mb-2' required />
                </label> <br />
                <label htmlFor="">
                    Price: <br />
                    <input defaultValue={updateClass.price} type="text" name='price' className='w-[100%] text-black px-4 py-2 rounded-md mb-2' required />
                </label>
            </div>
            <div className='mt-2'>
                <button className='px-4 py-2 bg-indigo-500 w-full rounded-md'>Update</button>
            </div>
        </form>
    </div>
    );
};

export default UpdateMyClass;