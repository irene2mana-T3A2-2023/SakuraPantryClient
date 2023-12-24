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

// Define the AddCategoryModal component
export default function AddCategoryModal({ closeModal, fetchData }) {
  // Define a state variable to track if a category is being added
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // Define a function to add a new category
  const addNewCategory = async (data) => {
    setIsAddingCategory(true);

    try {
      // Make an API request to create a new category
      await api.post('/categories', data);

      // Display a success toast message
      toast.success('Category added successfully');

      // Fetch updated data and close the modal
      await fetchData();
      closeModal();
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    } finally {
      // Reset the isAddingCategory state to false regardless of success or failure
      setIsAddingCategory(false);
    }
  };

  // Define form control and validation using React Hook Form.
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(categorySchema)
  });

  return (
    // Create a form with a submit handler that calls addNewCategory
    <form onSubmit={handleSubmit(addNewCategory)}>
      <ModalHeader className='flex flex-col gap-1 text-3xl'>Add new category</ModalHeader>
      <ModalBody>
        <Input
          {...register('name')}
          autoFocus
          label='Category Name'
          className='mb-6'
          errorMessage={errors?.name?.message}
        />
      </ModalBody>
      <ModalFooter>
        <Button color='default' variant='bordered' onPress={closeModal}>
          Cancel
        </Button>
        <Button color='primary' type='submit' disabled={isAddingCategory}>
          Add new category
        </Button>
      </ModalFooter>
    </form>
  );
}
