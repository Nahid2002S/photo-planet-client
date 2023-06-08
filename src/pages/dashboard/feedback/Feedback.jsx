import React from 'react';

const handleFeedback = event =>{
    event.preventDefault();
    const form = event.target;
    const feedback = form.feedback.value;
    console.log(feedback)
}

const Feedback = () => {
    return (
        <div className='bg-indigo-500 p-6 rounded-md'>
            <h1 className='text-3xl font-semibold my-4'>Feedback:</h1>
            <form onSubmit={handleFeedback}>
            <textarea placeholder="Feedback" name='feedback' className="textarea textarea-bordered w-[30rem] h-[10rem] bg-indigo-50 my-2" ></textarea> <br />
            <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    );
};

export default Feedback;