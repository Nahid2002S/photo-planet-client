import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../authProvider/AuthProvider';

const Header = () => {

  const {user, logOut} = useContext(AuthContext);
  const handleLogOut = () =>{
     logOut();
  }

    return (
        <div className="navbar bg-opacity-30 bg-black fixed z-10 top-0 text-white">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content text-pink-500 font-bold mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <li><NavLink to='/' className={({ isActive }) => (isActive ? 'font-extrabold text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-violet-200 to-fuchsia-300' : '')}>Home</NavLink></li>
      <li><NavLink to='/instructors' className={({ isActive }) => (isActive ? 'font-extrabold text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-violet-200 to-fuchsia-300' : '')}>Instructors</NavLink></li>
      <li><NavLink to='' className={({ isActive }) => (isActive ? 'font-extrabold text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-violet-200 to-fuchsia-300' : '')}>Classes</NavLink></li>
      {
        !user ? '' : <li><NavLink to='/dashboard' className={({ isActive }) => (isActive ? 'font-extrabold text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-violet-200 to-fuchsia-300' : '')}>Dashboard</NavLink></li>
      }
      {
        !user ? <li><Link to='register'>Register</Link></li> : ""
      }
      </ul>
    </div>
    <a className="btn btn-ghost normal-case text-xl">Photo Galaxy</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <li><NavLink to='/' className={({ isActive }) => (isActive ? 'font-extrabold text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-violet-200 to-fuchsia-300' : '')}>Home</NavLink></li>
      <li><NavLink to='/instructors' className={({ isActive }) => (isActive ? 'font-extrabold text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-violet-200 to-fuchsia-300' : '')}>Instructors</NavLink></li>
      <li><NavLink to='/classes' className={({ isActive }) => (isActive ? 'font-extrabold text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-violet-200 to-fuchsia-300' : '')}>Classes</NavLink></li>
      {
        !user ? '' : <li><NavLink to='/dashboard' className={({ isActive }) => (isActive ? 'font-extrabold text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-violet-200 to-fuchsia-300' : '')}>Dashboard</NavLink></li>
      }
      {
        !user ? <li><Link to='register'>Register</Link></li> : ""
      }
    </ul>
  </div>
  <div className="navbar-end">
  {
    user ? <label tabIndex={0} className="btn btn-ghost btn-circle avatar mr-2 tooltip tooltip-info tooltip-bottom" data-tip={user?.displayName}>
    <div className="w-10 rounded-full">
      <img src={user?.photoURL} />
    </div>
  </label> : ""
  }
  {user ? <div>
    <button onClick={handleLogOut}  className='bg-gradient-to-r from-violet-200 to-fuchsia-300 px-4 py-2 rounded-md text-black font-semibold'>Logout</button>
  </div> : <div>
    <Link to='/login'><button className='bg-gradient-to-r from-violet-200 to-fuchsia-300 px-4 py-2 rounded-md text-black font-semibold'>Login</button></Link>
  </div>}
</div>
</div>
    );
};

export default Header;