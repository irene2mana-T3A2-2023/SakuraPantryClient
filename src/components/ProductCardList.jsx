import ProductCard from './ProductCard';

const ProductCardList = ({ products, title }) => {
  return (
    <div className='flex flex-col mt-10'>
      <h3 className='relative text-2xl lg:text-4xl font-light after:content-[""] after:w-[60px] after:h-2 after:block after:bg-secondary after:mt-2'>
        {title}
      </h3>
      <div className='flex overflow-x-auto lg:overflow-x-visible lg:grid lg:grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-8 p-4 no-scrollbar'>
        {/* Iterate over the products array. */}
        {products.map((product, index) => (
          // key={index} provides a unique key for each ProductCard component
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCardList;
