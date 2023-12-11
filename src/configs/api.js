import axios from 'axios';

console.log({ d: process.env.REACT_APP_API_HOST });

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
