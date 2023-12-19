import { useState, useEffect } from 'react';
import api from '../../../configs/api';
import { getAxiosErrorMessage } from '../../../utils';
import toast from 'react-hot-toast';
import DataTable from '../DataTable';
import { Tooltip, useDisclosure, Modal, ModalContent } from '@nextui-org/react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import AddCategory from './AddCategoryModal';
import EditCategory from './EditCategoryModal';
import DeleteCategory from './DeleteCategoryModal';

export default function CategoriessMangement() {
  const [data, setData] = useState(null);

  const [modalType, setModalType] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    onClose: () => {
      setSelectedCategory(null);

      setModalType(null);
    }
  });

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');

      setData(res.data);
    } catch (err) {
      toast.error(getAxiosErrorMessage(err));
    }
  };

  const renderCell = (category, columnKey) => {
    const cellValue = category[columnKey];

    const openEditCategoryModal = () => {
      setModalType('edit-category');

      setSelectedCategory(category);

      onOpen();
    };

    const openDeleteCategoryModal = () => {
      setModalType('delete-category');

      setSelectedCategory(category);

      onOpen();
    };

    switch (columnKey) {
      case 'name':
        return <span className='text-md font-medium text-secondary-500'>{cellValue}</span>;

      case 'actions':
        return (
          <div className='relative flex items-center2 gap-3'>
            <Tooltip content='Edit product'>
              <span
                className='text-lg text-default-500 cursor-pointer active:opacity-50'
                onClick={openEditCategoryModal}
              >
                <FiEdit />
              </span>
            </Tooltip>
            <Tooltip color='danger' content='Delete product'>
              <span
                className='text-lg text-danger cursor-pointer active:opacity-50'
                onClick={openDeleteCategoryModal}
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

  const openAddCategoryModal = () => {
    setModalType('add-category');
    onOpen();
  };

  const renderModalContent = (closeModal) => {
    switch (modalType) {
      case 'add-category':
        return <AddCategory closeModal={closeModal} fetchData={fetchCategories} />;

      case 'edit-category':
        return (
          <EditCategory
            closeModal={closeModal}
            category={selectedCategory}
            fetchData={fetchCategories}
          />
        );

      case 'delete-category':
        return (
          <DeleteCategory
            closeModal={closeModal}
            category={selectedCategory}
            fetchData={fetchCategories}
          />
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <>
      <DataTable
        data={data}
        addAction={openAddCategoryModal}
        addActionLabel='Add new product'
        renderCell={renderCell}
        columns={[
          { name: 'NAME', uid: 'name' },
          { name: 'ACTIONS', uid: 'actions' }
        ]}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl'>
        <ModalContent>{(closeModal) => renderModalContent(closeModal)}</ModalContent>
      </Modal>
    </>
  );
}
