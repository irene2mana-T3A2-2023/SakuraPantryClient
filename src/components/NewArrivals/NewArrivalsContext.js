import React, { createContext, useState, useEffect } from 'react';
import api from '../../configs/api';
import toast from 'react-hot-toast';

export const NewArrivalsContext = createContext({ newArrivals: [] });

export const NewArrivalsProvider = ({ children }) => {
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await api.get('/products/new-arrivals');
        setNewArrivals(response.data);
      } catch (error) {
        toast.error('Error fetching new arrivals', error);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <NewArrivalsContext.Provider value={{ newArrivals }}>{children}</NewArrivalsContext.Provider>
  );
};
