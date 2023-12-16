import React from 'react';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';

const ProductCard = ({ product }) => {
  return (
    <Card shadow='sm' isPressable className='border-2 w-[300px] h-[450px] flex-shrink-0'>
      <CardBody className='flext justify-center overflow-visible'>
        <Image
          radius='lg'
          width='100%'
          alt={product.name}
          className='w-full object-contain'
          src={product.imageUrl}
        />
      </CardBody>
      <CardFooter className='text-small justify-around'>
        <b>{product.name}</b>
        <p className='text-default-500'>${product.price}</p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
