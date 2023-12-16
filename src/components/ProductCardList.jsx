import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const ProductCardList = ({ products, title }) => {
  return (
    <div className='flex flex-col mt-10'>
      <h1 className='text-left font-bold text-3xl mb-4 mt-5 text-primary '>{title}</h1>
      <div className='carousel mt-4 overflow-hidden'>
        {/* Make the 'motion.div' draggable along the horizontal axis and 'left: -500' means the element can be dragged up to 500 pixels to the left of its starting position. */}
        <motion.div className='flex space-x-2' drag='x' dragConstraints={{ left: -500, right: 0 }}>
          {/* Iterate over the products array. */}
          {products.map((product, index) => (
            // key={index} provides a unique key for each ProductCard component
            <ProductCard key={index} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductCardList;
