import React, { useState } from 'react';
import api from '../../configs/api';
import AuthContext from './AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getAxiosErrorMessage } from '../../utils';

export default function AuthProvider({ children }) {
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

  const forgotPassword = async (userData) => {
    try {
      await api.post('/auth/forgot-password', userData);

      toast.success('Password reset email sent successfully!');
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    }
  };

  const resetPassword = async (userData) => {
    try {
      await api.post('/auth/reset-password', userData);

      toast.success('Password reset successfully');

      navigate('/sign-in');
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    }
  };

  const value = {
    user,
    isAuthenticated,
    register,
    forgotPassword,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
