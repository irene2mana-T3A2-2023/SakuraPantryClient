import toast from 'react-hot-toast';
import { ModalBody, ModalFooter, Button, ModalHeader } from '@nextui-org/react';
import { useState } from 'react';
import { getAxiosErrorMessage } from '../../../utils';
import api from '../../../configs/api';

export default function DeleteProductModal({ closeModal, product, fetchData }) {
  // Define state variable for tracking the delete operation.
  const [isDeleting, setIsDeleting] = useState(false);

  // Function to delete the product.
  const deleteProduct = async () => {
    setIsDeleting(true);

    try {
      // Make an API DELETE request to delete the product.
      await api.delete(`/products/${product.slug}`);
      // Fetch updated data and display a success notification.
      await fetchData();

      toast.success('Product deleted successfully');

      closeModal();
    } catch (error) {
      // Display an error notification in case of an API error.
      toast.error(getAxiosErrorMessage(error));
    }
  };

  return (
    <>
      <ModalHeader>Delete product</ModalHeader>
      <ModalBody>
        <span className='text-lg'>
          If you delete this product, you will not be able to recover it. Are you sure you want to
          delete it?
        </span>
      </ModalBody>
      <ModalFooter>
        <Button color='default' variant='bordered' onPress={closeModal}>
          Cancel
        </Button>
        <Button color='danger' type='submit' onPress={deleteProduct} disabled={isDeleting}>
          Delete product
        </Button>
      </ModalFooter>
    </>
  );
}
