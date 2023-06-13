import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../assets/cam-1.png'
import img2 from '../assets/cam-2.jpeg'
import img3 from '../assets/cam-3.jpeg'
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
                    <h1 className='absolute lg:top-[35%] lg:right-[15%] top-[25%] right-[15%] lg:text-7xl text-3xl uppercase text-white font-bold'>Photo <span className='text-violet-600'>Planet</span></h1>
                    <p className='absolute lg:block hidden lg:top-[45%] lg:right-[15%] top-[35%] lg:mt-6 right-[15%] text-white font-semibold text-right'>Welcome To Photo Planet. A Complete Mentors Of You Photography Journey. <br /> Enroll Now For Learning With Lots Of Fun.</p>
                    <p className='absolute lg:hidden lg:top-[40%] lg:right-[15%] top-[40%] right-[15%] text-white font-semibold text-right'>Welcome To Photo Planet. A Complete Mentors Of You Photography Journey. </p>
                    <button className='absolute lg:top-[55%] lg:right-[15%] top-[55%] right-[15%] bg-gradient-to-r from-violet-300 to-violet-400 px-4 py-2 rounded-md text-black font-semibold lg:mt-6 mt-4'>View Details</button>
                </div>
                <div className='lg:h-[100vh] text-black'>
                    <img src={img2} />
                    <h1 className='absolute lg:top-[35%] lg:right-[15%] top-[25%] right-[15%] lg:text-7xl text-3xl font-bold uppercase'>Photo <span className='text-violet-600'>Planet</span></h1>
                    <p className='absolute lg:block hidden lg:top-[45%] lg:right-[15%] top-[35%] lg:mt-6 right-[15%] font-semibold text-right'>Welcome To Photo Planet. A Complete Mentors Of You Photography Journey. <br /> Enroll Now For Learning With Lots Of Fun.</p>
                    <p className='absolute lg:hidden lg:top-[40%] lg:right-[15%] top-[40%] right-[15%] font-semibold text-right'>Welcome To Photo Planet. A Complete Mentors Of You Photography Journey. </p>
                    <button className='absolute lg:top-[55%] lg:right-[15%] top-[55%] right-[15%] bg-gradient-to-r from-violet-300 to-violet-400 px-4 py-2 rounded-md text-black font-semibold lg:mt-6 mt-4'>View Details</button>
                </div>
                <div className='lg:h-[100vh]'>
                    <img src={img3} />
                    <h1 className='absolute lg:top-[35%] lg:right-[15%] top-[25%] right-[15%] lg:text-7xl text-3xl text-white font-bold uppercase'>Photo <span className='text-violet-600'>Planet</span></h1>
                    <p className='absolute lg:block hidden lg:top-[45%] lg:right-[15%] top-[35%] lg:mt-6 right-[15%] text-white font-semibold text-right'>Welcome To Photo Planet. A Complete Mentors Of You Photography Journey. <br /> Enroll Now For Learning With Lots Of Fun.</p>
                    <p className='absolute lg:hidden lg:top-[40%] lg:right-[15%] top-[40%] right-[15%] text-white font-semibold text-right'>Welcome To Photo Planet. A Complete Mentors Of You Photography Journey. </p>
                    <button className='absolute lg:top-[55%] lg:right-[15%] top-[55%] right-[15%] bg-gradient-to-r from-violet-300 to-violet-400 px-4 py-2 rounded-md text-black font-semibold lg:mt-6 mt-4'>View Details</button>
                </div>
            </Carousel>
            <StudentCaptured></StudentCaptured>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
        </div>
    );
};

export default Banner;