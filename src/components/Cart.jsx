/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { CartItem } from '../components/CartItem';

export const Cart = ({ cartItems }) => {
  return (
    <div>
      <p class="text-2xl">My Cart</p>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};
