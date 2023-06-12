import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import Checkoutform from './Checkoutform';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../authProvider/AuthProvider';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const {user} = useContext(AuthContext);
    
    const {id} = useParams();

    const [payClass, setPayClass] = useState(0)

    useEffect(()=>{
        fetch(`https://assignment-12-server-bice.vercel.app/selected/${user?.email}/${id}`)
        .then(res => res.json())
        .then(data => {
            setPayClass(data)
        })
    },[])
  
    return (
        <div className='w-2/3 mx-auto px-16'>
            <h1 className='text-3xl text-center mb-12 font-semibold my-4'>PAYMENT:</h1>
            <h3 className='text-xl font-semibold text-red-600 my-6'>Price: {payClass.price}</h3>
            <Elements stripe={stripePromise}>
                <Checkoutform price={payClass.price} payClass={payClass}></Checkoutform>
            </Elements>
        </div>
    );
};

export default Payment;