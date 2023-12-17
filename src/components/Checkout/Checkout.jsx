/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { Accordion, AccordionItem, Button, Input } from '@nextui-org/react';
import { RadioGroup, Radio } from '@nextui-org/react';
import axios from 'axios';

const initialFormData = {
  orderItems: [],
  paymentMethod: 'Credit Card',
  shippingAddress: {
    address: '',
    city: '',
    postcode: ''
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
      <div className='border border-solid border-1.5 rounded p-4 md:w-3/5'>
      <form onSubmit={handleSubmit}>
        <Accordion defaultExpandedKeys={["2"]}>
          <AccordionItem key='1' aria-label='Accordion 2' title='SHIPPING ADDRESS'>
            <Input
              required
              label='Address'
              className='mb-3'
              name='address'
              errorMessage='This field is required'
            />
            <Input required label='City' className='mb-3' name='city' />
            <Input required label='Postcode' className='mb-3' name='postcode' />
          </AccordionItem>
          <AccordionItem key='2' aria-label='Accordion 3' title='PAYMENT METHOD'>
            <RadioGroup
              isRequired={true}
              color='secondary'
              defaultValue='Credit Card'
              name='paymentMethod'
            >
              <Radio value='Credit Card'>Credit Card</Radio>
              <Radio value='Paypal'>Paypal</Radio>
              <Radio value='Stripe'>Stripe</Radio>
              <Radio value='Other'>Other</Radio>
            </RadioGroup>
          </AccordionItem>
        </Accordion>
        {/* "Pay Now" button */}
        <div className='mt-6'>
        <Button type='submit' radius='sm' color='primary' variant='solid' className='w-full'>Pay Now</Button>
        </div>
      </form>
      </div>
      {/* Order Summary */}
      <div className='border border-solid border-1.5 rounded p-5 text-lg w-full md:w-2/5'>
            ORDER SUMMARY
      </div>
      </div>
    </div>
  );
};
