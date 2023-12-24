import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Tooltip, useDisclosure, Modal, ModalContent, Spinner } from '@nextui-org/react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import api from '../../../configs/api';
import { getAxiosErrorMessage, formatDateTime } from '../../../utils';
import DataTable from '../DataTable';
import AddCategory from './AddCategoryModal';
import EditCategory from './EditCategoryModal';
import DeleteCategory from './DeleteCategoryModal';

export default function CategoriessMangement() {
  // Define state variables using the 'useState' hook.
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Use the 'useDisclosure' hook to manage modal open/close state.
  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    onClose: () => {
      setSelectedCategory(null);

      setModalType(null);
    }
  });

  // Define an asynchronous function 'fetchCategories' to fetch category data.
  const fetchCategories = async () => {
    try {
      // Fetch data from the API
      const res = await api.get('/categories');
      // Update state with fetched data
      setData(res.data);
    } catch (err) {
      toast.error(getAxiosErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Define a function 'renderCell' to render cells in the data table.
  const renderCell = (category, columnKey) => {
    const cellValue = category[columnKey];

    // Function to open the edit category modal when an icon is clicked
    const openEditCategoryModal = () => {
      // Set modal type to 'edit-category'
      setModalType('edit-category');
      // Set the selected category
      setSelectedCategory(category);

      onOpen();
    };

    // Function to open the delete category modal when an icon is clicked
    const openDeleteCategoryModal = () => {
      // Set modal type to 'delete-category'
      setModalType('delete-category');
      // Set the selected category
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

  // Function to open the add category modal
  const openAddCategoryModal = () => {
    setModalType('add-category');
    onOpen();
  };

  // Function to render modal content based on 'modalType'
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

  // Render a loading spinner if data is loading or not available yet.
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
