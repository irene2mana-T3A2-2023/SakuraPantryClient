import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const ProductCardList = ({ products, title }) => {
  return (
    <div className='flex flex-col mt-10'>
      <h1 className='text-left font-bold text-3xl mb-4 mt-5 text-primary '>{title}</h1>
      <div className='carousel mt-4 overflow-hidden'>
        <motion.div className='flex space-x-2' drag='x' dragConstraints={{ left: -500, right: 0 }}>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductCardList;
