import { Card, CardBody } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import api from '../../configs/api';
import toast from 'react-hot-toast';
import { getAxiosErrorMessage, currencyFormatter } from '../../utils';

export default function Summary() {
  const [data, setData] = useState(null);

  const fetchSummary = async () => {
    try {
      const res = await api.get('/dashboard/summary');
      setData(res.data);
    } catch (err) {
      toast.error(getAxiosErrorMessage(err));
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 grid-container--fit'>
      <Card className='shadow-none bg-purple-600'>
        <CardBody className='min-h-[200px] flex items-center justify-center text-white'>
          <div className='text-3xl font-bold'>{currencyFormatter(data.totalRevenue)}</div>
          <div className='text-lg font-light'>Total Revenue</div>
        </CardBody>
      </Card>
      <Card className='shadow-none bg-pink-600'>
        <CardBody className='min-h-[200px] flex items-center justify-center text-white'>
          <div className='text-3xl font-bold'>{data.totalOrder}</div>
          <div className='text-lg font-light'>Total Orders</div>
        </CardBody>
      </Card>
      <Card className='shadow-none bg-orange-600'>
        <CardBody className='min-h-[200px] flex items-center justify-center text-white'>
          <div className='text-3xl font-bold'>{data.totalProduct}</div>
          <div className='text-lg font-light'>Total Products</div>
        </CardBody>
      </Card>
      <Card className='shadow-none bg-green-600'>
        <CardBody className='min-h-[200px] flex items-center justify-center text-white'>
          <div className='text-3xl font-bold'>{data.totalCategory}</div>
          <div className='text-lg font-light'>Total Users</div>
        </CardBody>
      </Card>
      <Card className='shadow-none bg-yellow-600'>
        <CardBody className='min-h-[200px] flex items-center justify-center text-white'>
          <div className='text-3xl font-bold'>{data.totalUser}</div>
          <div className='text-lg font-light'>Total Categories</div>
        </CardBody>
      </Card>
    </div>
  );
}
