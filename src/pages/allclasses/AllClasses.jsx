import React, { useEffect, useState } from 'react';

const AllClasses = () => {

    const [allClasses, setAllClasses] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/classes/approve')
        .then(res=> res.json())
        .then(data =>{
            console.log(data)
        })
    },[])

    return (
        <div>
            
        </div>
    );
};

export default AllClasses;