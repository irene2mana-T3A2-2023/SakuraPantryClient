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
  // Define state variables for category data and loading state.
  const [categoryData, setCategoryData] = useState(null);
  const [isFetchingCategories, setIsFetchingCategories] = useState(true);

  // Define state variable for adding product and its function.
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Function to add a new product.
  const addNewProduct = async (data) => {
    setIsAddingProduct(true);

    try {
      // Make an API POST request to add a new product.
      await api.post('/products', data);
      // Fetch updated data and display a success notification.
      await fetchData();
      toast.success('Product added successfully');
      // Close the modal.
      closeModal();
    } catch (error) {
      // Display an error notification in case of an API error.
      toast.error(getAxiosErrorMessage(error));
    } finally {
      setIsAddingProduct(false);
    }
  };

  // Define form control and validation using React Hook Form.
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(productSchema)
  });

  // Use useEffect to fetch categories on component mount.
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
