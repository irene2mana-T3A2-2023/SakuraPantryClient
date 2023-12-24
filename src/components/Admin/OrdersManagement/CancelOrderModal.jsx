import { useState } from 'react';
import toast from 'react-hot-toast';
import { ModalBody, ModalFooter, Button, ModalHeader, Chip } from '@nextui-org/react';
import { getAxiosErrorMessage } from '../../../utils';
import api from '../../../configs/api';
import { statusColor } from './config';

export default function CancelOrderModal({ closeModal, order, fetchData }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateOrderStatus = async () => {
    // Check if the order status is 'Cancelled' or 'Deliveried'; if so, return without updating.
    if (order.status === 'Cancelled' || order.status === 'Deliveried') {
      return;
    }

    // Set loading to true
    setIsUpdating(true);

    try {
      // Send a PATCH request to update the order status to 'Cancelled'.
      await api.patch(`/orders/${order._id}/status`, { status: 'Cancelled' });

      // Display a success toast message when the order is successfully cancelled.
      toast.success('Order cancelled successfully');

      // Refetch dashboard data
      await fetchData();

      // Close the modal using the 'closeModal' function passed as a prop.
      closeModal();
    } catch (error) {
      // Display an error toast message with the error details if the update fails.
      toast.error(getAxiosErrorMessage(error));
    } finally {
      // Set loading to false
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
