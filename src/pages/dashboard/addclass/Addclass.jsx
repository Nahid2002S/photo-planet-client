import React, { useContext } from 'react';
import { AuthContext } from '../../../authProvider/AuthProvider';

const Addclass = () => {

    const {user} = useContext(AuthContext);

    return (
        <div className='px-12 my-4 w-full'>
            <h1 className='text-4xl font-extrabold text-center mb-6'>Add A Class</h1>
            <form className='bg-gradient-to-r from-indigo-600 to-sky-950 text-white py-12 rounded-md'>
                <div className='flex justify-center gap-16'>
                <div className='w-[40%]'>
                    <label>
                        Class Name: <br />
                        <input type="text" name='name' className='w-[100%] text-black px-4 py-2 rounded-md mb-2' />
                    </label> <br />
                    <label htmlFor="">
                        Class Image: <br />
                        <input type="file" className="file-input file-input-bordered w-full text-black" />
                    </label> <br />
                    <label htmlFor="">
                        Instructor Name: <br />
                        <input defaultValue={user?.displayName} type="text" name='sellername' className='w-[100%] text-black px-4 py-2 rounded-md mb-2' />
                    </label> <br />
                </div>
                <div className='w-[40%]'>
                <label htmlFor="">
                        Instructor Email: <br />
                        <input defaultValue={user?.email} type="text" name='selleremail' className='w-[100%] text-black px-4 py-2 rounded-md mb-2' />
                    </label> <br />
                    <label htmlFor="">
                        Available Seats: <br />
                        <input type="text" name='seats' className='w-[100%] text-black px-4 py-2 rounded-md mb-2' />
                    </label> <br />
                    <label htmlFor="">
                        Price: <br />
                        <input type="text" name='price' className='w-[100%] text-black px-4 py-2 rounded-md mb-2' />
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