import { useEffect, useState } from 'react';
import { Chip } from '@nextui-org/react';
import api from '../../../configs/api';
import DataTable from '../DataTable';
import { getAxiosErrorMessage, formatDateTime } from '../../../utils';
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
      case 'name':
        return (
          <span className='text-md font-medium text-primary'>
            {user.firstName} {user.lastName}
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

      case 'createdAt':
        return (
          <div>
            <span className='text-md text-foreground'>{formatDateTime(cellValue)}</span>
          </div>
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
        { name: 'NAME', uid: 'name' },
        { name: 'ROLE', uid: 'role' },
        { name: 'EMAIL', uid: 'email' },
        { name: 'CREATED AT', uid: 'createdAt' },
        { name: 'STATUS', uid: 'status' }
      ]}
    />
  );
}
