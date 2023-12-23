import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Carousel({ items }) {
  const [page, setPage] = useState(0);
  const numItems = items.length;
  const delay = 3000; // Delay in milliseconds for auto-play

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % numItems);
    }, delay);

    return () => clearInterval(interval);
  }, [numItems, delay]);

  const variants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <div className='relative w-full h-[150px] md:h-[300px] lg:h-[500px] overflow-hidden rounded-2xl mt-2'>
      <AnimatePresence>
        <motion.img
          key={page}
          src={items[page].imageUrl}
          alt={items[page].title}
          initial='enter'
          animate='center'
          exit='exit'
          variants={variants}
          transition={{
            x: { type: 'tween', duration: 1 }, // Set transition duration for x-axis movement
            opacity: { duration: 1 } // Set transition duration for opacity change
          }}
          className='absolute w-full h-full object-cover'
        />
      </AnimatePresence>
      <div className='absolute bottom-0 w-full flex justify-center p-4'>
        {items.map((_, index) => (
          <span
            key={index}
            className={`mx-2 h-2 w-2 bg-secondary rounded-full ${
              index === page ? 'bg-opacity-100' : 'bg-opacity-50'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
