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

export default function EditProduct({ closeModal, fetchData, product }) {
  const [categoryData, setCategoryData] = useState(null);

  const [isFetchingCategories, setIsFetchingCategories] = useState(true);

  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);

  const updateProduct = async (data) => {
    setIsUpdatingProduct(true);

    try {
      await api.patch(`/products/${product.slug}`, data);

      await fetchData();

      toast.success('Product updated successfully');

      closeModal();
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    } finally {
      setIsUpdatingProduct(false);
    }
  };

  // Define form control and validation using React Hook Form.
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(productSchema),
    values: {
      name: product.name,
      imageUrl: product.imageUrl,
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
      categorySlug: product.category.slug,
      isFeatured: product.isFeatured
    }
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
    <form onSubmit={handleSubmit(updateProduct)}>
      <ModalHeader className='flex flex-col gap-1 text-3xl'>Edit product</ModalHeader>
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
              defaultValue={product.name}
            />
            <Input
              {...register('imageUrl')}
              label='Image URI'
              errorMessage={errors?.imageUrl?.message}
              className='mb-6'
              defaultValue={product.imageUrl}
            />
            <Textarea
              {...register('description')}
              label='Description'
              className='mb-6'
              errorMessage={errors?.description?.message}
              defaultValue={product.description}
            />
            <Input
              {...register('price')}
              type='number'
              label='Price'
              className='mb-6'
              errorMessage={errors?.price?.message}
              defaultValue={product.price}
            />
            <Input
              {...register('stockQuantity')}
              type='number'
              label='Stock Number'
              className='mb-6'
              errorMessage={errors?.stockQuantity?.message}
              defaultValue={product.stockQuantity}
            />
            <Select
              label='Select Category'
              className='mb-6'
              {...register('categorySlug')}
              errorMessage={errors?.categorySlug?.message}
              defaultSelectedKeys={[product.category.slug]}
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
                  defaultSelected={product.isFeatured}
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
        <Button color='primary' type='submit' disabled={isFetchingCategories || isUpdatingProduct}>
          Update product
        </Button>
      </ModalFooter>
    </form>
  );
}
