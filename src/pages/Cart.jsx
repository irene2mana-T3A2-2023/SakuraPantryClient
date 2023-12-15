import React from 'react';
import Layout from '../layouts/Base';
import { Cart } from '../components/Cart';

function CartPage() {
  const cartItems = [
    { id: 1, name: 'Product 1', price: 10.99, quantity: 2 },
    { id: 2, name: 'Product 2', price: 20.99, quantity: 1 }
  ];

  return (
    <Layout>
      <div className='container mx-auto p-4'>
        <Cart cartItems={cartItems} />
      </div>
    </Layout>
  );
}

export default CartPage;
