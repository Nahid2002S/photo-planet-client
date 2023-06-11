import React, { useContext } from 'react';
import { AuthContext } from '../../../authProvider/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;
const Addclass = () => {
    const [axiosSecure] = useAxiosSecure();

    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${ img_hosting_token}`

    const {user} = useContext(AuthContext);

    const handleAddClass = event =>{
        event.preventDefault();
        const form = event.target;
        const className = form.name.value;
        const imageFile = form.image.files[0];
        const instructorName = form.instructorname.value;
        const email = form.email.value;
        const seats = form.seats.value;
        const price = form.price.value;

        const formData = new FormData();
        formData.append('image', imageFile);

        fetch(image_hosting_url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data =>{
            if(data.success){
                const imageUrl = data.data.display_url;
                const newClass = {className, instructorName, email, seats, price : parseFloat(price), image : imageUrl, status : 'pending', student : 0}
                axiosSecure.post('/classes', newClass)
                .then(data=>{
                    if(data.data.insertedId){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Class Added Successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
            }
        })
    }

    return (
        <div className='px-12 my-4 w-full'>
            <h1 className='text-4xl font-extrabold text-center mb-6'>Add A Class</h1>
            <form onSubmit={handleAddClass} className='bg-gradient-to-r from-indigo-600 to-sky-950 text-white py-12 rounded-md'>
                <div className='flex justify-center gap-16'>
                <div className='w-[40%]'>
                    <label>
                        Class Name: <br />
                        <input type="text" name='name' className='w-[100%] text-black px-4 py-2 rounded-md mb-2' required />
                    </label> <br />
                    <label htmlFor="">
                        Class Image: <br />
                        <input type="file" name='image' className="file-input file-input-bordered w-full text-black" required />
                    </label> <br />
                    <label htmlFor="">
                        Instructor Name: <br />
                        <input defaultValue={user?.displayName} readOnly type="text" name='instructorname' className='w-[100%] text-black px-4 py-2 rounded-md mb-2' />
                    </label> <br />
                </div>
                <div className='w-[40%]'>
                <label htmlFor="">
                        Instructor Email: <br />
                        <input defaultValue={user?.email} readOnly type="text" name='email' className='w-[100%] text-black px-4 py-2 rounded-md mb-2' />
                    </label> <br />
                    <label htmlFor="">
                        Available Seats: <br />
                        <input type="text" name='seats' className='w-[100%] text-black px-4 py-2 rounded-md mb-2' required />
                    </label> <br />
                    <label htmlFor="">
                        Price: <br />
                        <input type="text" name='price' className='w-[100%] text-black px-4 py-2 rounded-md mb-2' required />
                    </label>
                </div>
                </div>
                <div className='px-16 mt-2'>
                    <button className='px-4 py-2 bg-indigo-500 w-full rounded-md'>Add Class</button>
                </div>
            </form>
        </div>
    );
};

export default Addclass;