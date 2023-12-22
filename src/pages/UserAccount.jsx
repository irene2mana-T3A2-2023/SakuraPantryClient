/* eslint-disable import/order */
/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
import React from 'react';
import Layout from '../layouts/Base';
import { Tabs, Tab } from '@nextui-org/react';
import { UserProfile } from '../components/UserAccount/UserProfile';
import { OrderHistory } from '../components/UserAccount/OrderHistory';

export default function UserAccountPage() {
  return (
    <Layout>
      <div className='flex flex-col h-screen mt-10 w-4/5 mx-auto'>
        <Tabs aria-label='Options' fullWidth size='lg' color='primary' variant='solid'>
          <Tab key='profile' title='User Profile'>
            <UserProfile />
          </Tab>
          <Tab key='changepassword' title='Change Password'>
            <div></div>
          </Tab>
          <Tab key='orderhistory' title='Order History'>
            <OrderHistory />
          </Tab>
        </Tabs>
      </div>
    </Layout>
  );
}
