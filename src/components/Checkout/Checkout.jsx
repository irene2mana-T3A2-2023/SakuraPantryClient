/* eslint-disable no-console */
import { useForm } from 'react-hook-form';
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
import { OrderSuccess } from './OrderSuccess';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

// Joi schema to validata input fields
const schema = Joi.object({
  shippingAddress: Joi.object({
    address: Joi.string().required().messages({
      'string.empty': `Address cannot be empty`,
      'any.required': `Address is required`
    }),
    city: Joi.string().required().messages({
      'string.empty': `City cannot be empty`,
      'any.required': `City is required`
    }),
    state: Joi.string().required().messages({
      'string.empty': `State cannot be empty`,
      'any.required': `State is required`
    }),
    postcode: Joi.string().required().messages({
      'string.empty': `Postcode cannot be empty`,
      'any.required': `Postcode is required`
    })
  }),
  phone: Joi.string().pattern(new RegExp('^[0-9]{6,12}$')).required().messages({
    'string.pattern.base': `Phone number must contain numbers only`,
    'string.empty': `Phone number cannot be empty`,
    'any.required': `Phone number is required`
  }),
  paymentMethod: Joi.string().required()
});

// CHECKOUT COMPONENT
export const Checkout = () => {
  // Initialize the useForm hook
  const { register, handleSubmit, setValue, formState } = useForm({
    resolver: joiResolver(schema)
  });

  // Access cart items and total price from the CartContext
  const { cartItems, setCartItems, getCartTotalPrice } = useContext(CartContext);

  // Set state for managing placed order
  const [orderPlaced, setOrderPlaced] = useState(false);

  // State to manage the loading status.
  const [loading, setLoading] = useState(false);

  // Function to place an order
  const placeOrder = async (orderData) => {
    setLoading(true);
    try {
      // Retrieve the user's token from local storage
      const token = localStorage.getItem('token');
      // Send a POST request to create an order
      const response = await api.post('/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Log the order data and show a success message
      console.log(response.data);
      toast.success('Order placed!');
      // Remove cart items in local storage once the order is placed
      localStorage.removeItem('cartItems');
      setCartItems([]);
      // Set the state to indicate that the order is placed
      setOrderPlaced(true);
      // Return the response for async validation
      return response;
    } catch (error) {
      // Log and show an error message if order placement fails
      console.error('Error placing order:', error);
      toast.error(getAxiosErrorMessage(error));
      // If the order placement fails, reject the promise with the error
      throw error;
    } finally {
      // Set loading to false after the order is successfully placed
      setLoading(false);
    }
  };

  // Handler for changing the payment method
  const handlePaymentMethodChange = (value) => {
    setValue('paymentMethod', value);
  };

  // Handler for form submission
  const onSubmit = async (updatedData) => {
    console.log('Form State: ', formState);
    console.log('Updated Data: ', updatedData);
    try {
      // Create an array of order items based on cart items
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity
      }));

      // Add the order items and total price to the data
      updatedData.orderItems = orderItems;

      // Log to check data in the console and create order with the updated data
      console.log(updatedData);
      await placeOrder(updatedData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while placing the order.');
    }
  };

  // JSX structure for the Checkout component
  return (
    <div>
      {/* Conditionally render the success message */}
      {orderPlaced ? (
        <OrderSuccess />
      ) : (
        <div className='flex flex-col'>
          <h1 className='text-3xl mb-8'>CHECKOUT</h1>
          <div className='flex flex-col md:flex-row mb-8 gap-x-5'>
            {/* Shipping Address and Payment Method */}
            <div className='border border-solid border-1 rounded p-4 border-pink-500 md:w-3/5 order-2 md:order-none'>
              {/* Form for user input */}
              <form
                onSubmit={handleSubmit(onSubmit, (errors) => {
                  console.log('Errors occured in form submission.');
                  console.log(errors);
                })}
              >
                <Accordion defaultExpandedKeys={['2']} selectionMode='multiple'>
                  <AccordionItem
                    key='1'
                    aria-label='Accordion 2'
                    className='text-xl'
                    title='SHIPPING ADDRESS'
                  >
                    <Input
                      label='Address'
                      className='mb-3'
                      {...register('shippingAddress.address')}
                      errorMessage={formState.errors?.shippingAddress?.address?.message}
                    />
                    <Input
                      label='City'
                      className='mb-3'
                      {...register('shippingAddress.city')}
                      errorMessage={formState.errors?.shippingAddress?.city?.message}
                    />
                    <div className='flex flex-row gap-x-2'>
                      <Input
                        label='State'
                        className='flex-1 mb-3 w-1/2'
                        {...register('shippingAddress.state')}
                        errorMessage={formState.errors?.shippingAddress?.state?.message}
                      />
                      <Input
                        label='Postcode'
                        className='flex-1 mb-3 w-1/2'
                        {...register('shippingAddress.postcode')}
                        errorMessage={formState.errors?.shippingAddress?.postcode?.message}
                      />
                    </div>
                    <Input
                      label='Phone'
                      className='mb-3'
                      {...register('phone')}
                      errorMessage={formState.errors?.phone?.message}
                    />
                  </AccordionItem>
                  <AccordionItem
                    key='2'
                    aria-label='Accordion 3'
                    className='text-xl'
                    title='PAYMENT OPTION'
                  >
                    {/* Payment Method Radio Group */}
                    <RadioGroup isRequired={true} color='secondary' defaultValue='Credit Card'>
                      <div className='flex border-solid bg-stone-100 rounded pl-2 pt-3 pb-3 pr-3'>
                        <Radio
                          value='Credit Card'
                          {...register('paymentMethod')}
                          onChange={() => handlePaymentMethodChange('Credit Card')}
                        >
                          Credit Card
                        </Radio>
                        <div className='flex ml-auto gap-2'>
                          <img src={card} alt='' className='w-12 h-8' />
                          <img src={visa} alt='' className='w-10 h-10' />
                          <img src={amex} alt='' className='w-10 h-10' />
                        </div>
                      </div>
                      <div className='flex border-solid bg-stone-100 rounded p-2 pr-3'>
                        <Radio
                          value='PayPal'
                          {...register('paymentMethod')}
                          onChange={() => handlePaymentMethodChange('PayPal')}
                        >
                          PayPal
                        </Radio>
                        <img src={paypal} alt='' className='flex ml-auto w-12 h-12' />
                      </div>
                      <div className='flex border-solid bg-stone-100 rounded p-2 pr-3'>
                        <Radio
                          value='Stripe'
                          {...register('paymentMethod')}
                          onChange={() => handlePaymentMethodChange('Stripe')}
                        >
                          Stripe
                        </Radio>
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
                    className='w-3/5 text-lg'
                    size='lg'
                    isDisabled={loading}
                  >
                    Place Order
                  </Button>
                  <p className='text-sm text-stone-500 mt-2'>
                    * Press Place Order to complete your purchase.
                  </p>
                </div>
              </form>
            </div>
            {/* Order Summary section */}
            <div className='w-full mb-5 md:w-2/5'>
              {/* Order Summary heading */}
              <h2 className='p-5 text-xl'>ORDER SUMMARY</h2>
              <div className='ml-2 mb-3'>
                {/* Render OrderSummary component for each cart item */}
                {cartItems.map((item) => (
                  <OrderSummary key={item._id} item={item} />
                ))}
              </div>
              {/* Shipping and Order Total sections */}
              <div className='mb-6'>
                <div className='flex items-center justify-center'>
                  {/* Divider line */}
                  <Divider style={{ width: '92%' }} className='bg-pink-500 h-px' />
                </div>
                {/* Shipping cost */}
                <div className='flex flex-row ml-5 mt-3 font-semibold'>
                  <p className='justify-start'>Shipping</p>
                  <p className='justify-end ml-auto pr-5'>$0.00 AUD</p>
                </div>
                {/* Order Total */}
                <div className='flex flex-row ml-5 mt-3 font-semibold'>
                  <p className='justify-start'>Order Total</p>
                  <p className='justify-end ml-auto pr-5'>${getCartTotalPrice()} AUD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
