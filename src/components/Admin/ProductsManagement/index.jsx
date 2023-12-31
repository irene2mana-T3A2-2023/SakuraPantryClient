import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Tooltip, Image, useDisclosure, Modal, ModalContent, Spinner } from '@nextui-org/react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import api from '../../../configs/api';
import DataTable from '../DataTable';
import { currencyFormatter, formatDateTime, getAxiosErrorMessage } from '../../../utils';
import AddProduct from './AddProductModal';
import EditProduct from './EditProductModal';
import DeleteProduct from './DeleteProductModal';

export default function ProductsMangement() {
  // Define state variables for product data, loading status, modal type, and selected product.
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Disclosure hook from NextUI for controlling modal visibility and behavior.
  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    onClose: () => {
      // Clear selected product when modal closes.
      setSelectedProduct(null);
      // Clear modal type when modal closes.
      setModalType(null);
    }
  });

  // Async function to fetch product data from the API.
  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');

      setData(res.data);
    } catch (err) {
      toast.error(getAxiosErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Function for rendering cells in the data table based on the column key.
  const renderCell = (product, columnKey) => {
    const cellValue = product[columnKey];

    // Opens the edit product modal and sets the selected product.
    const openEditProductModal = () => {
      setModalType('edit-product');

      setSelectedProduct(product);

      onOpen();
    };

    // Opens the delete product modal and sets the selected product.
    const openDeleteProductModal = () => {
      setModalType('delete-product');

      setSelectedProduct(product);

      onOpen();
    };

    // Uses a switch statement to render cell content based on the column key.
    switch (columnKey) {
      case 'name':
        return <span className='text-md font-medium text-primary'>{cellValue}</span>;

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

      case 'isFeatured':
        return (
          <div className='flex justify-center'>
            <span className='text-md text-blue-500 font-semibold'>{cellValue ? 'YES' : 'NO'}</span>
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
            <Tooltip content='Edit product'>
              <span
                className='text-lg text-default-500 cursor-pointer active:opacity-50'
                onClick={openEditProductModal}
              >
                <FiEdit />
              </span>
            </Tooltip>
            <Tooltip color='danger' content='Delete product'>
              <span
                className='text-lg text-danger cursor-pointer active:opacity-50'
                onClick={openDeleteProductModal}
              >
                <FiTrash />
              </span>
            </Tooltip>
          </div>
        );

      default:
        return cellValue;
    }
  };

  // Function to open the modal for adding a new product.
  const openAddProductModal = () => {
    setModalType('add-product');
    onOpen();
  };

  // Function to determine and render the appropriate modal content based on the modal type.
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
          { name: 'FEATURED', uid: 'isFeatured' },
          { name: 'CREATED AT', uid: 'createdAt' },
          { name: 'ACTIONS', uid: 'actions' }
        ]}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl'>
        <ModalContent>{(closeModal) => renderModalContent(closeModal)}</ModalContent>
      </Modal>
    </>
  );
}
