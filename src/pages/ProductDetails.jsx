import React from 'react';
import Layout from '../layouts/Base';
import homeImage from '../assets/images/homePage.jpg';
import { Card, CardHeader, CardBody, CardFooter, Divider } from '@nextui-org/react';

function ProductDetailsPage() {
  return (
    <Layout>
      <div>
        <img src={homeImage} alt='HomeImage' className='w-[300px] h-[300px] object-cover' />
        <Card className='max-w-[400px]'>
          <CardHeader className='flex gap-3'>
            <div className='flex flex-col'>
              <p className='text-lg'>Product name</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className='text-md'>Prodct description</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <p className='text-md'>Price: $10.00</p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}

export default ProductDetailsPage;
