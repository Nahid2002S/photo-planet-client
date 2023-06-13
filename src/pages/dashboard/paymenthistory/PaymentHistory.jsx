import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../authProvider/AuthProvider';
import useTitle from '../../../hooks/useTitle';

const PaymentHistory = () => {
    const {user} = useContext(AuthContext)
    const [paymentClasses, setpaymentClasses] = useState([]);

    useEffect(()=>{
        fetch(`https://assignment-12-server-bice.vercel.app/payments/${user?.email}`)
        .then(res => res.json())
        .then(data => {
            setpaymentClasses(data)
            console.log(data)
        })
    },[])

    useTitle('Payment History')

    return (
        <div className='w-[90%]'>
            <h1 className='text-3xl font-semibold my-4'>Payment History: {paymentClasses.length}</h1>
            <table className="table">
        <thead className='bg-indigo-400 text-white'>
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Class Name</th>
            <th>Price</th>
            <th>Transaction ID</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
         {
            paymentClasses.map((paymentclass, index) =>  <tr key={paymentclass._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask w-[5rem] h-[5rem] rounded-full">
                        <img src={paymentclass.image} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{paymentclass.className}</td>
                <td>{paymentclass.price}</td>
                <td>{paymentclass.transactionId}</td>
                <td>{paymentclass.date}</td>
              </tr>)
         }
        </tbody>
        
      </table>
        </div>
    );
};

export default PaymentHistory;