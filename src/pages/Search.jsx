import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import api from '../configs/api';
import Layout from '../layouts/Base';
import toast from 'react-hot-toast';

export default function SearchPage() {
  // Store the search results.
  const [results, setResults] = useState([]);
  // React-router-dom is used to access the URL query parameters.
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  //  Retrieves the value of the query parameter keyword from URLSearchParams.
  const keyword = searchParams.get('keyword');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // API call is made to fetch products based on the provided keyword.
        const response = await api.get(`/products/search?keyword=${keyword}`);
        // Store search results in setResults.
        setResults(response.data);
      } catch (error) {
        toast.error('Error fetching search results:', error);
      }
    };
    // Check if the keyword variable is truthy before executing the fetchResults
    if (keyword) {
      fetchResults();
    }
  }, [keyword]);

  return (
    <Layout>
      <div className='container mx-auto px-6'>
        <h3 className='text-gray-700 text-2xl font-medium'>Product for `{keyword}`</h3>
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6'>
          {/* Checks if there are any products in the results array. If results contain items, it maps over each product*/}
          {results.length > 0 ? (
            results.map((product) => (
              <div
                key={product._id}
                className='w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden'
              >
                <Link to={`/product/${product.slug}`}>
                  <div className='flex flex-col w-full bg-cover'>
                    <Image
                      alt='product image'
                      className='max-h-full max-w-full object-cover rounded-t-lg'
                      src={product.imageUrl}
                    />
                    <div className='px-5 py-3 flex flex-col justify-end mt-auto '>
                      <div className='text-center font-medium'>
                        <h3 className='font-bold text-gray-900 uppercase mb-1'>{product.name}</h3>
                        <p className=' text-gray-500'>{product.category.name}</p>
                      </div>
                      <p className='font-semibold text-gray-900 mt-2 text-right'>
                        Price: ${product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            // If results is empty, it displays a message below.
            <p>No products found for '{keyword}'</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
