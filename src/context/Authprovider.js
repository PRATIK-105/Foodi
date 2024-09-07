import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

import app from '../firebase/firebase.config';
import Spinner from '../components/Spinner';

export const AuthContext = createContext();
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

function Authprovider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create an account
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sign up with Gmail accounts
  const signupWithGmail = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing up with Gmail:', error);
    } finally {
      setLoading(false);
    }
  };

  // Login using email and password
  const login = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) {
      console.error('No user is currently logged in.');
      return;
    }
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
      // Update user state
      setUser({ ...auth.currentUser });
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axios
          .post('http://127.0.0.1:3001/api/v1/users/jwt', userInfo)
          .then(function (response) {
            if (response.data.token) {
              localStorage.setItem('Access-token', response.data.token);
            }
          });
      } else {
        localStorage.removeItem('Access-token');
      }

      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    createUser,
    signupWithGmail,
    login,
    logout,
    updateUserProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        children
      )}{' '}
      {/* Replace with Spinner if available */}
    </AuthContext.Provider>
  );
}

export default Authprovider;
