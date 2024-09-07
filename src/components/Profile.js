import React, { useContext } from "react";
import { AuthContext } from "../context/Authprovider";
import {toast} from 'react-toastify';
import { Link, Navigate } from "react-router-dom";

function Profile({ user }) {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logout Successfully..");
        Navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("User object:", user); // Debugging step to check the user object
  const isAdmin = false;
  return (
    <div>
      <div className="drawer drawer-end z-30">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost btn-circle avatar ">
          <div className="w-10 rounded-full">
            {user.photoURL ? (
              <img alt="User Avatar" src={user.photoURL} />
            ) : (
              <img alt="Default Profile" src='./profile.png' />
            )}
          </div>
        </label>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay "></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
         
            <li>
              <a href="/updateprofile">Profile</a>
            </li>
            <li>
              <a href="/order">Orders</a>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <a href="/setting">Settings</a>
            </li>
            <li className="text-red-600">
              <p onClick={handleLogout}>Logout</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
