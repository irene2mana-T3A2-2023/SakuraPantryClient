import Layout from '../layouts/Base';

export default function SearchPage() {
  return (
    <Layout>
      <div className='container mx-auto px-6'>
        <h3 className='text-gray-700 text-2xl font-medium'>Product for ''</h3>
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6'>
          <div className='w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden'>
            <div className='flex items-end justify-end h-56 w-full bg-cover'>
              <div className='px-5 py-3'>
                <h3 className='text-gray-700 uppercase'></h3>
                <span className='text-gray-500 mt-2'>Price: $</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
