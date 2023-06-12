import React, { useEffect } from 'react';

const useTitle = title => {
    return (
        useEffect(()=>{
            document.title = `Photo Planet | ${title}`
        },[title])
    );
};

export default useTitle;