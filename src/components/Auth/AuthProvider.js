import React, { useState } from 'react';
import api from '../../configs/api';
import AuthContext from './AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getAxiosErrorMessage } from '../../utils';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAucenticated] = useState(false);

  const navigate = useNavigate();

  const register = async (userData) => {
    try {
      await api.post('/auth/register', userData);

      toast.success('Account registered successfully');

      navigate('/sign-in');
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    }
  };

  const login = async (userData) => {
    try {
      const response = await api.post('/auth/login', userData);
      const { user, token } = response.data;
      setUser(user);
      setIsAucenticated(!!user);
      if (token) {
        localStorage.getItem('token', token);
      }
      navigate('/');
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    }
  };

  const value = {
    user,
    isAuthenticated,
    register,
    login
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
