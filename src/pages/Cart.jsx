import React from 'react';
import Layout from '../layouts/Base';
import { Cart } from '../components/Cart/Cart';

export default function CartPage() {
  return (
    <Layout>
      <div className='container mx-auto p-4'>
        <Cart />
      </div>
    </Layout>
  );
}
