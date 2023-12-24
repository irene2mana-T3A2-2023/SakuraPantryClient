import Joi from 'joi';
import { useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import toast from 'react-hot-toast';
import { ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { getAxiosErrorMessage } from '../../../utils';
import api from '../../../configs/api';

// Define a schema for category validation using Joi
const categorySchema = Joi.object({
  name: Joi.string().required()
});

export default function EditCategoryModal({ closeModal, fetchData, category }) {
  // Define a state variable to track if a category is being edited
  const [isEditingCategory, setIsEditingCategory] = useState(false);

  // Define a function to edit the category
  const editCategory = async (data) => {
    // Set isEditingCategory to true to indicate editing is in progress
    setIsEditingCategory(true);

    try {
      // Make an API request to update the category by its slug
      await api.patch(`/categories/${category.slug}`, data);

      // Display a success toast message
      toast.success('Category updated successfully');

      // Fetch updated data and close the modal
      await fetchData();
      closeModal();
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    } finally {
      // Reset the isEditingCategory state to false regardless of success or failure
      setIsEditingCategory(false);
    }
  };

  // Define form control and validation using React Hook Form.
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(categorySchema),
    values: {
      name: category.name
    }
  });

  return (
    // Create a form with a submit handler that calls editCategory
    <form onSubmit={handleSubmit(editCategory)}>
      <ModalHeader className='flex flex-col gap-1 text-3xl'>Edit category</ModalHeader>
      <ModalBody>
        <Input
          {...register('name')}
          autoFocus
          label='Category Name'
          className='mb-6'
          errorMessage={errors?.name?.message}
          defaultValue={category.name}
        />
      </ModalBody>
      <ModalFooter>
        <Button color='default' variant='bordered' onPress={closeModal}>
          Cancel
        </Button>
        <Button color='primary' type='submit' disabled={isEditingCategory}>
          Update category
        </Button>
      </ModalFooter>
    </form>
  );
}
