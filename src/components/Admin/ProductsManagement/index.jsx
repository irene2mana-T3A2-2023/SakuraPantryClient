import { useState, useEffect } from 'react';
import api from '../../../configs/api';
import { getAxiosErrorMessage } from '../../../utils';
import toast from 'react-hot-toast';
import DataTable from '../DataTable';
import { Tooltip, Image } from '@nextui-org/react';
import { currencyFormatter } from '../../../utils';
import { FiEye, FiEdit, FiTrash } from 'react-icons/fi';

export default function ProductsMangement() {
  const [data, setData] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');

      setData(res.data);
    } catch (err) {
      toast.error(getAxiosErrorMessage(err));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // eslint-disable-next-line
  console.log(data);

  const renderCell = (product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case 'name':
        return <span className='text-md font-medium text-secondary-500'>{cellValue}</span>;

      case 'imageUrl':
        return (
          <div className='flex items-center'>
            <Image src={cellValue} className='h-[50px] w-auto' />
          </div>
        );

      case 'category':
        return <span className='text-md text-blue-500'>{cellValue.name}</span>;

      case 'description':
        return <span className='text-md text-foreground-500'>{cellValue}</span>;

      case 'price':
        return (
          <span className='text-md text-green-500 font-semibold'>
            {currencyFormatter(cellValue)}
          </span>
        );

      case 'stockQuantity':
        return (
          <div className='flex justify-center'>
            <span className='text-md text-orange-500 font-semibold'>{cellValue}</span>
          </div>
        );

      case 'actions':
        return (
          <div className='relative flex items-center2 gap-3'>
            <Tooltip content='Details'>
              <span className='text-lg text-default-500 cursor-pointer active:opacity-50'>
                <FiEye />
              </span>
            </Tooltip>
            <Tooltip content='Edit product'>
              <span className='text-lg text-default-500 cursor-pointer active:opacity-50'>
                <FiEdit />
              </span>
            </Tooltip>
            <Tooltip color='danger' content='Delete product'>
              <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                <FiTrash />
              </span>
            </Tooltip>
          </div>
        );

      default:
        return cellValue;
    }
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <DataTable
        data={data}
        addAction={() => {}}
        addActionLabel='Add new product'
        renderCell={renderCell}
        columns={[
          { name: 'NAME', uid: 'name' },
          { name: 'IMAGE', uid: 'imageUrl' },
          { name: 'CATEGORY', uid: 'category' },
          { name: 'DESCRIPTION', uid: 'description' },
          { name: 'PRICE', uid: 'price' },
          { name: 'QUANTITY IN STOCK', uid: 'stockQuantity' },
          { name: 'ACTIONS', uid: 'actions' }
        ]}
      />
    </>
  );
}
