import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../authProvider/AuthProvider';

const Checkoutform = ({price}) => {

    const stripe = useStripe();
    const elements = useElements();
    const [errors, setErrors] = useState('');

    const {user} = useContext(AuthContext)

    const [axiosSecure] = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');

    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, axiosSecure])

    const handleSubmit = async(event)=>{
        event.preventDefault();

        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement);
        if(card === null){
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });

          setErrors('')
      
          if (error) {
            setErrors(error.message);
          } else {
            // console.log('[PaymentMethod]', paymentMethod);
            setErrors('')
          }

          setProcessing(true)

          const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }

        setProcessing(false)
        if(paymentIntent.status === 'succeeded'){
            setTransactionId(paymentIntent.id)
        }

    }

    return (
        <>
         <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" className='btn bg-orange-600 btn-sm my-4' disabled={!stripe || !clientSecret || processing}>
        Pay
      </button>
    </form>
    {errors && <p className='text-red-600'>{errors}</p>}
    {transactionId && <p className='text-green-600'>Transaction Success With Transaction Id : {transactionId}</p>}
        </>
    );
};

export default Checkoutform;