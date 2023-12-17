import React from 'react';
import { CartItem } from '../components/CartItem';
import { Button, Divider } from '@nextui-org/react';

export const Cart = ({ cartItems }) => {
  return (
    <div>
      <h1 className='text-3xl'>My Cart</h1>
      <div className='grid grid-cols-2 grid-flow-row w-full gap-x-5 md:grid-flow-col'>
        <div className='col-span-3 row-span-2'>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className='border rounded p-4 mb-4 mt-5 border-pink-500 text-lg w-full col-span-3 row-span-1 md:col-span-1'>
          <div className='flex justify-between items-center mb-5'>
            <h2 className='text-xl font-semibold'>Total</h2>
            <p className='text-xl font-semibold'>$100 AUD</p>
          </div>
          <Divider />
          <p className='text-sm text-stone-700 my-3'>
            Tax included. Shipping calculated at checkout
          </p>
          <div className='flex items-start flex-col'>
            <Button className='w-full mb-3' color='primary'>
              Checkout
            </Button>
            <Button className='w-full mb-3' color='primary' variant='ghost'>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
