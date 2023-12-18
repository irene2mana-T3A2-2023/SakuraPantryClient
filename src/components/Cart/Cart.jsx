/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { CartItem } from './CartItem';
import { Button, Divider } from '@nextui-org/react';
import { CartContext } from './CartContext';
import { PiShoppingCartDuotone } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

// fetch product info (image, price, name) from DB

export const Cart = () => {
  const { cartItems, getCartTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div>
      {/* If there are items in cart, render the items. Else, render a notice of empty cart */}
      {cartItems.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-screen'>
          <PiShoppingCartDuotone className='w-20 h-20' />
          <p className='text-2xl text-gray-500 mb-6 mt-2'>Your cart is empty!</p>
          <Button size='lg' color='primary' variant='solid' onClick={(e) => navigate('/')}>
            Shop our products
          </Button>
        </div>
      ) : (
        <div>
          <h1 className='text-3xl'>SHOPPING CART</h1>
          <div className='grid grid-cols-2 grid-flow-row w-full mt-8 mb-8 gap-x-5 md:grid-flow-col'>
            <div className='col-span-3 row-span-2'>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className='border rounded p-4 mb-4 mt-5 border-pink-500 text-lg w-full col-span-3 row-span-1 md:col-span-1'>
              <div className='flex justify-between items-center mb-5'>
                <h2 className='text-xl font-semibold'>Total</h2>
                <p className='text-xl font-semibold'>${getCartTotalPrice()} AUD</p>
              </div>
              <Divider />
              <p className='text-sm text-stone-700 my-3'>
                Tax included. Free shipping applied to all orders.
              </p>
              <div className='flex items-start flex-col'>
                <Button
                  className='w-full mb-3'
                  color='primary'
                  onClick={(e) => navigate('/checkout')}
                >
                  Checkout
                </Button>
                <Button
                  className='w-full mb-3'
                  color='primary'
                  variant='ghost'
                  onClick={(e) => navigate('/')}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
