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
    // Get the next status based on the current status
    const nextStatus = getNextStatus(order.status);

    // If there's no next status, return without updating.
    if (!nextStatus) {
      return;
    }

    setIsUpdating(true);

    try {
      // Send a PATCH request to update the order status to the next status.
      await api.patch(`/orders/${order._id}/status`, { status: nextStatus });

      // Display a success toast message when the order status is updated successfully.
      toast.success('Order status updated successfully');

      // Fetch updated data (e.g., orders) by calling the 'fetchData' function passed as a prop.
      await fetchData();

      // Close the modal using the 'closeModal' function passed as a prop.
      closeModal();
    } catch (error) {
      // Display an error toast message with the error details if the update fails.
      toast.error(getAxiosErrorMessage(error));
    } finally {
      setIsUpdating(false); // Set 'isUpdating' back to false, indicating that the update process has finished.
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
