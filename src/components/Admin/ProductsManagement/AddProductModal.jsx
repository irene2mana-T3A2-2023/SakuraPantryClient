import Joi from 'joi';
import toast from 'react-hot-toast';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  Select,
  Input,
  Textarea,
  SelectItem,
  Checkbox
} from '@nextui-org/react';
import { getAxiosErrorMessage } from '../../../utils';
import api from '../../../configs/api';

const productSchema = Joi.object({
  name: Joi.string().required(),
  imageUrl: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  stockQuantity: Joi.number().required(),
  categorySlug: Joi.string().required(),
  isFeatured: Joi.boolean()
});

export default function AddProduct({ closeModal, fetchData }) {
  const [categoryData, setCategoryData] = useState(null);

  const [isFetchingCategories, setIsFetchingCategories] = useState(true);

  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const addNewProduct = async (data) => {
    setIsAddingProduct(true);

    try {
      await api.post('/products', data);

      await fetchData();

      toast.success('Product added successfully');

      closeModal();
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    } finally {
      setIsAddingProduct(false);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(productSchema)
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setIsFetchingCategories(true);

      try {
        const res = await api.get('/categories');

        setCategoryData(res.data);
      } catch (error) {
        toast.error(getAxiosErrorMessage(error));
      } finally {
        setIsFetchingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <form onSubmit={handleSubmit(addNewProduct)}>
      <ModalHeader className='flex flex-col gap-1 text-3xl'>Add new product</ModalHeader>
      <ModalBody>
        {isFetchingCategories ? (
          <Spinner />
        ) : (
          <>
            <Input
              {...register('name')}
              autoFocus
              label='Product Name'
              className='mb-6'
              errorMessage={errors?.name?.message}
            />
            <Input
              {...register('imageUrl')}
              label='Image URI'
              errorMessage={errors?.imageUrl?.message}
              className='mb-6'
            />
            <Textarea
              {...register('description')}
              label='Description'
              className='mb-6'
              errorMessage={errors?.description?.message}
            />
            <Input
              {...register('price')}
              type='number'
              label='Price'
              className='mb-6'
              errorMessage={errors?.price?.message}
            />
            <Input
              {...register('stockQuantity')}
              type='number'
              label='Stock Number'
              className='mb-6'
              errorMessage={errors?.stockQuantity?.message}
            />
            <Select
              label='Select Category'
              className='mb-6'
              {...register('categorySlug')}
              errorMessage={errors?.categorySlug?.message}
            >
              {(categoryData ?? []).map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </Select>
            <Controller
              control={control}
              name='isFeatured'
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  onChange={(e) => onChange?.(e.target.checked)}
                  className='mb-2 lg:mb-0'
                  value={value}
                >
                  Is featured product?
                </Checkbox>
              )}
            />
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color='default' variant='bordered' onPress={closeModal}>
          Cancel
        </Button>
        <Button color='primary' type='submit' disabled={isFetchingCategories || isAddingProduct}>
          Add new product
        </Button>
      </ModalFooter>
    </form>
  );
}
