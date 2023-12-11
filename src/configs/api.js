// Import the axios module for making HTTP requests.
import axios from 'axios';

// Create an Axios instance with custom configuration.
const api = axios.create({
  // Set the base URL for the API requests to the value specified in the environment variables.
  baseURL: process.env.REACT_APP_API_HOST
});

// Add an interceptor to the Axios instance to modify requests before they are sent.
api.interceptors.request.use(
  (config) => {
    // Retrieve the authentication token stored in the local storage.
    const token = localStorage.getItem('token');

    // If a token is present, add it to the Authorization header of the request.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Return the updated configuration for the request.
    return config;
  },
  (error) => {
    // In case of a request configuration error, reject the Promise with the error.
    return Promise.reject(error);
  }
);

// Export the customized Axios instance for use in other parts of the application.
export default api;
