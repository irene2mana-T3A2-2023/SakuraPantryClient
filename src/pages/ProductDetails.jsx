import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Button, Select, SelectItem, Divider, Spinner } from '@nextui-org/react';
import toast from 'react-hot-toast';
import Layout from '../layouts/Base';
import api from '../configs/api';
import ProductCardList from '../components/ProductCardList';
import { CartContext } from '../components/Cart/CartContext';
import { currencyFormatter, getAxiosErrorMessage } from '../utils';

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
  const [isLoading, setIsLoading] = useState(true);

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
        } else {
          toast.error(QUANTITY_ERROR_MSG);
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
    toast.success('Product added successfully');
  };

  // Function to fetch related products based on category
  const fetchRelatedProducts = async (categorySlug) => {
    try {
      const response = await api.get(`/products/relative-products/${categorySlug}`);
      const relatedProductsData = response.data;
      setRelatedProducts(relatedProductsData);
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    }
  };

  // Fetch product details and related products
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/products/${slug}`);
        setProduct(response.data);
        const categorySlug = response.data.category.slug;
        await fetchRelatedProducts(categorySlug);
      } catch (error) {
        toast.error(getAxiosErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [slug]);

  // Updates quantity state if input is a valid number greater than 0.
  const onChangeQuantity = (e) => {
    if (!isNaN(e.target.value) && e.target.value > 0) {
      setQuantity(Number(e.target.value));
    }
  };

  if (isLoading && !product) {
    return (
      <Layout>
        <div className='container mx-auto flex items-center justify-center'>
          <Spinner size='lg' color='secondary' />
        </div>
      </Layout>
    );
  }

  // Render the product details page
  return (
    <Layout>
      <section className='body-font overflow-hidden bg-white items-center w-full'>
        <div className='container max-w-[1280px] flex mx-auto mb:8 md:my-14'>
          <div className='flex flex-col md:flex-row gap-4 md:gap-10'>
            <div className='border-1.5 border-pink-500 md:min-w-[45%] p-4 rounded w-full md:w-2/5 flex justify-center items-center'>
              <Image
                alt='product image'
                className='max-h-full w-auto object-cover rounded'
                src={product.imageUrl}
              />
            </div>
            <div>
              <div>
                <h1 className='text-gray-900 text-3xl title-font font-medium'>{product.name}</h1>
                <Divider className='bg-pink-500 p-0.5 w-1/3 mt-5 h-px' />
                <div className='mt-2'>
                  <span className='mr-2 font-semibold'>Price:</span>
                  <span className='title-font font-medium text-2xl text-gray-900 mt-3'>
                    {currencyFormatter(product.price)} AUD
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
              </div>
            </div>
          </div>
        </div>
        {/* Display related products */}
        <ProductCardList
          products={relatedProducts}
          title='You may also like'
          isLoading={isLoading}
        />
      </section>
    </Layout>
  );
}
