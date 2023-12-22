import React from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import Layout from '../layouts/Base';
import { UserProfile } from '../components/UserAccount/UserProfile';
import { OrderHistory } from '../components/UserAccount/OrderHistory';
import { ChangePassword } from '../components/UserAccount/ChangePassword';

export default function UserAccountPage() {
  return (
    <Layout>
      <div className='flex flex-col h-screen mt-10 w-4/5 mx-auto'>
        <Tabs aria-label='Options' fullWidth size='lg' color='primary' variant='solid'>
          <Tab key='profile' title='Profile'>
            <UserProfile />
          </Tab>
          <Tab key='changepassword' title='Change Password'>
            <ChangePassword />
          </Tab>
          <Tab key='orderhistory' title='Order History'>
            <OrderHistory />
          </Tab>
        </Tabs>
      </div>
    </Layout>
  );
}
