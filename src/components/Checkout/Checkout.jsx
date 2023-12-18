/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useContext, useState } from 'react';
import { Accordion, AccordionItem, Button, Divider, Input } from '@nextui-org/react';
import { RadioGroup, Radio } from '@nextui-org/react';
import { CartContext } from '../Cart/CartContext';
import { OrderSummary } from './OrderSummary';
import card from '../../assets/images/card.png';
import amex from '../../assets/images/american-express.png';
import paypal from '../../assets/images/paypal.png';
import visa from '../../assets/images/visa.png';
import stripe from '../../assets/images/stripe.png';
import api from '../../configs/api';
import toast from 'react-hot-toast';
import { getAxiosErrorMessage } from '../../utils';

// Initial form data with default values
const initialFormData = {
  orderItems: [],
  paymentMethod: 'Credit Card',
  shippingAddress: {
    address: '',
    city: '',
    state: '',
    postcode: ''
  },
  phone: ''
};

// Function to place an order
const placeOrder = async (formData) => {
  try {
    // Retrieve the user's token from local storage
    const token = localStorage.getItem('token');
    // Send a POST request to create an order
    const response = await api.post('/orders', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // Log the order data and show a success message
    console.log(response.data);
    toast.success('Order placed!');
  } catch (error) {
    // Log and show an error message if order placement fails
    console.error('Error placing order:', error);
    toast.error(getAxiosErrorMessage(error));
  }
};

// CHECKOUT COMPONENT
export const Checkout = () => {
  // State to manage form data
  const [formData, setFormData] = useState(initialFormData);
  // Access cart items and total price from the CartContext
  const { cartItems, getCartTotalPrice } = useContext(CartContext);

  // Handler for input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Split the input name to handle nested data structures
    const nameParts = name.split('.');

    // Update form data based on input name
    if (nameParts.length === 1) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [nameParts[0]]: {
          ...prevData[nameParts[0]],
          [nameParts[1]]: value
        }
      }));
    }
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an array of order items based on cart items
    const orderItems = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity
    }));

    // Update the form data with order items
    setFormData((prevData) => ({
      ...prevData,
      orderItems
    }));

    // Create an object with updated form data
    const updatedFormData = {
      ...formData,
      orderItems
    };

    // Log the updated form data and initiate the order placement
    console.log(updatedFormData);
    await placeOrder(updatedFormData);
  };

  // JSX structure for the Checkout component
  return (
    <div className='flex flex-col'>
      <h1 className='text-3xl mb-8'>CHECKOUT</h1>
      <div className='flex flex-col md:flex-row mb-8 gap-x-5'>
        {/* Shipping Address and Payment Method */}
        <div className='border border-solid border-1 rounded p-4 border-pink-500 md:w-3/5 order-2 md:order-none'>
          <form onSubmit={handleSubmit}>
            <Accordion defaultExpandedKeys={['2']} selectionMode='multiple'>
              <AccordionItem
                key='1'
                aria-label='Accordion 2'
                className='text-xl'
                title='SHIPPING ADDRESS'
              >
                <Input
                  required
                  label='Address'
                  className='mb-3'
                  name='shippingAddress.address'
                  value={formData.shippingAddress.address}
                  onChange={handleInputChange}
                />
                <Input
                  required
                  label='City'
                  className='mb-3'
                  name='shippingAddress.city'
                  value={formData.shippingAddress.city}
                  onChange={handleInputChange}
                />
                <div className='flex flex-row gap-x-2'>
                  <Input
                    required
                    label='State'
                    className='flex-1 mb-3 w-1/2'
                    name='shippingAddress.state'
                    value={formData.shippingAddress.state}
                    onChange={handleInputChange}
                  />
                  <Input
                    required
                    label='Postcode'
                    className='flex-1 mb-3 w-1/2'
                    name='shippingAddress.postcode'
                    value={formData.shippingAddress.postcode}
                    onChange={handleInputChange}
                  />
                </div>
                <Input
                  required
                  label='Phone'
                  className='mb-3'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </AccordionItem>
              <AccordionItem
                key='2'
                aria-label='Accordion 3'
                className='text-xl'
                title='PAYMENT OPTION'
              >
                <RadioGroup
                  isRequired={true}
                  color='secondary'
                  defaultValue='Credit Card'
                  name='paymentMethod'
                  onChange={handleInputChange}
                >
                  <div className='flex border-solid bg-stone-100 rounded pl-2 pt-3 pb-3 pr-3'>
                    <Radio value='Credit Card'>Credit Card</Radio>
                    <div className='flex ml-auto gap-2'>
                      <img src={card} alt='' className='w-12 h-8' />
                      <img src={visa} alt='' className='w-10 h-10' />
                      <img src={amex} alt='' className='w-10 h-10' />
                    </div>
                  </div>
                  <div className='flex border-solid bg-stone-100 rounded p-2 pr-3'>
                    <Radio value='Paypal'>Paypal</Radio>
                    <img src={paypal} alt='' className='flex ml-auto w-12 h-12' />
                  </div>
                  <div className='flex border-solid bg-stone-100 rounded p-2 pr-3'>
                    <Radio value='Stripe'>Stripe</Radio>
                    <img src={stripe} alt='' className='flex ml-auto w-12 h-12' />
                  </div>
                </RadioGroup>
              </AccordionItem>
            </Accordion>
            {/* "Place Order" button */}
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
        <div className='border border-solid border-1 rounded border-pink-500 w-full mb-5 md:w-2/5 max-h-[310px]'>
          <h2 className='p-5 mt-3 text-xl'>ORDER SUMMARY</h2>
          <div className='ml-2 mb-3'>
            {cartItems.map((item) => (
              <OrderSummary key={item.id} item={item} />
            ))}
          </div>
          <div className='mb-6'>
            <div className='flex items-center justify-center'>
              <Divider style={{ width: '92%' }} className='bg-pink-500 h-px' />
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
