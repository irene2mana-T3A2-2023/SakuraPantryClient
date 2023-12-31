import { Input, Select, SelectItem, Button } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams, createSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { getAxiosErrorMessage } from '../utils';
import api from '../configs/api';

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = ({ k, c }) => {
    const params = {};

    if (k.trim() !== '') {
      params.k = k;
    }

    if (c.trim() !== '') {
      params.c = c;
    }

    if (Object.keys(params).length > 0) {
      if (pathname === '/search') {
        setSearchParams(params);
      } else {
        navigate(`/search?${createSearchParams(params).toString()}`);
      }
    }
  };

  const onKeyDownHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      handleSubmit(onSubmit)();
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await api.get('/categories');

        setCategories(data ?? []);
      } catch (error) {
        toast.error(getAxiosErrorMessage(error));
      }
    };
    getCategories();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex items-center justify-center max-w-full md:min-w-[450px] xl:min-w-[800px] w-full'
    >
      <Input
        {...register('k')}
        className='w-full'
        classNames={{
          inputWrapper: 'rounded-large rounded-tr-none rounded-br-none'
        }}
        placeholder='Search...'
        variant='flat'
        onKeyDown={onKeyDownHandler}
        defaultValue={searchParams.get('k') || undefined}
        size='sm'
      />
      <Select
        {...register('c')}
        size='sm'
        variant='flat'
        placeholder='Category'
        aria-labelledby='search'
        className='max-w-[120px] lg:max-w-[200px]'
        defaultSelectedKeys={searchParams.get('c') ? [searchParams.get('c')] : undefined}
        popoverProps={{
          className: 'min-w-[165px] md:min-w-[250px]'
        }}
        classNames={{
          value: 'group-data-[has-value=true]:text-white text-white',
          trigger:
            'rounded-tl-none rounded-bl-none bg-secondary-400 text-white data-[hover=true]:bg-secondary-300 group-data-[focus=true]:bg-secondary-100 rounded-tr-none rounded-br-none'
        }}
      >
        {categories.map((c) => (
          <SelectItem key={c.slug} value={c.slug}>
            {c.name}
          </SelectItem>
        ))}
      </Select>
      <Button
        isIconOnly
        variant='flat'
        color='secondary'
        size='lg'
        type='submit'
        className='rounded-tl-none rounded-bl-none bg-secondary-400 text-white'
      >
        <FiSearch />
      </Button>
    </form>
  );
}
