/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layouts/Base';
import { Image, Button, Select, SelectItem } from '@nextui-org/react';
import api from '../configs/api';
import toast from 'react-hot-toast';
import ProductCardList from '../components/ProductCardList';
import { CartContext } from '../components/Cart/CartContext';

const ERROR_MSG = 'Quantity limit exceeded!';

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState('');

  const { setCartItems } = useContext(CartContext);

  const addToCart = () => {
    let isItemExist = false;
    let newCartItems = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [];
    newCartItems.map((item) => {
      if (item?._id === product?._id) {
        isItemExist = true;
        if (item?.stockQuantity >= parseInt(quantity) + parseInt(item?.quantity)) {
          item.quantity += parseInt(quantity);
          setError('');
        } else {
          setError(ERROR_MSG);
        }
      }
      return item;
    });
    if (!isItemExist) {
      newCartItems.push({ ...product, quantity: parseInt(quantity) });
    }
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/products/${slug}`);
        setProduct(response.data);
        const categorySlug = response.data.category.slug;
        fetchRelatedProducts(categorySlug);
      } catch (error) {
        toast.error('Error fetching product details', error);
      }
    };

    fetchProductDetails();
  }, [slug]);

  const fetchRelatedProducts = async (categorySlug) => {
    try {
      const response = await api.get(`/products/relative-products/${categorySlug}`);
      const relatedProductsData = response.data;
      setRelatedProducts(relatedProductsData);
    } catch (error) {
      toast.error('Error fetching related products', error);
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
          <div className='lg:w-full flex flex-wrap justify-between'>
            <div className='border border-pink-500'>
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
                <p className='title-font font-medium text-2xl text-gray-900 mt-3 text-right'>
                  Price: ${product.price}
                </p>
              </div>
              <div className='flex flex-col mt-6 items-center pb-5 mb-5'>
                <div className='flex items-center mb-5 w-1/3'>
                  <Select
                    label='Quantity'
                    placeholder='Select a quantity number'
                    className='w-full'
                    onChange={(e) => setQuantity(e.target.value)}
                  >
                    {[...Array(product.stockQuantity).keys()]
                      .map((value) => value + 1)
                      .map((quantity) => (
                        <SelectItem key={quantity} value={JSON.stringify(quantity)}>
                          {JSON.stringify(quantity)}
                        </SelectItem>
                      ))}
                  </Select>
                </div>
                <Button
                  className='flex items-center bg-primary text-white border-0 py-2 px-6 focus:outline-none hover:bg-gray-400 rounded'
                  onClick={addToCart}
                  disabled={product?.stockQuantity === 0}
                >
                  {product?.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                <span className='text-red-500 font-bold'>{error}</span>
              </div>
            </div>
          </div>
        </div>
        <ProductCardList products={relatedProducts} title='You may also like' />
      </section>
    </Layout>
  );
}
