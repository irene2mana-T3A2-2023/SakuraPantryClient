import { Skeleton } from '@nextui-org/react';
import ProductCard from './ProductCard';

const ProductCardList = ({
  products,
  title,
  isHorizontalViewInMobile = true,
  isLoading,
  skeletonNo = 5
}) => {
  const className = isHorizontalViewInMobile ? 'flex overflow-x-auto' : 'grid';

  return (
    <div className='flex flex-col mt-10'>
      {title ? (
        <h3 className='relative text-2xl mb-4 lg:text-4xl font-light after:content-[""] after:w-[60px] after:h-2 after:block after:bg-secondary after:mt-2'>
          {title}
        </h3>
      ) : null}
      <div
        className={`${className} lg:grid md:grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-8 no-scrollbar`}
      >
        {/* Iterate over the products array. */}
        {isLoading
          ? // Render a list of Skeleton components when loading
            Array.from({ length: skeletonNo }, (_, index) => (
              <Skeleton className='min-h-[300px] shadow-lg rounded-lg' key={index} />
            ))
          : // Iterate over the products array when not loading
            products.map((product, index) => <ProductCard key={index} product={product} />)}
      </div>
    </div>
  );
};

export default ProductCardList;
