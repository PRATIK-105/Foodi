import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { MdDashboard, MdDashboardCustomize } from 'react-icons/md';
import {
  FaEdit,
  FaLocationArrow,
  FaPlusCircle,
  FaQuestionCircle,
  FaRegUser,
  FaShoppingBag,
  FaUser,
  FaShoppingCart,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <MdDashboard /> Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaShoppingCart /> Menu
      </Link>
    </li>
    <li>
      <Link to="menu">
        <FaLocationArrow /> Orders Tracking
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaQuestionCircle /> Customer Support
      </Link>
    </li>
  </>
);

function DashboardLayout() {
  const isAdmin = false; // Change this to dynamically check if the user is an admin
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAdmin) {
  //     toast.warning('Login As Admin');
  //     navigate('/');
  //   }
  // }, [isAdmin, navigate]);

  // if (!isAdmin) {
  //   return null; // Prevent rendering anything if the user is not an admin
  // }

  return (
    <div>
      <div className="drawer sm:drawer-open text-blue-950">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <MdDashboardCustomize />
            </label>
            <button className="btn rounded-full px-6 bg-greenish flex items-center gap-2 text-white sm:hidden">
              <FaRegUser /> Logout
            </button>
          </div>
          <div className="mt-5 md:mt-2 mx-4">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to="/dashboard" className="flex justify-start mb-3">
                <img src="./logo.png" alt="" className="w-20" />
                <span className="badge badge-secondary my-2 mx-16">admin</span>
              </Link>
            </li>
            <hr />
            <li className="mt-3">
              <Link to="/dashboard">
                <MdDashboard /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-bookings">
                <FaShoppingBag /> Manage Bookings
              </Link>
            </li>
            <li>
              <Link to="/dashboard/add-menu">
                <FaPlusCircle />
                Add Menu
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-items">
                <FaEdit /> Manage Items
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/dashboard/users">
                <FaUser /> All Users
              </Link>
            </li>
            <hr />
            {/* shared nav links */}
            {sharedLinks}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
