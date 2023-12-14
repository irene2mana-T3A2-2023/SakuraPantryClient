import Layout from '../layouts/Base';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { motion } from 'framer-motion';
import api from '../configs/api';
import { useState, useEffect } from 'react';
import homeImage from '../assets/images/homePage.jpg';
import toast from 'react-hot-toast';

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
  // Fetch products data from an API when the component mounts.
  useEffect(() => {
    const fetchProducts = async () => {
      //Call the api.get method to retrieve products.
      try {
        const response = await api.get('/products');
        const products = response.data.products;
        // Swaps elements within the array to produce a new, randomized order and returns the shuffled array.
        const shuffledProducts = shuffleArray(products);
        // Update the newArrivals state with the shuffled array of products.
        setNewArrivals(shuffledProducts);
        // Fetch only products with isFeatured is true by filtering the products.
        setFeaturedProducts(products.filter((product) => product.isFeatured));
      } catch (error) {
        // If there is an error during the registration process, catches the error and displays an error message.
        toast.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className='w-full mb-10'>
        <img src={homeImage} alt='HomeImage' className='w-full object-cover h-80' />
        {/*New Arrivals Section*/}
        <div className='flex flex-col'>
          <h1 className='text-left font-bold text-3xl mt-10 mb-4 text-primary'>New Arrivals</h1>
          <div className='carousel mt-4 overflow-hidden'>
            <motion.div
              className='flex space-x-2'
              drag='x'
              dragConstraints={{ left: -1000, right: 0 }}
            >
              {/* Iterates over each item in the newArrivals array. */}
              {newArrivals.map((product, index) => (
                <Card
                  shadow='sm'
                  key={index}
                  isPressable
                  className='border-2 w-[300px] h-[450px] flex-shrink-0'
                >
                  <CardBody className='flext justify-center overflow-visible'>
                    <Image
                      radius='lg'
                      width='100%'
                      alt={product.name}
                      className='w-full object-contain'
                      src={product.imageUrl}
                    />
                  </CardBody>
                  <CardFooter className='text-small justify-around'>
                    <b>{product.name}</b>
                    <p className='text-default-500'>${product.price}</p>
                  </CardFooter>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Featured Collection Section */}
        <div className='flex flex-col mt-10'>
          <h1 className='text-left font-bold text-3xl mb-4 mt-5 text-primary '>
            Featured Collection
          </h1>
          <div className='carousel mt-4 overflow-hidden'>
            <motion.div
              className='flex space-x-2'
              drag='x'
              dragConstraints={{ left: -1000, right: 0 }}
            >
              {/*creates a new array including only products where the isFeatured property is true.*/}
              {featuredProducts
                .filter((product) => product.isFeatured)
                .map((product, index) => (
                  <Card
                    shadow='sm'
                    key={index}
                    isPressable
                    className='border-2 w-[300px] h-[450px] flex-shrink-0'
                  >
                    <CardBody className='flex justify-center overflow-visible h-full'>
                      <Image
                        radius='lg'
                        width='100%'
                        alt={product.name}
                        className='w-full object-contain'
                        src={product.imageUrl}
                      />
                    </CardBody>
                    <CardFooter className='text-small justify-between'>
                      <b>{product.name}</b>
                      <p className='text-default-500'>${product.price}</p>
                    </CardFooter>
                  </Card>
                ))}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
