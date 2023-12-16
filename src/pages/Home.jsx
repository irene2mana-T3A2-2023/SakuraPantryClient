import Layout from '../layouts/Base';
import api from '../configs/api';
import { useState, useEffect } from 'react';
import homeImage from '../assets/images/homePage.jpg';
import toast from 'react-hot-toast';
import ProductCardList from '../components/ProductCardList';

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
        const products = response.data;
        // Swap elements within the array to produce a new, randomized order and returns the shuffled array.
        const shuffledProducts = shuffleArray(products);
        // Update the newArrivals state with the shuffled array of products and get 6 products .
        setNewArrivals(shuffledProducts.slice(0, 6));
        // Fetch only products with isFeatured is true by filtering the products and get 6 products.
        setFeaturedProducts(shuffledProducts.filter((product) => product.isFeatured).slice(0, 6));
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
        <ProductCardList products={newArrivals} title='New Arrivals' />

        {/* Featured Collection Section */}
        <ProductCardList
          // Create a new array containing only those products where the isFeatured property is true.
          products={featuredProducts.filter((product) => product.isFeatured)}
          title='Featured Collection'
        />
      </div>
    </Layout>
  );
};

export default HomePage;
