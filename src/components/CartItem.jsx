import React from 'react';

export const CartItem = ({ item }) => {
  return (
    <div className='border p-4 mb-4 mt-8 border-gray-400'>
      <p>{item.name}</p>
      <p>Price:${item.price}</p>
      <p>Quantity:${item.quantity}</p>
    </div>
  );
};
