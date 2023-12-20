import { Tabs, Tab } from '@nextui-org/react';
import { FiDatabase, FiUser, FiEdit, FiPackage } from 'react-icons/fi';
import { BiCategoryAlt } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';
import Summary from './Summary';
import ProductsMangement from './ProductsManagement';
import CategoriesMangement from './CategoriesManagement';
import UsersManagement from './UsersManagement';
import OrdersManagement from './OrdersManagement';

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
        color='secondary'
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
          <div className='container max-w-full mt-10'>
            <Summary />
          </div>
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
          <div className='container max-w-full mt-10'>
            <OrdersManagement />
          </div>
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
          <div className='container max-w-full mt-10'>
            <ProductsMangement />
          </div>
        </Tab>
        <Tab
          key='categories-management'
          title={
            <div className='flex items-center space-x-2'>
              <BiCategoryAlt />
              <span>Categories</span>
            </div>
          }
        >
          <div className='container max-w-full mt-10'>
            <CategoriesMangement />
          </div>
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
          <div className='container max-w-full mt-10'>
            <UsersManagement />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
