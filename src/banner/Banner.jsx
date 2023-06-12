import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../assets/cam-1.png'
import img2 from '../assets/cam-2.png'
import img3 from '../assets/cam-3.png'
import PopularClasses from '../popularClass/PopularClass';
import PopularInstructors from '../popularInstructors/PopularInstructors';
import StudentCaptured from '../studentCaptured/StudentCaptured';
import useTitle from '../hooks/useTitle';

const Banner = () => {

    useTitle('Home')

    return (
        <div className='dark:bg-zinc-800'>
            <Carousel className='text-center'>
                <div className='lg:h-[100vh]'>
                    <img src={img1} />
                    <h1 className='absolute lg:top-[30%] lg:right-[15%] top-[20%] right-[15%] lg:text-5xl text-3xl text-white font-bold'>Photo Planet</h1>
                    <p className='absolute lg:block hidden lg:top-[40%] lg:right-[15%] top-[35%] right-[15%] text-white font-semibold text-right'>Welcome To Photo Planet. A Complete Mentors Of You Photography Journey. <br /> Enroll Now For Learning With Lots Of Fun.</p>
                    <p className='absolute lg:hidden lg:top-[40%] lg:right-[15%] top-[35%] right-[15%] text-white font-semibold text-right'>Welcome To Photo Planet. A Complete Mentors Of You Photography Journey. </p>
                    <button className='absolute lg:top-[50%] lg:right-[15%] top-[55%] right-[15%] bg-gradient-to-r from-violet-300 to-violet-400 px-4 py-2 rounded-md text-black font-semibold'>View Details</button>
                </div>
                <div className='lg:h-[100vh]'>
                    <img src={img2} />
                </div>
                <div className='lg:h-[100vh]'>
                    <img src={img3} />
                </div>
            </Carousel>
            <StudentCaptured></StudentCaptured>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
        </div>
    );
};

export default Banner;