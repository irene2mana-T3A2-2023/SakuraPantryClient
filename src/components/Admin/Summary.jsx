import { Card, CardBody } from '@nextui-org/react';

export default function Summary() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 grid-container--fit'>
      <Card className='shadow-none bg-purple-600'>
        <CardBody className='min-h-[200px] flex items-center justify-center text-white'>
          <div className='text-3xl font-bold'>1000</div>
          <div className='text-lg font-light'>Total Revenue</div>
        </CardBody>
      </Card>
      <Card className='shadow-none bg-pink-600'>
        <CardBody className='min-h-[200px] flex items-center justify-center text-white'>
          <div className='text-3xl font-bold'>1000</div>
          <div className='text-lg font-light'>Total Orders</div>
        </CardBody>
      </Card>
      <Card className='shadow-none bg-orange-600'>
        <CardBody className='min-h-[200px] flex items-center justify-center text-white'>
          <div className='text-3xl font-bold'>1000</div>
          <div className='text-lg font-light'>Total Products</div>
        </CardBody>
      </Card>
      <Card className='shadow-none bg-green-600'>
        <CardBody className='min-h-[200px] flex items-center justify-center text-white'>
          <div className='text-3xl font-bold'>1000</div>
          <div className='text-lg font-light'>Total Users</div>
        </CardBody>
      </Card>
      <Card className='shadow-none bg-yellow-600'>
        <CardBody className='min-h-[200px] flex items-center justify-center text-white'>
          <div className='text-3xl font-bold'>1000</div>
          <div className='text-lg font-light'>Total Categories</div>
        </CardBody>
      </Card>
    </div>
  );
}
