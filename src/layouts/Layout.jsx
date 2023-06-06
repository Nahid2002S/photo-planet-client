import React from 'react';
import Header from '../shared/header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/footer/Footer';
import Banner from '../banner/Banner';

const Layout = () => {
    return (
        <>
          <Header></Header>
          <Outlet></Outlet>
          <Footer></Footer>
        </>
    );
};

export default Layout;