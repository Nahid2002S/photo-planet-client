import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginImage from '../../assets/loginImage.png'
import { AuthContext } from '../../authProvider/AuthProvider';

const Login = () => {
    const {loginUser, googleAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    
    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        loginUser(email, password)
        .then(result =>{
            navigate(from, {replace : true})
        })
        .catch(err =>{
            console.log(err)
        })
    }

    const handleGoogleLogin =() =>{
        googleAuth()
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser.photoURL)
            const saveUser = {name: loggedUser.displayName, email : loggedUser.email}

                        fetch('http://localhost:5000/users',{
                            method: 'POST',
                            headers: {
                                'content-type' : 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                        .then(res => res.json())
                        .then(() => {
                        navigate(from, {replace : true});
                        })
                     })
                        .catch(err =>{
                             console.log(err)
                        })
                      }

    return (
        <div className='px-2 text-black mb-4'>
        <div className='px-8 py-6 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 lg:w-[55%] mx-auto mt-6 rounded-md'>
        <h3 className='text-center text-black text-3xl font-semibold mb-6 '>Please <span className='text-indigo-200'>Login!!!</span></h3>
        <div className='md:flex items-center gap-4'>
            <div className='md:w-[50%]'>
                <img src={loginImage} alt="" />
            </div>
        <div className='md:w-[50%]'>
        <form onSubmit={handleLogin} className='flex flex-col gap-4'>
            <label htmlFor="" className='text-xl font-semibold text-black'>Email: <br />
            <input type="email" name="email" id="email" className='px-4 py-2 rounded-md w-full' required/>
            </label>
            <label htmlFor="" className='text-xl font-semibold text-black'>Password: <br />
            <input type="password" name="password" id="password" className='px-4 py-2 rounded-md w-full' required />
            </label>
            <p className='font-semibold text-red-200'></p>
            <button className="px-6 py-2 text-purple-100 rounded bg-gradient-to-r from-indigo-800 to-black shadow:md">Login</button>
            <hr />
            <Link onClick={handleGoogleLogin} className="btn btn-outline btn-primary">Login With Google</Link>
            <p>New User? Create Account <Link to='/register' className='text-blue-200 underline font-semibold'>Register</Link></p>
        </form>
        </div>
        </div>
    </div>
    </div>
    );
};

export default Login;