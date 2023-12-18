import React from 'react';
import { Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.slug}`}>
      <div className='flex flex-col py-4 h-[95%] items-center max-w-full transform overflow-hidden min-w-[240px] rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg'>
        <Image
          className='h-40 w-full object-cover object-center'
          src={product.imageUrl}
          alt='Products'
        />
        <div className='p-4 w-full flex flex-col justify-between flex-grow'>
          <h2 className='text-md mb-2 font-medium text-center text-gray-900 flex-grow'>
            {product.name}
          </h2>
          <p className='text-xs font-medium mb-1 text-gray-500 tracking-widest text-center'>
            {product.category.name}
          </p>
          <div className='flex items-end justify-end '>
            <p className='text-md font-semibold text-gray-900'>Price: ${product.price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
