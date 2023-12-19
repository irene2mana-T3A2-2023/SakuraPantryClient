import { useCallback, useEffect, useState } from 'react';
import { Tooltip, useDisclosure, Modal, ModalContent, Chip, User } from '@nextui-org/react';
import api from '../../../configs/api';
import DataTable from '../DataTable';
import { currencyFormatter } from '../../../utils';
import { FiEye, FiEdit } from 'react-icons/fi';
import { statusColor } from './config';
import OrderDetail from './OrderDetail';

export default function OrdersManagement() {
  const [loading, setLoading] = useState(false);

  const [modalType, setmodalType] = useState(null);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [data, setData] = useState(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    onClose: () => {
      setSelectedOrder(null);

      setmodalType(null);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const { data } = await api.get('/orders');

        setData(data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderCell = useCallback(
    (order, columnKey) => {
      const cellValue = order[columnKey];

      const openViewOrderModal = () => {
        setmodalType('view-order');

        setSelectedOrder(order);

        onOpen();
      };

      switch (columnKey) {
        case 'id':
          return (
            <div className='flex items-center text-secondary-500'>
              <span className='text-md font-semibold'>{cellValue}</span>
            </div>
          );

        case 'user':
          return (
            <div>
              <User
                name={`${cellValue.firstName} ${cellValue.lastName}`}
                description={cellValue.email}
              />
            </div>
          );

        case 'totalPrice':
          return (
            <div>
              <span className='text-md text-blue-500'>{currencyFormatter(cellValue)}</span>
            </div>
          );

        case 'status':
          return (
            <div>
              <Chip color={statusColor[cellValue]} variant='bordered'>
                {cellValue}
              </Chip>
            </div>
          );

        case 'actions':
          return (
            <div className='relative flex items-center2 gap-3'>
              <Tooltip content='Details'>
                <span
                  className='text-lg text-default-500 cursor-pointer active:opacity-50'
                  onClick={openViewOrderModal}
                >
                  <FiEye />
                </span>
              </Tooltip>
              <Tooltip content='Update status'>
                <span className='text-lg text-default-500 cursor-pointer active:opacity-50'>
                  <FiEdit />
                </span>
              </Tooltip>
            </div>
          );

        default:
          return cellValue;
      }
    },
    [onOpen]
  );

  const renderModalContent = useCallback(
    (closeModal) => {
      switch (modalType) {
        case 'view-order':
          return <OrderDetail closeModal={closeModal} order={selectedOrder} />;

        default:
          return null;
      }
    },
    [modalType, selectedOrder]
  );

  if (!data) {
    return null;
  }

  return (
    <>
      <DataTable
        data={data}
        renderCell={renderCell}
        loading={loading}
        columns={[
          { name: 'ID', uid: '_id', sortable: true },
          { name: 'USER', uid: 'user' },
          { name: 'TOTAL PRICE', uid: 'totalPrice' },
          { name: 'PAYMENT METHOD', uid: 'paymentMethod' },
          { name: 'STATUS', uid: 'status' },
          { name: 'ACTIONS', uid: 'actions' }
        ]}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl'>
        <ModalContent>{(onClose) => renderModalContent(onClose)}</ModalContent>
      </Modal>
    </>
  );
}
