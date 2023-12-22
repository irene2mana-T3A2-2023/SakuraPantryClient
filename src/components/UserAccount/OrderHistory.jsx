import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Divider
} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import api from '../../configs/api';

// ORDER HISTORY COMPONENT
export const OrderHistory = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Fetch all orders of current user
  useEffect(() => {
    const fetchMyOrders = async () => {
      setIsLoading(true);

      try {
        const orders = await api.get('/orders/myorders');
        setOrders(orders.data);
      } catch (error) {
        toast.error('Error fetching my orders', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  // Function to conver date created
  const convertDate = (isoDate) => {
    const date = new Date(isoDate);

    const dd = date.getDate();
    const MM = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    return `${dd}/${MM}/${yyyy}`;
  };

  // JSX structure for the Order history component
  return (
    <div>
      <Table aria-label='Order Table' className='mt-10'>
        <TableHeader>
          <TableColumn>ORDER NO.</TableColumn>
          <TableColumn>ORDER DATE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>TOTAL</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item._id}</TableCell>
              <TableCell>{convertDate(item.createdAt)}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>${item.totalPrice.toFixed(2)}</TableCell>
              <TableCell>
                <Link
                  onClick={() => {
                    setCurrentOrder(item);
                    onOpen();
                  }}
                  className='underline hover:text-pink-500'
                >
                  View details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Order Items</ModalHeader>
              <ModalBody>
                <div>
                  {currentOrder?.orderItems.map((item) => (
                    <div key={item._id} className='flex flex-row items-center p-3'>
                      <div className='border-1.5 border-solid rounded p-2 border-pink-500'>
                        <img src={item?.product?.imageUrl} alt='' className='w-20 h-20' />
                      </div>
                      <div className='justify-self-start ml-3'>
                        <p>{item?.product?.name}</p>
                      </div>
                      <div className='w-1/6 ml-auto text-pink-500'>
                        <p>${(item?.product?.price).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Shipping and Order Total sections */}
                <div className='mb-6'>
                  <div className='flex items-center justify-center'>
                    {/* Divider line */}
                    <Divider style={{ width: '95%' }} className='bg-gray-900 h-px' />
                  </div>
                  {/* Shipping cost */}
                  <div className='flex flex-row ml-5 mt-3 font-semibold'>
                    <p className='justify-start'>Shipping</p>
                    <p className='justify-end ml-auto pr-5'>$0.00 AUD</p>
                  </div>
                  {/* Order Total */}
                  <div className='flex flex-row ml-5 mt-3 font-semibold'>
                    <p className='justify-start'>Order Total</p>
                    <p className='justify-end ml-auto pr-5'>
                      ${(currentOrder?.totalPrice).toFixed(2)} AUD
                    </p>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
