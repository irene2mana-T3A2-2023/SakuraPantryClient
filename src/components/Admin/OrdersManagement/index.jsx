import { useEffect, useState } from 'react';
import {
  Tooltip,
  useDisclosure,
  Modal,
  ModalContent,
  Chip,
  User,
  Spinner
} from '@nextui-org/react';
import { FiEye, FiEdit, FiXCircle } from 'react-icons/fi';
import api from '../../../configs/api';
import DataTable from '../DataTable';
import { currencyFormatter, formatDateTime } from '../../../utils';
import { statusColor } from './config';
import OrderDetail from './OrderDetail';
import UpdateOrderStatus from './UpdateOrderStatusModal';
import CancelOrderModal from './CancelOrderModal';

export default function OrdersManagement() {
  const [loading, setLoading] = useState(false);

  const [modalType, setModalType] = useState(null);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [data, setData] = useState(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    onClose: () => {
      setSelectedOrder(null);

      setModalType(null);
    }
  });

  const fetchData = async () => {
    try {
      const { data } = await api.get('/orders');

      setData(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderCell = (order, columnKey) => {
    const cellValue = order[columnKey];

    const openViewOrderModal = () => {
      setModalType('view-order');

      setSelectedOrder(order);

      onOpen();
    };

    const openUpdateOrderModal = () => {
      setModalType('update-order');

      setSelectedOrder(order);

      onOpen();
    };

    const openCancelOrderModal = () => {
      setModalType('cancel-order');

      setSelectedOrder(order);

      onOpen();
    };

    switch (columnKey) {
      case '_id':
        return (
          <div className='text-md font-medium text-primary'>
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

      case 'createdAt':
        return (
          <div>
            <span className='text-md text-foreground'>{formatDateTime(cellValue)}</span>
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
            {order.status === 'Delivered' || order.status === 'Cancelled' ? null : (
              <>
                <Tooltip content='Update status'>
                  <span
                    className='text-lg text-default-500 cursor-pointer active:opacity-50'
                    onClick={openUpdateOrderModal}
                  >
                    <FiEdit />
                  </span>
                </Tooltip>
                <Tooltip color='danger' content='Cancel product'>
                  <span
                    className='text-lg text-danger cursor-pointer active:opacity-50'
                    onClick={openCancelOrderModal}
                  >
                    <FiXCircle />
                  </span>
                </Tooltip>
              </>
            )}
          </div>
        );

      default:
        return cellValue;
    }
  };

  const renderModalContent = (closeModal) => {
    switch (modalType) {
      case 'view-order':
        return <OrderDetail closeModal={closeModal} order={selectedOrder} />;

      case 'update-order':
        return (
          <UpdateOrderStatus closeModal={closeModal} order={selectedOrder} fetchData={fetchData} />
        );

      case 'cancel-order':
        return (
          <CancelOrderModal closeModal={closeModal} order={selectedOrder} fetchData={fetchData} />
        );

      default:
        return null;
    }
  };

  if (loading || !data) {
    return (
      <div className='container max-w-full flex items-center justify-center min-h-[500px]'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <>
      <DataTable
        data={data}
        renderCell={renderCell}
        columns={[
          { name: 'ID', uid: '_id', sortable: true },
          { name: 'USER', uid: 'user' },
          { name: 'TOTAL PRICE', uid: 'totalPrice' },
          { name: 'PAYMENT METHOD', uid: 'paymentMethod' },
          { name: 'STATUS', uid: 'status' },
          { name: 'CREATED AT', uid: 'createdAt' },
          { name: 'ACTIONS', uid: 'actions' }
        ]}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl'>
        <ModalContent>{(onClose) => renderModalContent(onClose)}</ModalContent>
      </Modal>
    </>
  );
}
