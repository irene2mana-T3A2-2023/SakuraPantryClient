import { Button } from '@nextui-org/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import orderSuccessIcon from '../../assets/images/order-success-icon.png';

export const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className='md:flex flex-col items-center justify-center md:h-screen'>
      <img src={orderSuccessIcon} alt='' className='w-28 h-28' />
      <h2 className='text-3xl text-gray-500 mb-6 mt-2'>Thank you for your purchase!</h2>
      <p>
        View your order history{' '}
        <Link to='/user-account' className='text-pink-500 underline'>
          here
        </Link>{' '}
        for more details and tracking information.
      </p>
      <Button
        size='lg'
        className='md:w-1/4 mt-5 font-semibold'
        color='primary'
        variant='ghost'
        onClick={(e) => navigate('/')}
      >
        Continue Shopping
      </Button>
    </div>
  );
};
