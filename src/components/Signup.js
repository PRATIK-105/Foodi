import React, { useContext } from 'react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/Authprovider';
import { toast } from 'react-toastify';
import axios from 'axios';
import useAxiosPublic from '../hooks/useAxiosPublic';

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signupWithGmail, createUser, updateUserProfile } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const handleGoogleLogin = () => {
    signupWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user?.displayName || '',
          email: user?.email || '',
        };
        return axiosPublic.post('/users', userInfo);
      })
      .then((response) => {
        toast.success('Account Created Successfully');
        navigate('/');
      })
      .catch((error) => {
        console.error('Google sign-in failed:', error.message);
        toast.warning('Google sign-in failed.');
      });
  };

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        return updateUserProfile(data.name, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          return axiosPublic.post('/users', userInfo);
        });
      })
      .then(() => {
        toast.success('Account Created Successfully');
        navigate('/');
      })
      .catch((error) => {
        console.log(error.code, error.message);
        toast.warning('Error Occurred.');
      });
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle" open>
      <div className="modal-box">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg -mt-4 pb-2">Create an Account</h3>
            <Link
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              to="/"
            >
              ✕
            </Link>
          </div>
          {/* Name Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered"
              {...register('name')}
            />
          </div>
          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Enter a valid email address',
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          {/* Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn bg-greenish text-white hover:bg-red-500 hover:scale-105 active:bg-red-700 active:scale-95 transition duration-300 ease-in-out transform"
            >
              Sign Up
            </button>
          </div>
          <p className="text-center mt-1">
            Already have an account?{' '}
            <Link to="/" className="underline text-red-500">
              Log in
            </Link>
          </p>
        </form>

        {/* Social Login Buttons */}

        <div className="form-control ">
          <button
            type="submit"
            className="btn  bg-blue-200 hover:bg-greenish hover:text-white"
            onClick={handleGoogleLogin}
          >
            <FaGoogle className="scale-125" />
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default Signup;
