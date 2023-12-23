import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../configs/api';
import { getAxiosErrorMessage } from '../../utils';
import AuthContext from './AuthContext';

//Provide authentication-related functionality to its children components.
export default function AuthProvider({ children }) {
  // Initialize state 'isInitialising' as true with its setter 'setIsInitialising' using useState hook.
  const [isInitialising, setIsInitialising] = useState(true);

  //Create a state variable user with an initial value of null. The setUser function will be used to update the user state.
  const [user, setUser] = useState(null);

  // Create a state variable 'isAuthenticated' with an initial value of false. The 'setIsAuthenticated' function will be used to update this state.
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Utilize the useNavigate hook to fetch the navigate function.
  const navigate = useNavigate();

  // Use the 'useSearchParams' hook to access the URL's query parameters.
  const [searchParams] = useSearchParams();

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
      // In case of an error, display an error message using a toast notification.
      // 'getAxiosErrorMessage' extracts a user-friendly message from the error object.
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

      // Update the 'isAuthenticated' state to true if the 'user' is truthy.
      setIsAuthenticated(!!user);

      //If a token is present, it stores the authentication token in the browser's local storage.
      if (token) {
        localStorage.setItem('token', token);
      }

      // Regex to validate a 'from' URL pattern
      const validFromPattern = /^\/[\w-]+(\/[\w-]+)*\/?$/;

      // Decode 'from' parameter value from URL search parameters
      const from = searchParams.get('from');

      // Determine redirection path; default to '/' if 'from' is invalid
      const redirectTo = validFromPattern.test(from) ? from : '/';

      // Redirect user to the determined path
      navigate(redirectTo);
    } catch (error) {
      // In case of an error, display an error message using a toast notification.
      // 'getAxiosErrorMessage' extracts a user-friendly message from the error object.
      toast.error(getAxiosErrorMessage(error));
    }
  };

  // Define a function named 'logout'
  const logout = () => {
    // Remove the 'token' item from the browser's local storage
    localStorage.removeItem('token');

    // Set the current user state to 'null', effectively logging the user out
    setUser(null);

    // Update the 'isAuthenticated' state to 'false', indicating the user is no longer authenticated
    setIsAuthenticated(false);

    // Use the 'navigate' function to redirect the user to the homepage
    navigate('/');
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
      // In case of an error, display an error message using a toast notification.
      // 'getAxiosErrorMessage' extracts a user-friendly message from the error object.
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
      // In case of an error, display an error message using a toast notification.
      // 'getAxiosErrorMessage' extracts a user-friendly message from the error object.
      toast.error(getAxiosErrorMessage(error));
    }
  };

  // Define an asynchronous function named 'currentUser'
  const currentUser = async () => {
    try {
      // Attempt to get the current user's data from the '/auth/current-user' endpoint
      const response = await api.get('/auth/current-user');

      // If successful, update the user state with the received data
      setUser(response.data);

      // Set the 'isAuthenticated' state to 'true' as the user is authenticated
      setIsAuthenticated(true);
    } catch {
      // Set the user state to 'null' indicating no user is logged in or authenticated
      setUser(null);

      // Set the 'isAuthenticated' state to 'false' as the user is not authenticated
      setIsAuthenticated(false);

      // Remove the 'token' from local storage, as the authentication has failed
      localStorage.removeItem('token');
    }
  };

  // Function to check current password before allowing user to change password
  const verifyCurrentPassword = async (currentPassword) => {
    try {
      const res = await api.post('/auth/verify-current-password', {
        currentPassword: currentPassword
      });

      if (res.data.isValid) {
        return true; // Password is valid
      } else {
        return false; // Password is invalid
      }
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
      return false; // Password verification failed
    }
  };

  // Function to allow current authenticated change their password
  const changePassword = async (userData) => {
    try {
      await api.post('/auth/change-password', userData);
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    }
  };

  // Use the 'useEffect' hook to perform side effects in the component
  useEffect(() => {
    // Defines an asynchronous 'initialise' function that attempts to authenticate the user.
    const initialise = async () => {
      // Retrieve the 'token' from local storage
      const token = localStorage.getItem('token');

      // Check if the token exists
      if (token) {
        // If the token is found, call the 'currentUser' function to authenticate the user
        await currentUser();
      }
    };

    // After running 'initialise', 'isInitialising' state is set to false using 'setIsInitialising', indicating completion of the initialization process.
    initialise().finally(() => {
      setIsInitialising(false);
    });
  }, []); // The empty dependency array means this effect runs once after the component mounts

  // The conditional rendering at the end returns 'null' while 'isInitialising' is true, possibly to wait for authentication before rendering the component.
  if (isInitialising) {
    return null;
  }

  //This object holds the values and functions related to authentication, allowing child components to access authentication-related data and functions.
  const value = {
    user,
    isAuthenticated,
    verifyCurrentPassword,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    changePassword
  };

  //It is responsible for providing authentication-related data and functions to its descendant components.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
