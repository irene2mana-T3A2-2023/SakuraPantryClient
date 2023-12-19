import Joi from 'joi';
import api from '../../../configs/api';
import { useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { getAxiosErrorMessage } from '../../../utils';
import toast from 'react-hot-toast';
import { ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

const categorySchema = Joi.object({
  name: Joi.string().required()
});

export default function EditCategoryModal({ closeModal, fetchData, category }) {
  const [isEditingCategory, setIsEditingCategory] = useState(false);

  const editCategory = async (data) => {
    setIsEditingCategory(true);

    try {
      await api.patch(`/categories/${category.slug}`, data);

      toast.success('Category updated successfully');

      await fetchData();

      closeModal();
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    } finally {
      setIsEditingCategory(false);
    }
  };

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
    <form onSubmit={handleSubmit(editCategory)}>
      <ModalHeader className='flex flex-col gap-1 text-3xl'>Edit new category</ModalHeader>
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
