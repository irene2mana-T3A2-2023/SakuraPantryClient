import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import Layout from '../layouts/Base';

export default function NotFoundPage() {
  return (
    <Layout>
      <div className='container min-h-full mx-auto flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center'>
          <div className='text-danger-500 font-bold text-8xl'>404</div>
          <div className='mt-10'>
            <h2 className='font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl text-center'>
              This page does not exist
            </h2>
          </div>
          <div className='mt-8'>
            <span className='text-gray-400 font-light text-sm md:text-xl lg:text-2xl text-center'>
              The page you are looking for could not be found.
            </span>
          </div>
          <Button
            as={Link}
            color='primary'
            size='lg'
            to='/'
            className='mt-14'
            data-testid='back-home-button'
          >
            Back to home
          </Button>
        </div>
      </div>
    </Layout>
  );
}
