import { ModalHeader, ModalBody, ModalFooter, Button, Chip } from '@nextui-org/react';
import { statusColor } from './config';
import CartItems from './CartItems';

export default function OrderDetail({ closeModal, order }) {
  return (
    <>
      <ModalHeader className='flex gap-1 justify-between py-10'>
        <span className='text-2xl font-semibold'>Order #{order.id}</span>
        <Chip color={statusColor[order.status]} variant='bordered'>
          {order.status}
        </Chip>
      </ModalHeader>
      <ModalBody>
        <div className='container flex flex-row text-xl max-w-full'>
          <div className='flex flex-col gap-4 w-full'>
            <h4 className='font-semibold text-2xl'>Order items</h4>
            <CartItems items={order.orderItems} />
            <h4 className='font-semibold text-2xl mt-6'>User Info</h4>
            <div className='flex flex-col gap-2'>
              <div className='flex'>
                <span className='text-lg font-semibold mr-3'>Full Name:</span>
                <span className='text-lg'>
                  {order.user.firstName} {order.user.lastName}
                </span>
              </div>
              <div className='flex'>
                <span className='text-lg font-semibold mr-3'>Email:</span>
                <span className='text-lg'>{order.user.email}</span>
              </div>
            </div>
            <h4 className='font-semibold text-2xl mt-6'>Shipping Info</h4>
            <div className='flex flex-col gap-2'>
              <div className='flex'>
                <span className='text-lg font-semibold mr-3'>Address:</span>
                <span className='text-lg'>{order.shippingAddress.address}</span>
              </div>
              <div className='flex'>
                <span className='text-lg font-semibold mr-3'>City:</span>
                <span className='text-lg'>{order.shippingAddress.city}</span>
              </div>
              <div className='flex'>
                <span className='text-lg font-semibold mr-3'>Suburb:</span>
                <span className='text-lg'>{order.shippingAddress.city}</span>
              </div>
              <div className='flex'>
                <span className='text-lg font-semibold mr-3'>Postcode:</span>
                <span className='text-lg'>{order.shippingAddress.postcode}</span>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onPress={closeModal}>
          Close
        </Button>
      </ModalFooter>
    </>
  );
}
