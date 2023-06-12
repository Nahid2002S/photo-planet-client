import React from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';

const ErrorPage = () => {

    useTitle('Not Found')

    return (
        <div>
            <div className='flex justify-center items-center h-[100vh]'>
        <div id="error-page">
            <div>
                <img src='https://img.freepik.com/free-vector/404-error-with-people-holding-numbers-concept-illustration_114360-7983.jpg?w=740&t=st=1686395489~exp=1686396089~hmac=4d251c1662a85ae696110b36e1a65cff5e990d8ca8962b00502f7950b894cea7' className='w-96 lg:w-[100vh] lg:-mt-16'></img>
            </div>
      <Link to="/">
      <button className="cursor-pointer px-4 py-2 rounded-md text-white font-semibold bg-gradient-to-r from-pink-500 to-indigo-600 border-0 flex justify-center mx-auto">Back To Homepage</button>
      </Link>
       </div>
    </div>
        </div>
    );
};

export default ErrorPage;