import { NavLink, Outlet } from "react-router-dom";
import { FaUsers, FaSwatchbook, FaHome } from 'react-icons/fa';
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";

const DashboardLayout = () => {

    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    return (
        <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    <Outlet></Outlet>
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
                      {
                        isAdmin ? <>
                            <li><NavLink to="/dashboard/manageclasses"><FaSwatchbook></FaSwatchbook> Manage Classes</NavLink></li>
                            <li><NavLink to="/dashboard/manageusers"> <FaUsers></FaUsers> Manage Users</NavLink></li> 
                        </> : <></>
                       }  
                      {
                        isInstructor ? <>
                            <li><NavLink to="/dashboard/addclass"><FaSwatchbook></FaSwatchbook>Add A Class</NavLink></li>
                            <li><NavLink to="/dashboard/myclasses"> <FaUsers></FaUsers>My Classes</NavLink></li> 
                        </> : <></>
                       } 
                        
                      {
                        !isInstructor && !isAdmin ? <>
                            <li><NavLink to="/dashboard/home"><FaSwatchbook></FaSwatchbook>My Selected Classes</NavLink></li>
                            <li><NavLink to="/dashboard/manageusers"> <FaUsers></FaUsers>My Enrolled Classes</NavLink></li> 
                            <li><NavLink to="/dashboard/manageusers"> <FaUsers></FaUsers>Payment</NavLink></li> 
                        </> : <></>
                       } 

     <div className="divider"></div>
                    <li><NavLink to="/"><FaHome></FaHome> Home</NavLink> </li>
                    <li><NavLink to="/menu"> Our Menu</NavLink></li>
                    <li><NavLink to="/order/salad">Order Food</NavLink></li>
                </ul>
  
  </div>
</div>
    );
};

export default DashboardLayout;