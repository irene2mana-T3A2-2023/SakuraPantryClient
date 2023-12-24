import { useForm, Controller } from 'react-hook-form';
import { useContext } from 'react';
import {
  Accordion,
  AccordionItem,
  Button,
  Divider,
  Input,
  RadioGroup,
  Radio,
  Image
} from '@nextui-org/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { Navigate, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import toast from 'react-hot-toast';
import { CartContext } from '../Cart/CartContext';
import card from '../../assets/images/card.png';
import amex from '../../assets/images/american-express.png';
import paypal from '../../assets/images/paypal.png';
import visa from '../../assets/images/visa.png';
import stripe from '../../assets/images/stripe.png';
import api from '../../configs/api';
import { getAxiosErrorMessage } from '../../utils';
import { OrderSummary } from './OrderSummary';

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
  paymentMethod: Joi.string().required().messages({
    'string.empty': `Payment method cannot be empty`,
    'any.required': `Payment method is required`
  })
});

// CHECKOUT COMPONENT
export const Checkout = () => {
  const navigate = useNavigate();

  // Initialize the useForm hook
  const { register, handleSubmit, formState, control } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      paymentMethod: 'Credit Card'
    }
  });

  // Access cart items and total price from the CartContext
  const { cartItems, setCartItems, getCartTotalPrice } = useContext(CartContext);

  // Function to place an order
  const placeOrder = async (orderData) => {
    try {
      // Send a POST request to create an order
      await api.post('/orders', orderData);
      // Log the order data and show a success message
      toast.success('Order placed!');
      // Remove cart items in local storage once the order is placed
      localStorage.removeItem('cartItems');
      // Reset the cart items state to an empty array
      setCartItems([]);
      // Navigate to the order success page
      navigate('/order-success');
    } catch (error) {
      // Log and show an error message if order placement fails
      toast.error(getAxiosErrorMessage(error));
    }
  };

  // Handler for form submission
  const onSubmit = async (updatedData) => {
    try {
      // Create an array of order items based on cart items
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity
      }));

      // Add the order items and total price to the data
      updatedData.orderItems = orderItems;

      // Log to check data in the console and create order with the updated data
      await placeOrder(updatedData);
    } catch (error) {
      toast.error('An error occurred while placing the order.');
    }
  };

  // If the cart is empty, redirect to the homepage.
  if (!cartItems?.length) {
    return <Navigate replace to={'/'} />;
  }

  // JSX structure for the Checkout component
  return (
    <div className='flex flex-col'>
      <h1 className='text-3xl mb-8'>CHECKOUT</h1>
      <div className='flex flex-col md:flex-row mb-8 gap-x-5'>
        {/* Shipping Address and Payment Method */}
        <div className='border-solid border-1 rounded p-4 border-pink-500 md:w-3/5 order-2 md:order-none'>
          {/* Form for user input */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Accordion defaultExpandedKeys={['1', '2']} selectionMode='multiple'>
              <AccordionItem
                key='1'
                aria-label='Accordion 2'
                className='text-xl'
                title='SHIPPING ADDRESS'
              >
                <Input
                  {...register('shippingAddress.address')}
                  label='Address'
                  className='mb-3'
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
                <Controller
                  control={control}
                  name='paymentMethod'
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup
                      color='secondary'
                      onChange={onChange}
                      value={value}
                      errorMessage={formState.errors?.paymentMethod?.message}
                    >
                      <div className='flex border-solid bg-stone-100 rounded pl-2 pt-3 pb-3 pr-3'>
                        <Radio value='Credit Card'>Credit Card</Radio>
                        <div className='flex ml-auto gap-2'>
                          <Image src={card} alt='' className='w-12 h-8' />
                          <Image src={visa} alt='' className='w-10 h-10' />
                          <Image src={amex} alt='' className='w-10 h-10' />
                        </div>
                      </div>
                      <div className='flex border-solid bg-stone-100 rounded p-2 pr-3'>
                        <Radio value='PayPal'>PayPal</Radio>
                        <img src={paypal} alt='' className='flex ml-auto w-12 h-12' />
                      </div>
                      <div className='flex border-solid bg-stone-100 rounded p-2 pr-3'>
                        <Radio value='Stripe'>Stripe</Radio>
                        <img src={stripe} alt='' className='flex ml-auto w-12 h-12' />
                      </div>
                    </RadioGroup>
                  )}
                />
              </AccordionItem>
            </Accordion>
            {/* "Place Order" button */}
            <div className='mt-6'>
              <Button
                type='submit'
                radius='sm'
                color='primary'
                variant='solid'
                className='w-full text-lg'
                size='lg'
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
  );
};
