import { Button } from '@nextui-org/react';
import React, { useContext } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { CartContext } from './CartContext';

export const CartItem = ({ item }) => {
  const { addToCart, minusFromCart, removeFromCart } = useContext(CartContext);

  return (
    <div className='border rounded p-4 mb-4 mt-5 border-pink-500 text-lg w-full'>
      <div className='flex items-center m-auto'>
        <div className='flex justify-start items-center w-1/2'>
          <img src={item.image} alt='' className='w-32 h-32' />
          <div>
            <p className='justify-self-start mt-8'>{item.name}</p>
            <div className='text-sm my-1.5'>${item.price}</div>
            <div
              className='hover:underline cursor-pointer text-xs text-stone-700'
              onClick={() => removeFromCart(item)}
            >
              Remove
            </div>
          </div>
        </div>
        <div className='flex justify-between items-center w-1/3 ml-auto'>
          <div className='flex justify-between items-center'>
            <Button
              isIconOnly
              color='primary'
              size='sm'
              variant='flat'
              onClick={() => minusFromCart(item)}
            >
              {<FiMinus className='h-5 w-5 text-black-100 self-center' />}
            </Button>
            <p className='mx-3'>{item.quantity}</p>
            <Button
              isIconOnly
              color='primary'
              size='sm'
              variant='flat'
              onClick={() => addToCart(item)}
            >
              {<FiPlus className='h-5 w-5 text-black-500 self-center' />}
            </Button>
          </div>
          <p>${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
