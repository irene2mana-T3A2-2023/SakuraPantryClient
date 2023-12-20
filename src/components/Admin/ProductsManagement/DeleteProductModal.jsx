import api from '../../../configs/api';
import { getAxiosErrorMessage } from '../../../utils';
import toast from 'react-hot-toast';
import { ModalBody, ModalFooter, Button, ModalHeader } from '@nextui-org/react';
import { useState } from 'react';

export default function DeleteProductModal({ closeModal, product, fetchData }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteProduct = async (data) => {
    setIsDeleting(true);

    try {
      await api.delete(`/products/${product.slug}`, data);

      await fetchData();

      toast.success('Product deleted successfully');

      closeModal();
    } catch (error) {
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
