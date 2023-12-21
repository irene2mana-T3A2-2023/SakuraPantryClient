import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Image, Pagination } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import api from '../configs/api';
import Layout from '../layouts/Base';
import toast from 'react-hot-toast';

export default function SearchPage() {
  // React-router-dom is used to access the URL query parameters.
  const [searchParams, setSearchParams] = useSearchParams();
  //  Extract the query parameters keyword(k) and categorySlug(c) from the URL.
  const keyword = searchParams.get('k');
  const categorySlug = searchParams.get('c');
  // Store the search results, the current page number and the total number fo pages.
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(0);
  // Set 8 items to display per page.
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // API to fetch search results and set them to the results and the totalpage state.
        const response = await api.get(
          `/products/search?k=${keyword}&c=${categorySlug}&page=${currentPage}&limit=${itemsPerPage}`
        );
        setResults(response.data.results);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        toast.error('Error fetching search results', error);
      }
    };
    // When either keyword or categorySlug is changed, or when currentPage is changed, the fetchSearchResults() is called to retrieve and display new search results.
    // However, if both keyword and categorySlug are not present, meaning that search criteria are not provided.
    if (keyword || categorySlug) {
      fetchSearchResults();
    }
  }, [keyword, categorySlug, currentPage]);

  // Page represents the page number selected by the user.
  const handlePageChange = (page) => {
    // Updates currentPage with the page number selected by the user.
    setCurrentPage(page);
    //  Reflect the current search keyword, categorySlug, and the new page number in the URL.
    setSearchParams({ k: keyword, c: categorySlug, page });
  };

  return (
    <Layout>
      <div className='container mx-auto px-6'>
        <h3 className='text-gray-700 text-4xl font-medium'>
          {keyword ? `Products for "${keyword}"` : `Products in category "${categorySlug}"`}
        </h3>
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6'>
          {/* Checks if there　is at least one or more elements in the results array. If results contain items, it maps over each product*/}
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
            onChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
}
