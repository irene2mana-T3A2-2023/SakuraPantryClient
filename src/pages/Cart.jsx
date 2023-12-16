/* eslint-disable prettier/prettier */
import React from 'react';
import Layout from '../layouts/Base';
import { Cart } from '../components/Cart';

function CartPage() {
  const cartItems = [
    {
      id: 1,
      image:
        'https://image.dokodemo.world/catalog-skus/9032237/8665ac97785ade2d5e8de6341621e2fd.jpg?d=450x0',
      name: 'Sukiyaki Sauce ',
      price: 10.99,
      quantity: 2
    },
    {
      id: 2,
      image:
        'https://image.dokodemo.world/catalog-skus/1508989/fb207367efcf8fbdbb7c58c5596d7767.jpg?d=450x0',
      name: 'Dashi Stock Powder',
      price: 20.99,
      quantity: 1
    },
    {
      id: 3,
      image:
        'https://image.dokodemo.world/catalog-skus/1508989/fb207367efcf8fbdbb7c58c5596d7767.jpg?d=450x0',
      name: 'Calbee Potato Chips',
      price: 20.99,
      quantity: 3
    }
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
