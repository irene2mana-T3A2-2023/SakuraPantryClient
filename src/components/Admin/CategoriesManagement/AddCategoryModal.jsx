import Joi from 'joi';
import { useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import toast from 'react-hot-toast';
import { ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { getAxiosErrorMessage } from '../../../utils';
import api from '../../../configs/api';

const categorySchema = Joi.object({
  name: Joi.string().required()
});

export default function AddCategoryModal({ closeModal, fetchData }) {
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const addNewCategory = async (data) => {
    setIsAddingCategory(true);

    try {
      await api.post('/categories', data);

      toast.success('Category added successfully');

      await fetchData();

      closeModal();
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    } finally {
      setIsAddingCategory(false);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(categorySchema)
  });

  return (
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
