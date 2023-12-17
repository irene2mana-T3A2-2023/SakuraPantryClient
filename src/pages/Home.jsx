import Layout from '../layouts/Base';
import api from '../configs/api';
import { useState, useEffect } from 'react';
import homeImage from '../assets/images/homePage.jpg';
import toast from 'react-hot-toast';
import ProductCardList from '../components/ProductCardList';

const HomePage = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Fetch products data from an API when the component mounts.
  useEffect(() => {
    const fetchProducts = async () => {
      //Call the api.get method to retrieve products.
      try {
        const newArrivalProductsResponse = await api.get('/products/new-arrivals');
        setNewArrivals(newArrivalProductsResponse.data);

        const featuredProductsResponse = await api.get('/products/feature');
        setFeaturedProducts(featuredProductsResponse.data);
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
        <img src={homeImage} alt='HomeImage' className='w-full object-cover h-50 lg:h-80' />
        {/*New Arrivals Section*/}
        <ProductCardList products={newArrivals} title='New Arrivals' />
        {/* Featured Collection Section */}
        <ProductCardList
          // Create a new array containing only those products where the isFeatured property is true.
          products={featuredProducts}
          title='Featured Collection'
        />
      </div>
    </Layout>
  );
};

export default HomePage;
