import { useState } from 'react';
import toast from 'react-hot-toast';
import { ModalBody, ModalFooter, Button, ModalHeader } from '@nextui-org/react';
import { getAxiosErrorMessage } from '../../../utils';
import api from '../../../configs/api';

export default function DeleteCategoryModal({ closeModal, category, fetchData }) {
  // Define a state variable to track if a category is being deleted
  const [isDeletingCategory, setIsDeletingCategory] = useState(false);

  // Define a function to delete the category
  const deleteCategory = async (data) => {
    // Set isDeletingCategory to true to indicate deletion is in progress
    setIsDeletingCategory(true);

    try {
      // Make an API request to delete the category by its slug
      await api.delete(`/categories/${category.slug}`, data);

      // Display a success toast message
      toast.success('Category deleted successfully');

      // Fetch updated data and close the modal
      await fetchData();
      closeModal();
    } catch (error) {
      // Display an error toast message with details from the API response
      toast.error(getAxiosErrorMessage(error));
    } finally {
      // Reset the isDeletingCategory state to false regardless of success or failure
      setIsDeletingCategory(false);
    }
  };
  return (
    <>
      <ModalHeader>Delete Category</ModalHeader>
      <ModalBody>
        <span className='text-lg'>
          If you delete this category, you will not be able to recover it. Are you sure you want to
          delete it?
        </span>
      </ModalBody>
      <ModalFooter>
        <Button color='default' variant='bordered' onPress={closeModal}>
          Cancel
        </Button>
        <Button color='danger' type='submit' onClick={deleteCategory} disabled={isDeletingCategory}>
          Delete Category
        </Button>
      </ModalFooter>
    </>
  );
}
