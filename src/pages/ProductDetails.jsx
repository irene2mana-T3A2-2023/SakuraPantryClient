import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layouts/Base';
import { Image, Button } from '@nextui-org/react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import api from '../configs/api';
import toast from 'react-hot-toast';
import { NewArrivalsContext } from '../components/NewArrivals/NewArrivalsContext';
import ProductCardList from '../components/ProductCardList';

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const { newArrivals } = useContext(NewArrivalsContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/products/${slug}`);
        setProduct(response.data);
      } catch (error) {
        toast.error('Error fetching product details', error);
      }
    };

    fetchProductDetails();
  }, [slug]);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  if (!product) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className='body-font overflow-hidden bg-white'>
        <div className='container px-5 py-6 mx-auto'>
          <div className='lg:w-full flex flex-wrap justify-evenly'>
            <div className='border border-pink-500 flex justify-center items-center'>
              <Image
                alt='product image'
                className='max-h-full max-w-full object-cover rounded '
                src={product.imageUrl}
              />
            </div>
            <div className='lg:w-1/2 w-full lg:pl-10  mt-6 lg:mt-0'>
              <div className='border border-pink-500 p-4'>
                <h1 className='text-gray-900 text-3xl title-font font-medium mb-1 text-center'>
                  {product.name}
                </h1>
                <div className='flex mb-4'></div>
                <p className='leading-relaxed text-justify'>{product.description}</p>
                <p className='font-medium text-xl text-right mt-3  text-gray-900 '>
                  Stock Quantity: {product.stockQuantity}
                </p>
                <p className='title-font font-medium text-2xl text-gray-900 mt-3 text-right'>
                  Price: ${product.price}
                </p>
              </div>
              <div className='flex flex-col mt-6 items-center pb-5 mb-5'>
                <div className='flex items-center mb-5'>
                  <Button
                    isIconOnly
                    color='primary'
                    size='sm'
                    variant='flat'
                    onClick={incrementQuantity}
                  >
                    {<FiPlus className='h-5 w-5 text-black-500 self-center' />}
                  </Button>
                  <p className='mx-2 border px-3 py-1 rounded'>{quantity}</p>
                  <Button
                    isIconOnly
                    color='primary'
                    size='sm'
                    variant='flat'
                    onClick={decrementQuantity}
                  >
                    {<FiMinus className='h-5 w-5 text-black-100 self-center' />}
                  </Button>
                </div>
                <Button className='flex items-center bg-primary text-white border-0 py-2 px-6 focus:outline-none hover:bg-gray-400 rounded'>
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
        <ProductCardList products={newArrivals} title='You may also like' />
      </section>
    </Layout>
  );
}
