import React from 'react';
import { NewArrivalsProvider } from './contexts/NewArrivalsContext';
import HomePage from './HomePage';
import ProductDetailsPage from '../../pages/ProductDetails';

const useNewArrivals = () => {
  return (
    <NewArrivalsProvider>
      <HomePage />
      <ProductDetailsPage />
    </NewArrivalsProvider>
  );
};

export default useNewArrivals;
