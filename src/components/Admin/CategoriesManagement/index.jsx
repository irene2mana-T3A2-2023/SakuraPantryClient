import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Tooltip, useDisclosure, Modal, ModalContent } from '@nextui-org/react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import api from '../../../configs/api';
import { getAxiosErrorMessage, formatDateTime } from '../../../utils';
import DataTable from '../DataTable';
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
        return <span className='text-md font-medium text-primary'>{cellValue}</span>;

      case 'createdAt':
        return (
          <div>
            <span className='text-md text-foreground'>{formatDateTime(cellValue)}</span>
          </div>
        );

      case 'actions':
        return (
          <div className='relative flex items-center2 gap-3'>
            <Tooltip content='Edit category'>
              <span
                className='text-lg text-default-500 cursor-pointer active:opacity-50'
                onClick={openEditCategoryModal}
              >
                <FiEdit />
              </span>
            </Tooltip>
            <Tooltip color='danger' content='Delete category'>
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
        addActionLabel='Add new category'
        renderCell={renderCell}
        columns={[
          { name: 'NAME', uid: 'name' },
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
