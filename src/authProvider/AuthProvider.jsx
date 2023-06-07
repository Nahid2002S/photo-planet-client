import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import axios from 'axios';

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

    const googleProvider = new GoogleAuthProvider();
    const googleAuth = () =>{
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (loginUser)=>{
            setUser(loginUser);

            if(loginUser){
                axios.post('http://localhost:5000/jwt', {
                    email : loginUser.email
                })
                .then(data =>{
                    console.log(data.data.token)
                })
            }

            setLoading(false)
        });

        return ()=>{
            return unsubscribe()
          }
    },[])

    const updateUser = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    const logOut = () =>{
        return signOut(auth);
    }

    const authInfo = {
        registerUser,
        loginUser,
        updateUser,
        googleAuth,
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