import React, { useContext, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import Login from "./Login";
import { AuthContext } from "../context/Authprovider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const [isSticky, setSticky] = useState(false);

  const { user } = useAuth(); // Use useContext to consume the AuthContext

  const [cart, refetch] = useCart();
  console.log(cart); // Debug log to check the cart state

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("Cart state updated:", cart); // Debug log to check cart updates
  }, [cart]);

  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/menu">Menu</a>
      </li>
      <li>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li>
              <a href="#online-order">Online Order</a>
            </li>
            <li>
              <a href="#table-booking">Table Booking</a>
            </li>
            <li>
              <a href="#order-tracking">Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a href="#offers">Offers</a>
      </li>
    </>
  );

  return (
    <header className="max-w-screen-2xl container bg-[#FCFCFC] fixed mx-auto top-0 left-0 right-0 font-semibold BG z-50">
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? "shadow-md transition-all duration-300 ease-in-out"
            : "bg-white"
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <a href="/">
            <img src="/logo.png" alt="Logo" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end flex-wrap">
          {/* searchbtn */}
          <button className="btn btn-ghost btn-circle hidden lg:flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* add to cart */}
          <Link to="cart">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle mr-4 lg:flex items-center hidden"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cart.length}
                </span>
              </div>
            </div>
          </Link>

          {/* contact */}
          {user ? (
            <Profile user={user} />
          ) : (
            <button
              href="#login"
              className="btn rounded-full bg-greenish px-7 gap-3 flex items-center text-white"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              <FaRegUser />
              Login
            </button>
          )}
          <Login />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
