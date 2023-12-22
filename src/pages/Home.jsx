import Layout from '../layouts/Base';
import api from '../configs/api';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ProductCardList from '../components/ProductCardList';
import panel1 from '../assets/images/panel1.jpg';
import panel2 from '../assets/images/panel2.jpg';
import panel3 from '../assets/images/panel3.jpg';
import panel4 from '../assets/images/panel4.jpg';
import Carousel from '../components/Carousel';

const items = [
  { id: 1, imageUrl: panel1, title: 'Item 1' },
  { id: 2, imageUrl: panel2, title: 'Item 2' },
  { id: 3, imageUrl: panel3, title: 'Item 3' },
  { id: 4, imageUrl: panel4, title: 'Item 4' }
];
const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Fetch products data from an API when the component mounts.
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        //Call the api.get method to retrieve products.
        const newArrivalProductsResponse = await api.get('/products/new-arrivals');
        setNewArrivals(newArrivalProductsResponse.data);

        const featuredProductsResponse = await api.get('/products/feature');
        setFeaturedProducts(featuredProductsResponse.data);
      } catch (error) {
        // If there is an error during the registration process, catches the error and displays an error message.
        toast.error('Error fetching products', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className='container relative max-w-full flex flex-col w-full mb-10'>
        <Carousel items={items} />
        {/*New Arrivals Section*/}
        <ProductCardList products={newArrivals} title='New Arrivals' isLoading={isLoading} />
        {/* Featured Collection Section */}
        <ProductCardList
          // Create a new array containing only those products where the isFeatured property is true.
          products={featuredProducts}
          title='Featured Collection'
          isLoading={isLoading}
        />
      </div>
    </Layout>
  );
};

export default HomePage;
