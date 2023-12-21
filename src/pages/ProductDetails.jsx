/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Button, Select, SelectItem, Divider } from '@nextui-org/react';
import Layout from '../layouts/Base';
import api from '../configs/api';
import ProductCardList from '../components/ProductCardList';
import { CartContext } from '../components/Cart/CartContext';

// Define a constant for the quantity error message
const QUANTITY_ERROR_MSG = '*Quantity limit exceeded!';

// PRODUCT DETAILS COMPONENT
export default function ProductDetailsPage() {
  // Extract the 'slug' from the URL parameters
  const { slug } = useParams();
  // State variables
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  // Initialize the quantity state with a default value of 1 to ensure that the user starts with a single item by default.
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  // Access 'setCartItems' from the CartContext
  const { setCartItems } = useContext(CartContext);

  // Function to add the product to the cart
  const addToCart = () => {
    let isItemExist = false;
    // Retrieve existing cart items from local storage or initialize an empty array
    let newCartItems = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [];
    // Iterate through existing cart items
    newCartItems.map((item) => {
      // Check if the item already exists in the cart
      if (item?._id === product?._id) {
        isItemExist = true;
        // Check if adding the selected quantity exceeds the stock limit
        if (item?.stockQuantity >= parseInt(quantity) + parseInt(item?.quantity)) {
          item.quantity += parseInt(quantity);
          setError('');
        } else {
          setError(QUANTITY_ERROR_MSG);
        }
      }
      return item;
    });
    // If the item doesn't exist in the cart, add it
    if (!isItemExist) {
      newCartItems.push({ ...product, quantity: parseInt(quantity) });
    }
    // Update the cart items in context and local storage
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  // Fetch product details and related products
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/products/${slug}`);
        setProduct(response.data);
        const categorySlug = response.data.category.slug;
        fetchRelatedProducts(categorySlug);
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };

    fetchProductDetails();
  }, [slug]);

  // Function to fetch related products based on category
  const fetchRelatedProducts = async (categorySlug) => {
    try {
      const response = await api.get(`/products/relative-products/${categorySlug}`);
      const relatedProductsData = response.data;
      setRelatedProducts(relatedProductsData);
    } catch (error) {
      console.error('Error fetching related products', error);
    }
  };

  // Updates quantity state if input is a valid number greater than 0.
  const onChangeQuantity = (e) => {
    if (!isNaN(e.target.value) && e.target.value > 0) {
      setQuantity(Number(e.target.value));
    }
  };

  if (!product) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  // Render the product details page
  return (
    <Layout>
      <section className='body-font overflow-hidden bg-white items-center'>
        <div className='container flex justify-center items-center md:mx-20 md:my-12'>
          <div className='md:flex md:flex-cols'>
            <div className='border-1.5 border-pink-500 p-8 rounded md:w-2/3 flex justify-center'>
              <Image
                alt='product image'
                className='max-h-full w-auto object-cover rounded'
                src={product.imageUrl}
              />
            </div>
            <div className='md:w-full md:pl-12 mt-6 md:mt-0'>
              <div className='md:pr-20'>
                <h1 className='text-gray-900 text-3xl title-font font-medium'>{product.name}</h1>
                <Divider className='bg-pink-500 p-0.5 w-1/3 mt-5 h-px' />
                <div className='mt-2'>
                  <span className='mr-2 font-semibold'>Price:</span>
                  <span className='title-font font-medium text-2xl text-gray-900 mt-3'>
                    ${product.price.toFixed(2)} AUD
                  </span>
                </div>
                <div className='flex mb-4'></div>
                <p className='leading-relaxed text-justify'>{product.description}</p>
              </div>
              <div className='mt-5'>
                <div className='flex items-center mb-5 w-1/3'>
                  {/* Quantity selection dropdown */}
                  <Select
                    size='sm'
                    aria-label='select-quantity'
                    aria-labelledby='select-quantity'
                    className='w-[80px]'
                    variant='bordered'
                    defaultSelectedKeys={[1]}
                    selectedKeys={`${quantity}`}
                    onChange={onChangeQuantity}
                  >
                    {[...Array(Math.min(5, product?.stockQuantity || 0)).keys()].map((x) => (
                      <SelectItem key={x + 1} value={x + 1}>
                        {`${x + 1}`}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                {/* Add to Cart button */}
                <Button
                  variant='solid'
                  color='primary'
                  size='lg'
                  className='w-full md:w-1/2 text-lg'
                  onClick={addToCart}
                  disabled={product?.stockQuantity === 0}
                >
                  {product?.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                {/* Display error message, if any */}
                <span className='pl-3 text-red-500 font-semibold'>{error}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Display related products */}
        <ProductCardList products={relatedProducts} title='You may also like' />
      </section>
    </Layout>
  );
}
