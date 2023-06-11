import React, { useState } from 'react';
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { AuthContext } from "../../authProvider/AuthProvider";
import { FaEye, FaEyeSlash  } from 'react-icons/fa';

import loginImage from '../../assets/loginImage.png'

const Register = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { registerUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [passerror, setPasserror] = useState(false);
    const [seePass, setSeePass] = useState(false);
    const [seeConfirmPass, setSeeConfirmPass] = useState(false);

    const handleSeePass = () =>{
        setSeePass(!seePass)
    }
    const handleSeeConfirmPass = () =>{
        setSeeConfirmPass(!seeConfirmPass)
    }

    const onSubmit = data => {
        const {password, newpassword} = data;

        if(password !== newpassword){
            return setPasserror(true);
        }
        else{
            setPasserror(false)
        }
        registerUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUser(data.name, data.photo)
                    .then(() => {
                        const saveUser = {name: data.name, email : data.email, photo: data.photo}

                        fetch('http://localhost:5000/users',{
                            method: 'POST',
                            headers: {
                                'content-type' : 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                        .then(res => res.json())
                        .then(data => {
                            if(data.insertedId){
                               
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'User created successfully.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/');
                            }
                        })

                    })
                    .catch(error => console.log(error))
            })
    };

    return (
        <div className='px-2 text-black mb-4'>
        <div className='px-8 py-6 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 lg:w-[60%] mx-auto mt-6 rounded-md shadow-xl'>
        <h3 className='text-center text-3xl font-semibold mb-6'>Please <span className='text-green-700'>Register!!!</span></h3>
        <div className='md:flex items-center gap-4'>
        <div className='lg:w-[70%]'>
            <img src={loginImage} alt="" />
        </div>
        <div className='lg:w-[50%]'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <label htmlFor="" className='text-xl font-semibold'>Name: <br />
            <input type="text" {...register("name", { required: true })} name="name" id="name" className='px-4 py-2 rounded-md w-full border-0 outline-none' placeholder='Your Name' required/>
            {errors.name && <span className="text-red-600">Name is required</span>}
            </label>
            <label htmlFor="" className='text-xl font-semibold'>Email: <br />
            <input type="email"  {...register("email", { required: true })} name="email" id="email" className='px-4 py-2 rounded-md w-full border-0 outline-none' placeholder='Your Email' required/>
            {errors.email && <span className="text-red-600">Email is required</span>}
            </label>
            <label htmlFor="" className='text-xl font-semibold'>Password: <br />
               <div className='flex items-center w-full bg-white rounded-md'>
               <div><input className='px-4 py-2 rounded-md w-full border-0 outline-none' type={seePass ? 'text' : 'password'}  {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                                })} placeholder="password" />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase and one special character.</p>}</div>
                                <div className='-ml-2'>{ seePass ? <FaEyeSlash onClick={handleSeePass} className='cursor-pointer'></FaEyeSlash> : <FaEye onClick={handleSeePass} className='cursor-pointer'></FaEye>}</div>
               </div>
            </label>
            <label htmlFor="" className='text-xl font-semibold'>Confirm Password: <br />
            <div className='flex items-center w-full bg-white rounded-md'>
            <div>
            <input type={seeConfirmPass ? 'text' : 'password'} {...register("newpassword", { required: true })} name="newpassword" id="newpassword" className='px-4 py-2 rounded-md w-full border-0 outline-none' placeholder='Confirm Password' required/>
            </div>
            <div className='-ml-2'>
            { seeConfirmPass ? <FaEyeSlash className='cursor-pointer' onClick={handleSeeConfirmPass}></FaEyeSlash> : <FaEye className='cursor-pointer' onClick={handleSeeConfirmPass}></FaEye>}
            </div>
            </div>
            </label>
            <label htmlFor="" className='text-xl font-semibold'>Photo URL: <br />
            <input type="url" {...register("photo", { required: true })} name="photo" id="photo" className='px-4 py-2 rounded-md w-full border-0 outline-none' placeholder='Photo URL' required/>
            {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
            </label>
            {passerror ? <p className='text-red-500 font-semibold'>Password Not Matched</p> : ''}
            <button className="px-6 py-2 text-purple-100 rounded bg-gradient-to-r from-green-600 to-green-900 shadow:md">Register </button>
            <p>Already have an account? <Link to='/login' className='text-blue-200 underline font-semibold'>Login</Link></p>
        </form>
        </div>
        </div>
    </div>
    </div>
    );
};

export default Register;