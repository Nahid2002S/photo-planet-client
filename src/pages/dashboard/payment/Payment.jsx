import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import Checkoutform from './Checkoutform';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    return (
        <div className='w-full px-16'>
            <h1 className='text-3xl font-semibold my-4'>PAYMENT:</h1>
            <Elements stripe={stripePromise}>
                <Checkoutform></Checkoutform>
            </Elements>
        </div>
    );
};

export default Payment;