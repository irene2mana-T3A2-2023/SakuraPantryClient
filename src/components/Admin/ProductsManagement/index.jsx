import { useState, useEffect } from 'react';
import api from '../../../configs/api';
import { getAxiosErrorMessage } from '../../../utils';
import toast from 'react-hot-toast';
import DataTable from '../DataTable';
import { Tooltip, Image, useDisclosure, Modal, ModalContent } from '@nextui-org/react';
import { currencyFormatter } from '../../../utils';
import { FiEdit, FiTrash } from 'react-icons/fi';
import AddProduct from './AddProductModal';
import EditProduct from './EditProductModal';
import DeleteProduct from './DeleteProductModal';

export default function ProductsMangement() {
  const [data, setData] = useState(null);

  const [modalType, setModalType] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    onClose: () => {
      setSelectedProduct(null);

      setModalType(null);
    }
  });

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');

      setData(res.data);
    } catch (err) {
      toast.error(getAxiosErrorMessage(err));
    }
  };

  // eslint-disable-next-line
  console.log(data);

  const renderCell = (product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case 'name':
        return <span className='text-md font-medium text-secondary-500'>{cellValue}</span>;

      case 'imageUrl':
        return (
          <div className='flex items-center'>
            <Image src={cellValue} className='h-[50px] w-auto' />
          </div>
        );

      case 'category':
        return <span className='text-md text-blue-500'>{cellValue.name}</span>;

      case 'description':
        return <span className='text-md text-foreground-500'>{cellValue}</span>;

      case 'price':
        return (
          <span className='text-md text-green-500 font-semibold'>
            {currencyFormatter(cellValue)}
          </span>
        );

      case 'stockQuantity':
        return (
          <div className='flex justify-center'>
            <span className='text-md text-orange-500 font-semibold'>{cellValue}</span>
          </div>
        );

      case 'actions':
        return (
          <div className='relative flex items-center2 gap-3'>
            <Tooltip content='Edit product'>
              <span className='text-lg text-default-500 cursor-pointer active:opacity-50'>
                <FiEdit />
              </span>
            </Tooltip>
            <Tooltip color='danger' content='Delete product'>
              <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                <FiTrash />
              </span>
            </Tooltip>
          </div>
        );

      default:
        return cellValue;
    }
  };

  const openAddProductModal = () => {
    setModalType('add-product');
    onOpen();
  };

  const renderModalContent = (closeModal) => {
    switch (modalType) {
      case 'add-product':
        return <AddProduct closeModal={closeModal} fetchData={fetchProducts} />;

      case 'edit-product':
        return (
          <EditProduct
            closeModal={closeModal}
            product={selectedProduct}
            fetchData={fetchProducts}
          />
        );

      case 'delete-product':
        return (
          <DeleteProduct
            closeModal={closeModal}
            product={selectedProduct}
            fetchData={fetchProducts}
          />
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <>
      <DataTable
        data={data}
        addAction={openAddProductModal}
        addActionLabel='Add new product'
        renderCell={renderCell}
        columns={[
          { name: 'NAME', uid: 'name' },
          { name: 'IMAGE', uid: 'imageUrl' },
          { name: 'CATEGORY', uid: 'category' },
          { name: 'DESCRIPTION', uid: 'description' },
          { name: 'PRICE', uid: 'price' },
          { name: 'QUANTITY IN STOCK', uid: 'stockQuantity' },
          { name: 'ACTIONS', uid: 'actions' }
        ]}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl'>
        <ModalContent>{(closeModal) => renderModalContent(closeModal)}</ModalContent>
      </Modal>
    </>
  );
}
