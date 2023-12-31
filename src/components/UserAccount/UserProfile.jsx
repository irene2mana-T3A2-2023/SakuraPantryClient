import React, { useEffect, useState } from 'react';
import { Input } from '@nextui-org/react';
import toast from 'react-hot-toast';
import api from '../../configs/api';

// USER PROFILE COMPONENT
export const UserProfile = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);

      try {
        // Call the api.get method to retrieve users
        const user = await api.get('/auth/current-user');
        setUser(user.data);
      } catch (error) {
        // If there is an error during the registration process, catches the error and displays an error message.
        toast.error('Error fetching user', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  // JSX structure for User Profile component
  return (
    <div className='mt-10 md:mx-32'>
      <h1 className='text-3xl mb-8'>MY PROFILE</h1>
      <form>
        <div className='flex flex-row items-center gap-2 mb-3'>
          <Input value={user.firstName} />
          <Input value={user.lastName} />
        </div>
        <Input value={user.email} className='mb-3' />
        <Input placeholder='Phone' className='mb-3' />
        <Input placeholder='Address' className='mb-3' />
        <Input placeholder='City' className='mb-3' />
        <div className='flex flex-row items-center gap-2 mb-3'>
          <Input placeholder='State' className='mb-3' />
          <Input placeholder='Postcode' className='mb-3' />
        </div>
      </form>
    </div>
  );
};
