import Layout from '../layouts/Base';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { motion } from 'framer-motion';
import api from '../configs/api';
import { useState, useEffect } from 'react';
import homeImage from '../assets/images/homePage.jpg';

const HomePage = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Define to randomly shuffle an array. This is used to randomize the display of products.
  function shuffleArray(array) {
    let currentIndex = array.length,
      randomIndex;

    // Shuffle elements while the array has elements
    while (currentIndex !== 0) {
      // Select elements randamly from the remaining elements.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Exchange selected elements with current elements.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  // Fetch product data from an API when the component mounts.
  useEffect(() => {
    const fetchProducts = async () => {
      //It calls the api.get method to retrieve products
      try {
        const response = await api.get('/products');
        const products = response.data.products;
        //Shuffle products.
        const shuffledProducts = shuffleArray(products);
        // Updates the newArrivals and featuredProducts state variables.
        setNewArrivals(shuffledProducts.slice(0, 4));
        // Fetch only products with isFeatured is true by filtering the products.
        setFeaturedProducts(products.filter((product) => product.isFeatured).slice(0, 4));
      } catch (error) {
        //eslint-disable-next-line
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  // Framer motion settings
  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <Layout>
      <div className='w-full mb-4'>
        <img src={homeImage} alt='HomeImage' className='w-full object-cover h-64' />
        {/*New Arrivals Section*/}
        <div className='flex flex-col w-full'>
          <h1 className='text-left font-bold text-2xl mt-10 mb-4 text-secondary'>New Arrivals</h1>
          <motion.div
            className='w-full mx-auto'
            initial='hidden'
            animate='visible'
            variants={variants}
          >
            <div className='gap-10 grid grid-cols-2 sm:grid-cols-4'>
              {/* Executes a given function for each element of the array, creating a new array from the results. */}
              {newArrivals.map((product, index) => (
                // provide a unique identifier for each element, helping React optimize rendering performance and card is clickable.
                <Card shadow='sm' key={index} isPressable>
                  <CardBody className='flex justify-center items-center p-0 overflow-visible'>
                    <Image
                      radius='lg'
                      width='80%'
                      alt={product.name}
                      className='w-full object-cover h-[250px]'
                      src={product.imageUrl}
                    />
                  </CardBody>
                  <CardFooter className='text-small justify-between'>
                    <b>{product.name}</b>
                    <p className='text-default-500'>${product.price}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Featured Collection Section */}
          <h1 className='text-left font-bold text-2xl mb-4 mt-8 text-secondary '>
            Featured Collection
          </h1>
          <motion.div
            className='w-full mx-auto'
            initial='hidden'
            animate='visible'
            variants={variants}
          >
            <div className='gap-10 grid grid-cols-2 sm:grid-cols-4 mb-6'>
              {/*creates a new array including only products where the isFeatured property is true. It's a conditional check that filters out any products that don't meet this criterion. */}
              {featuredProducts
                .filter((product) => product.isFeatured)
                .map((product, index) => (
                  <Card shadow='sm' key={index} isPressable>
                    <CardBody className='flex justify-center items-center p-0 overflow-visible'>
                      <Image
                        radius='lg'
                        width='85%'
                        alt={product.name}
                        className='w-full object-cover h-[250px]'
                        src={product.imageUrl}
                      />
                    </CardBody>
                    <CardFooter className='text-small justify-between'>
                      <b>{product.name}</b>
                      <p className='text-default-500'>${product.price}</p>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
