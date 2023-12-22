import { useState } from 'react';
import toast from 'react-hot-toast';
import { ModalBody, ModalFooter, Button, ModalHeader, Chip } from '@nextui-org/react';
import { getAxiosErrorMessage } from '../../../utils';
import api from '../../../configs/api';
import { getMessageForNextStatus, getNextStatus } from './util';
import { statusColor } from './config';

export default function UpdateOrderStatusModal({ closeModal, order, fetchData }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateOrderStatus = async (data) => {
    const nextStatus = getNextStatus(order.status);

    if (!nextStatus) {
      return;
    }

    setIsUpdating(true);

    try {
      await api.patch(`/orders/${order._id}/status`, { status: nextStatus });

      toast.success('Order status updated successfully');

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
        <span className='text-xl font-semibold  text-purple-500'>Order #{order?._id}</span>
        <Chip color={statusColor[order.status]} variant='bordered'>
          {order.status}
        </Chip>
      </ModalHeader>
      <ModalBody>
        <span className='text-lg'>{getMessageForNextStatus(order.status)}</span>
      </ModalBody>
      <ModalFooter>
        <Button color='default' variant='bordered' onPress={closeModal}>
          No
        </Button>
        <Button color='primary' type='submit' onClick={updateOrderStatus} disabled={isUpdating}>
          Yes
        </Button>
      </ModalFooter>
    </>
  );
}
