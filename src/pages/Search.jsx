import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Image, Pagination } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import api from '../configs/api';
import Layout from '../layouts/Base';
import toast from 'react-hot-toast';

export default function SearchPage() {
  // React-router-dom is used to access the URL query parameters.
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  //  Retrieves the value of the query parameter keyword from URLSearchParams.
  const keyword = query.get('k');
  const categorySlug = query.get('c');
  // Store the search results.
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await api.get(
          `/products/search?k=${keyword}&c=${categorySlug}&page=${currentPage}&limit=${itemsPerPage}`
        );
        setResults(response.data.results);
        // eslint-disable-next-line
        console.log(response.data.results);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        //eslint-disable-next-line
        console.log('Error fetching search results', error);
        toast.error('Error fetching search results', error);
      }
    };

    if (keyword || categorySlug) {
      fetchSearchResults();
    }
  }, [keyword, categorySlug, currentPage]);

  return (
    <Layout>
      <div className='container mx-auto px-6'>
        <h3 className='text-gray-700 text-4xl font-medium'>
          {keyword ? `Products for "${keyword}"` : `Products in category "${categorySlug}"`}
        </h3>
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6'>
          {/* Checks if there are any products in the results array. If results contain items, it maps over each product*/}
          {results.length > 0 ? (
            results.map((product) => (
              <div
                key={product._id}
                className='w-full min-w-[240px] mx-auto rounded-md shadow-md overflow-hidden'
              >
                <Link to={`/product/${product.slug}`}>
                  <div className='flex flex-col w-full bg-cover items-center '>
                    <Image
                      alt='product image'
                      className='h-40 max-w-full object-cover rounded-t-lg '
                      src={product.imageUrl}
                    />
                    <div className='px-5 py-3 flex flex-col justify-end mt-auto '>
                      <div className='text-center font-medium'>
                        <h3 className='font-bold text-gray-900 uppercase mb-1'>{product.name}</h3>
                        <p className=' text-gray-500'>{product.category.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className='mb-3 mr-3'>
                    <p className='font-semibold text-gray-900 text-lg text-right'>
                      Price: ${product.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            // If results is empty, it displays a message below.
            <p>No products found for '{keyword}'</p>
          )}
        </div>
        <div className='flex justify-center mt-7'>
          <Pagination
            showControls
            total={totalPages}
            initialPage={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </Layout>
  );
}
