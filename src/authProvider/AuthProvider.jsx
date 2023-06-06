import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext(null);
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) =>{
       setLoading(true)
       return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (loginUser)=>{
            setUser(loginUser)
            setLoading(false)
        });

        return ()=>{
            return unsubscribe()
          }
    },[])

    const updateUser = (user, name, photoUrl) =>{
        updateProfile(user, {
            displayName : name,
            photoURL : photoUrl
        })
        .then(() => {
            setLoading(true)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    const logOut = () =>{
        return signOut(auth);
    }

    const authInfo = {
        registerUser,
        loginUser,
        updateUser,
        logOut,
        user,
        loading
    }

    return (
        <AuthContext.Provider value={authInfo}>
           {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;