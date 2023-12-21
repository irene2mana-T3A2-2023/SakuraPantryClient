import React, { useState, useEffect } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { Pagination } from '@nextui-org/react';
import api from '../configs/api';
import Layout from '../layouts/Base';
import toast from 'react-hot-toast';
import ProductsList from '../components/ProductCardList';

export default function SearchPage() {
  // Provides access to the current query parameters and a function to update them.
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);

      const params = {
        page: currentPage,
        limit: itemsPerPage
      };

      if (keyword) {
        params.k = keyword;
      }

      if (categorySlug) {
        params.c = categorySlug;
      }

      try {
        // API to fetch search results and set them to the results and the totalPage state.
        const response = await api.get(`/products/search?${createSearchParams(params)}`);

        setResults(response.data.results);

        setTotalPages(response.data.totalPages);
      } catch (error) {
        toast.error('Error fetching search results', error);
      } finally {
        setIsLoading(false);
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
      <div className='container max-w-full mx-auto py-6'>
        {isLoading ? null : (
          <h3 className='text-gray-700 text-4xl font-light mb-10'>
            {keyword ? `Products for "${keyword}"` : `Products in category "${categorySlug}"`}
          </h3>
        )}
        {!results.length && !isLoading ? (
          <p>No products found for '{keyword}'</p>
        ) : (
          <ProductsList
            products={results}
            isHorizontalViewInMobile={false}
            isLoading={isLoading}
            skeletonNo={8}
          />
        )}
        {totalPages > 1 ? (
          <div className='flex justify-center mt-7'>
            <Pagination
              showControls
              total={totalPages}
              initialPage={currentPage}
              onChange={handlePageChange}
            />
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
