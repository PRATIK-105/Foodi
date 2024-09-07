import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/Authprovider';
import { toast } from 'react-toastify';
import axios from 'axios';

function Login() {
  const { register, handleSubmit, reset } = useForm();
  const { signupWithGmail, login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    try {
      // Perform login
      const result = await login(email, password);
      const user = result.user;
      
      // Create user info for backend
      const userInfo = { name: data.name, email: data.email };

      // Make Axios POST request
      await axios.post('http://127.0.0.1:3001/api/v1/login', userInfo);
      toast.success('Login Successful');
      
      // Navigate to intended page
      navigate(from, { replace: true });
      
      // Close modal if necessary
      handleClose();
    } catch (err) {
      console.error('Login failed:', err);
      toast.warning('Error Occurred');
    } finally {
      reset();
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Google sign up/login
      const result = await signupWithGmail();
      const user = result.user;
      
      // Create user info
      const userInfo = { name: user?.displayName, email: user?.email };

      // POST to backend
      await axios.post('http://127.0.0.1:3001/api/v1/users', userInfo);
      toast.success('Account Created Successfully');
      
      // Navigate after successful login
      navigate(from, { replace: true });
      handleClose();
    } catch (err) {
      console.error('Google Login failed:', err);
      toast.warning('Error Occurred');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    document.getElementById('my_modal_5').close();
  };

  return (
    <dialog
      id="my_modal_5"
      className="modal modal-middle sm:modal-middle"
      open={isOpen}
    >
      <div className="modal-box">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h3 className="font-bold text-lg -mt-4 pb-2">Welcome Back!</h3>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>

          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-500">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
              required
              {...register('email')}
            />
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
              required
              {...register('password')}
            />
            <label className="label mt-1">
              <a
                href="#"
                className="label-text-alt text-gray-400 link link-hover"
              >
                Forgot your password?
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn bg-greenish text-white">
              Log In
            </button>
          </div>

          <p className="text-center mt-1">
            Don't have an account?{' '}
            <Link to="/signup" className="underline text-red-500">
              Sign up now
            </Link>
          </p>
        </form>

        {/* Social Login Buttons */}

        <div className="form-control ">
            <button type="submit" className="btn  bg-blue-200 hover:bg-greenish hover:text-white"
            onClick={handleGoogleLogin} >
              <FaGoogle className="scale-125" />
            </button>
          </div>
      </div>
    </dialog>
  );
}

export default Login;
