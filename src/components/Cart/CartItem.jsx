import { Button, Image } from '@nextui-org/react';
import { useContext } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { currencyFormatter } from '../../utils';
import { CartContext } from './CartContext';

// CART ITEMS COMPONENTS
export const CartItem = ({ item }) => {
  const { increaseCart, decreaseCart, removeFromCart } = useContext(CartContext);

  return (
    <div className='border rounded p-4 mb-4 mt-5 border-pink-500 text-lg w-full'>
      <div className='flex items-center m-auto flex-col gap-6 lg:flex-row'>
        <div className='flex justify-start items-center w-full'>
          <Image src={item.imageUrl} alt='cart-product-item' className='h-32 w-auto flex-none' />
          <div className='ml-5'>
            <p className='justify-self-start mt-8'>{item.name}</p>
            <div className='text-sm my-1.5'>${item.price}</div>
            <div
              className='hover:underline cursor-pointer text-xs text-danger-500'
              onClick={() => removeFromCart(item)}
            >
              Remove
            </div>
          </div>
        </div>
        <div className='flex justify-end lg:justify-between items-center w-full lg:w-1/3 gap-6'>
          <div className='flex justify-between items-center'>
            <Button
              isIconOnly
              color='primary'
              size='sm'
              variant='flat'
              onClick={() => decreaseCart(item)}
            >
              {<FiMinus className='h-5 w-5 text-black-100 self-center' />}
            </Button>
            <p className='mx-3'>{item.quantity}</p>
            <Button
              isIconOnly
              color='primary'
              size='sm'
              variant='flat'
              onClick={() => increaseCart(item)}
            >
              {<FiPlus className='h-5 w-5 text-black-500 self-center' />}
            </Button>
          </div>
          <p className='mt-3 lg:mt-0'>
            {currencyFormatter((item.price * item.quantity).toFixed(2))}
          </p>
        </div>
      </div>
    </div>
  );
};
