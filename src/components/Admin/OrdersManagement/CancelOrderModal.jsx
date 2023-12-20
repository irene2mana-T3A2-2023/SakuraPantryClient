import api from '../../../configs/api';
import { useState } from 'react';
import { getAxiosErrorMessage } from '../../../utils';
import toast from 'react-hot-toast';
import { ModalBody, ModalFooter, Button, ModalHeader, Chip } from '@nextui-org/react';
import { statusColor } from './config';

export default function CancelOrderModal({ closeModal, order, fetchData }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateOrderStatus = async (data) => {
    if (order.status === 'Cancelled' || order.status === 'Deliveried') {
      return;
    }

    setIsUpdating(true);

    try {
      await api.patch(`/orders/${order._id}/status`, { status: 'Cancelled' });

      toast.success('Order cancelled successfully');

      await fetchData();

      closeModal();
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <>
      <ModalHeader className='flex gap-1 justify-between py-10'>
        <span className='text-xl font-semibold text-purple-500'>Order #{order?._id}</span>
        <Chip color={statusColor[order.status]} variant='bordered'>
          {order.status}
        </Chip>
      </ModalHeader>
      <ModalBody>
        <span className='text-lg'>
          If you cancel this order, you will not be able to recover it. Are you sure you want to
          cancel it?
        </span>
      </ModalBody>
      <ModalFooter>
        <Button color='default' variant='bordered' onPress={closeModal}>
          Decline
        </Button>
        <Button color='danger' type='submit' onClick={updateOrderStatus} disabled={isUpdating}>
          Cancel Order
        </Button>
      </ModalFooter>
    </>
  );
}
