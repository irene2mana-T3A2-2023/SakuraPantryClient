import { useEffect, useState } from 'react';
import { Chip, Spinner } from '@nextui-org/react';
import toast from 'react-hot-toast';
import api from '../../../configs/api';
import DataTable from '../DataTable';
import { getAxiosErrorMessage, formatDateTime } from '../../../utils';

export default function UsersManagement() {
  // State for storing user data and loading status.
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effect to fetch user data from API on component mount.
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');

        setData(res.data);
      } catch (error) {
        toast.error(getAxiosErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to render cell content based on the user data and column key.
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

  // Render a spinner while data is loading.
  if (loading || !data) {
    return (
      <div className='container max-w-full flex items-center justify-center min-h-[500px]'>
        <Spinner size='lg' />
      </div>
    );
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
