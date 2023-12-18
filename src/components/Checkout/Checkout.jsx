/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Accordion, AccordionItem, Button, Divider, Input } from '@nextui-org/react';
import { RadioGroup, Radio } from '@nextui-org/react';
import { CartContext } from '../Cart/CartContext';
import { OrderSummary } from './OrderSummary';

const initialFormData = {
  orderItems: [],
  paymentMethod: 'Credit Card',
  shippingAddress: {
    address: '',
    city: '',
    state: '',
    postcode: '',
    phone: ''
  }
};

const confirmOrder = async (formData) => {
  try {
    const response = await axios.post('http://localhost:500/api/order', formData);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const Checkout = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { cartItems, getCartTotalPrice } = useContext(CartContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await confirmOrder(formData);
  };

  return (
    <div className='flex flex-col'>
      <h1 className='text-3xl mb-8'>CHECKOUT</h1>
      <div className='flex flex-col md:flex-row mb-8 gap-x-5'>
        {/* Shipping Address and Payment Method */}
        <div className='border border-solid border-1 rounded p-4 border-pink-500 md:w-3/5'>
          <form onSubmit={handleSubmit}>
            <Accordion defaultExpandedKeys={['2']}>
              <AccordionItem key='1' aria-label='Accordion 2' className='text-xl' title='SHIPPING ADDRESS'>
                <Input
                  required
                  label='Address'
                  className='mb-3'
                  name='address'
                  errorMessage='This field is required'
                />
                <Input required label='City' className='mb-3' name='city' />
                <div className='flex flex-row gap-x-2 mb-3'>
                  <Input required label='State' className='flex-1 mb-3 w-1/2' name='state' />
                  <Input required label='Postcode' className='flex-1 mb-3 w-1/2' name='postcode' />
                </div>
                <Input required label='Phone' className='mb-3' name='phone' />
              </AccordionItem>
              <AccordionItem key='2' aria-label='Accordion 3' className='text-xl' title='PAYMENT METHOD'>
                <RadioGroup
                  isRequired={true}
                  color='secondary'
                  defaultValue='Credit Card'
                  name='paymentMethod'
                >
                  <Radio value='Credit Card'>Credit Card</Radio>
                  <Radio value='Paypal'>Paypal</Radio>
                  <Radio value='Stripe'>Stripe</Radio>
                </RadioGroup>
              </AccordionItem>
            </Accordion>
            {/* "Pay Now" button */}
            <div className='mt-6'>
              <Button
                type='submit'
                radius='sm'
                color='primary'
                variant='solid'
                className='w-3/5'
                size='lg'
              >
                <p className='text-lg'>Place Order</p>
              </Button>
              <p className='text-sm text-stone-500 mt-2'>
                * Press Place Order to complete your purchase.
              </p>
            </div>
          </form>
        </div>
        {/* Order Summary */}
        <div className='border border-solid border-1 rounded border-pink-500 w-full md:w-2/5'>
          <h2 className='p-5 mt-3 text-xl'>ORDER SUMMARY</h2>
          <div className='ml-2 mb-3'>
            {cartItems.map((item) => (
              <OrderSummary key={item.id} item={item} />
            ))}
          </div>
          <div className='mb-6'>
            <div className='flex items-center justify-center'>
              <Divider style={{ width: '92%' }} className='bg-pink-500 h-px'/>
            </div>
            <div className='flex flex-row ml-5 mt-3 font-semibold'>
              <p className='justify-start'>Shipping</p>
              <p className='justify-end ml-auto pr-5'>$0.00 AUD</p>
            </div>
            <div className='flex flex-row ml-5 mt-3 font-semibold'>
              <p className='justify-start'>Order Total</p>
              <p className='justify-end ml-auto pr-5'>${getCartTotalPrice()} AUD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
