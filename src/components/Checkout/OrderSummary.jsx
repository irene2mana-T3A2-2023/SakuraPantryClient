import React from 'react';

// Order summary component in Checkout Page
export const OrderSummary = ({ item }) => {
  return (
    <div className='ml-2 p-1 w-full'>
      <div className='flex items-center'>
        <div className='flex justify-start items-center'>
          <img
            src={item.imageUrl}
            alt=''
            className='w-14 h-14 border border-solid rounded p-0.5 bg-stone-200'
          />
          <div>
            <p className='justify-self-start ml-3'>
              {item.name} x {item.quantity}
            </p>
          </div>
        </div>
        <div className='flex justify-between items-center w-1/5 ml-auto'>
          <p>${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
