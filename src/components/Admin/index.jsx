import React from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import { FiDatabase, FiUser, FiEdit, FiPackage, FiFile } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';

export default function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const onSelectionChange = (key) => {
    setSearchParams({ tab: key });
  };

  return (
    <div className='flex w-full flex-col h-11 min-w-lg'>
      <Tabs
        onSelectionChange={onSelectionChange}
        defaultSelectedKey={searchParams.get('tab') || 'total-summary'}
        aria-label='admin-tabs'
        variant='bordered'
        color='primary'
        className='w-full mt-4'
        radius='sm'
        classNames={{
          base: 'h-[100px] w-full',
          tabList: 'p-0 md:p-4 w-full border-0 md:border-1 shadow-none',
          tab: 'h-full md:py-4',
          tabContent: 'text-sm md:text-xl font-light'
        }}
      >
        <Tab
          key='total-summary'
          title={
            <div className='flex items-center space-x-2'>
              <FiDatabase />
              <span>Total Summary</span>
            </div>
          }
        >
          <div className='container max-w-full mt-10'>This is total summary table</div>
        </Tab>
        <Tab
          key='order-management'
          title={
            <div className='flex items-center space-x-2'>
              <FiEdit />
              <span>Orders</span>
            </div>
          }
        >
          <div className='container max-w-full mt-10'>This is order management table</div>
        </Tab>
        <Tab
          key='product-management'
          title={
            <div className='flex items-center space-x-2'>
              <FiPackage />
              <span>Products</span>
            </div>
          }
        >
          <div className='container max-w-full mt-10'>This is products management table</div>
        </Tab>
        <Tab
          key='categories-management'
          title={
            <div className='flex items-center space-x-2'>
              <FiFile />
              <span>Categories</span>
            </div>
          }
        >
          <div className='container max-w-full mt-10'>This is categories management table</div>
        </Tab>
        <Tab
          key='users-management'
          title={
            <div className='flex items-center space-x-2'>
              <FiUser />
              <span>Users</span>
            </div>
          }
        >
          <div className='container max-w-full mt-10'>This is users management table</div>
        </Tab>
      </Tabs>
    </div>
  );
}
