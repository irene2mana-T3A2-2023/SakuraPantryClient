import { Card } from '@nextui-org/react';
import { Input, Button } from '@nextui-org/react';
import Joi from 'joi';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../components/Auth/useAuth';
import Layout from '../layouts/Base';

const nameRegex = /^[a-zA-Z]{3,30}$/;

// Joi schema definition for form validation for required fields to sign up a new account
const schema = Joi.object({
  firstName: Joi.string().pattern(nameRegex).required().messages({
    'string.pattern.base': `First name must be between 3 to 30 characters and contain letters only`,
    'string.empty': `First name cannot be empty`,
    'any.required': `First name is required`
  }),
  lastName: Joi.string().pattern(nameRegex).required().messages({
    'string.pattern.base': `Last name must be between 3 to 30 characters and contain letters only`,
    'string.empty': `Last name cannot be empty`,
    'any.required': `Last name is required`
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': `Email cannot be empty`,
      'string.email': `Email is not valid`,
      'any.required': `Email is required`
    }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required().messages({
    'string.pattern.base': `Password should be between 8 to 30 characters and contain letters or numbers only`,
    'string.empty': `Password cannot be empty`,
    'any.required': `Password is required`
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': `Confirm password does not match`,
    'string.empty': `Confirm password cannot be empty`,
    'any.required': `Confirm password is required`
  })
});

// SignUpPage functional component definition.
export default function SignUpPage() {
  // Use the useForm hook from React-Hook-Form to manage form data, validation, and submissions.
  const { register, handleSubmit, formState } = useForm({
    // `resolver: joiResolver(schema)` integrates Joi for schema-based form validation.
    resolver: joiResolver(schema)
  });

  // Use a custom authentication hook (useAuth) for user registration functionality.
  // Renamed `register` from useAuth to `signUp` to avoid naming conflict.
  const { register: signUp } = useAuth();

  // State to manage the loading status.
  const [loading, setLoading] = useState(false);

  // Define an asynchronous function to handle form submission.
  const onSubmit = async ({ firstName, lastName, email, password, confirmPassword }) => {
    // Set loading to true when the submission process starts.
    setLoading(true);

    try {
      // Attempt to register the user with the provided details.
      await signUp({ firstName, lastName, email, password, confirmPassword });
    } finally {
      // Ensure loading is set to false after the registration attempt.
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className='container min-h-full mx-auto flex flex-col items-center justify-center'>
        <Card className='p-10 shadow-none border-1 w-full lg:w-[50%]'>
          <h4 className='text-4xl mb-2 font-semibold text-center'>Create new account</h4>
          <span className='text-sm lg:text-base mb-10 text-center'>Please enter your detail</span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col lg:flex-row gap-0 lg:gap-4 mb-6'>
              <Input
                {...register('firstName')}
                label='First Name'
                className='mb-6 lg:mb-0'
                errorMessage={formState.errors?.firstName?.message}
                endContent={<FiUser className='h-6 w-6 text-default-400 self-center' />}
              />
              <Input
                {...register('lastName')}
                label='Last Name'
                errorMessage={formState.errors?.lastName?.message}
                endContent={<FiUser className='h-6 w-6 text-default-400 self-center' />}
              />
            </div>
            <Input
              {...register('email')}
              label='Email'
              className='mb-6'
              errorMessage={formState.errors?.email?.message}
              endContent={<FiMail className='h-6 w-6 text-default-400 self-center' />}
            />
            <Input
              {...register('password')}
              label='Password'
              type='password'
              className='mb-6'
              errorMessage={formState.errors?.password?.message}
              endContent={<FiLock className='h-6 w-6 text-default-400 self-center' />}
            />
            <Input
              {...register('confirmPassword')}
              label='Confirm Password'
              type='password'
              errorMessage={formState.errors?.confirmPassword?.message}
              endContent={<FiLock className='h-6 w-6 text-default-400 self-center' />}
            />
            <Button
              type='submit'
              color='primary'
              className='w-full mt-8'
              size='lg'
              isDisabled={loading}
            >
              Sign Up
            </Button>
          </form>
        </Card>
        <div className='mt-6 text-center'>
          <span className='text-sm lg:text-base mr-2'>Already have an account?</span>
          <Link className='underline text-primary' to='/sign-in'>
            Sign In
          </Link>
        </div>
      </div>
    </Layout>
  );
}
