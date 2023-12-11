import React, { useState } from 'react';
import api from '../../configs/api';
import AuthContext from './AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getAxiosErrorMessage } from '../../utils';

const AuthProvider = ({ children }) => {
  const [user] = useState(null);

  const [isAuthenticated] = useState(false);

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

  const value = {
    user,
    isAuthenticated,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
