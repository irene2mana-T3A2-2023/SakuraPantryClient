import { Divider, Image } from '@nextui-org/react';
import { Fragment } from 'react';
import { currencyFormatter } from '../../../utils';

export default function CartItems({ items }) {
  return (
    <div className='grid grid-cols-[100px_1fr_150px_100px] gap-2 w-full items-center'>
      <div className='text-lg font-semibold'></div>
      <div className='text-lg font-semibold'>Name</div>
      <div className='text-lg font-semibold'>Quantity</div>
      <div className='text-lg font-semibold'>Price</div>
      {items.map((item) => (
        <Fragment key={item.product._id}>
          <Image src={item.product?.imageUrl} className='w-[30px] h-auto' />
          <div className='text-lg'>{item.product?.name}</div>
          <div className='text-lg'>{item.quantity}</div>
          <div className='text-lg'>{currencyFormatter(item.product?.price)}</div>
        </Fragment>
      ))}
      <Divider className='col-span-4 my-2' />
      <div className='col-span-3 text-lg font-bold'>Total</div>
      <div className='text-lg font-bold'>
        {currencyFormatter(
          items.reduce((total, item) => total + item.product?.price * item.quantity, 0)
        )}
      </div>
    </div>
  );
}
