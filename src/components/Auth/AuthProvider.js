import React, { useState } from 'react';
import api from '../../configs/api';
import AuthContext from './AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getAxiosErrorMessage } from '../../utils';

//Provide authentication-related functionality to its children components.
export default function AuthProvider({ children }) {
  //Create a state variable user with an initial value of null. The setUser function will be used to update the user state.
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAucenticated] = useState(false);
  //Utilize the useNavigate hook to fetch the navigate function.
  const navigate = useNavigate();

  const register = async (userData) => {
    try {
      //Make an HTTP POST request to a registration endpoint ('/auth/register') using an api object.
      await api.post('/auth/register', userData);
      //If the registration is successful, it displays a success message using a toast function.
      toast.success('Account registered successfully');
      //After a successful registration, it navigates the user to the sign-in page.
      navigate('/sign-in');
      //If there is an error during the registration process, catches the error and displays an error message.
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    }
  };
  //Take userData as its argument. It is used for user login.
  const login = async (userData) => {
    try {
      //Make an HTTP POST request to the /auth/login endpoint using the api object, sending the userData to the server for login.
      const response = await api.post('/auth/login', userData);
      //Upon a successful login, it extracts the user and token from the response data.
      const { user, token } = response.data;
      //Set the user state using the setUser function and updates the isAuthenticated state to true if user is truthy
      setUser(user);
      setIsAucenticated(!!user);
      //If a token is present, it stores the authentication token in the browser's local storage.
      if (token) {
        localStorage.getItem('token', token);
      }
      //Navigates the user to Home page.
      navigate('/');
      //If there's an error during the login process, it displays an error message.
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    }
  };
  //Take userData as its argument. It is used for initiating the process of resetting a user's password.
  const forgotPassword = async (userData) => {
    try {
      //Make an asynchronous HTTP POST request to the /auth/forgot-password endpoint.
      await api.post('/auth/forgot-password', userData);
      //If the request is successful, it displays a success message using the toast.success function.
      toast.success('Password reset email sent successfully!');
      //If there's an error during the process, it catches the error and displays an error message.
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    }
  };
  //Take userData as its argument. It is used for resetting a user's password.
  const resetPassword = async (userData) => {
    //Make an asynchronous HTTP POST request to the /auth/reset-password endpoint.
    try {
      await api.post('/auth/reset-password', userData);
      //If the password reset is successful, it displays a success message.
      toast.success('Password reset successfully');
      //Redirect the user to the sign-in page to log in again with the new password.
      navigate('/sign-in');
      //If there's an error during the process, it catches the error and displays an error message.
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    }
  };
  //This object holds the values and functions related to authentication, , allowing child components to access authentication-related data and functions.
  const value = {
    user,
    isAuthenticated,
    register,
    login,
    forgotPassword,
    resetPassword
  };
  //It isresponsible for providing authentication-related data and functions to its descendant components.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
