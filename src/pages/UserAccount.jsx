/* eslint-disable import/order */
/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
import React from 'react';
import Layout from '../layouts/Base';
import { Tabs, Tab } from '@nextui-org/react';
import { UserProfile } from '../components/UserAccount/UserProfile';

export default function UserAccountPage() {
  return (
    <Layout>
      <div className='flex w-full flex-col h-screen mt-10 mx-16 md:mx-24'>
        <Tabs aria-label='Options' fullWidth size='lg' color='primary' variant='solid'>
          <Tab key='profile' title='User Profile'>
            <UserProfile />
          </Tab>
          <Tab key='changepassword' title='Change Password'>
            <div></div>
          </Tab>
          <Tab key='orderhistory' title='Order History'>
            <div></div>
          </Tab>
        </Tabs>
      </div>
    </Layout>
  );
}
