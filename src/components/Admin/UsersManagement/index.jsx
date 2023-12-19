import { useEffect, useState } from 'react';
import { Chip } from '@nextui-org/react';
import api from '../../../configs/api';
import DataTable from '../DataTable';
import { getAxiosErrorMessage } from '../../../utils';
import toast from 'react-hot-toast';

export default function UsersManagement() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');

        setData(res.data);
      } catch (error) {
        toast.error(getAxiosErrorMessage(error));
      }
    };

    fetchUsers();
  }, []);

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case 'firstName':
        return (
          <span className='text-md font-medium text-secondary-500'>
            {cellValue} {user.lastName}
          </span>
        );

      case 'email':
        return (
          <div>
            <span className='text-md text-foreground'>{cellValue}</span>
          </div>
        );

      case 'role':
        return (
          <Chip
            className='capitalize'
            color={cellValue === 'admin' ? 'warning' : 'danger'}
            size='sm'
            variant='flat'
          >
            {cellValue}
          </Chip>
        );

      case 'status':
        return (
          <Chip
            className='capitalize'
            color={cellValue === 'active' ? 'success' : 'danger'}
            size='sm'
            variant='flat'
          >
            {cellValue}
          </Chip>
        );

      default:
        return cellValue;
    }
  };

  // eslint-disable-next-line
  console.log(data);

  if (!data) {
    return null;
  }

  return (
    <DataTable
      data={data}
      renderCell={renderCell}
      columns={[
        { name: 'NAME', uid: 'firstName' },
        { name: 'ROLE', uid: 'role' },
        { name: 'EMAIL', uid: 'email' },
        { name: 'STATUS', uid: 'status' }
      ]}
    />
  );
}
