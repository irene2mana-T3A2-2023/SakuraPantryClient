import { Card } from '@nextui-org/react';
import { Input, Button } from '@nextui-org/react';
import Joi from 'joi';
import { FiMail, FiLock } from 'react-icons/fi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../components/Auth/useAuth';
import Layout from '../layouts/Base';

// Joi schema definition for form validation for required fields to sign in
const schema = Joi.object({
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
  })
});

// SignUpPage functional component definition.
export default function SignInPage() {
  // Use the useForm hook from React-Hook-Form to manage form data, validation, and submissions.
  const { register, handleSubmit, formState } = useForm({
    // `resolver: joiResolver(schema)` integrates Joi for schema-based form validation.
    resolver: joiResolver(schema)
  });

  // Use a custom authentication hook (useAuth) for user registration functionality.
  // Renamed `register` from useAuth to `signUp` to avoid naming conflict.
  const { login } = useAuth();

  // State to manage the loading status.
  const [loading, setLoading] = useState(false);

  // Define an asynchronous function to handle form submission.
  const onSubmit = async ({ email, password }) => {
    // Set loading to true when the submission process starts.
    setLoading(true);

    try {
      // Attempt to register the user with the provided details.
      await login({ email, password });
    } finally {
      // Ensure loading is set to false after the registration attempt.
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className='container min-h-full mx-auto flex flex-col items-center justify-center'>
        <Card className='p-10 shadow-none border-1 w-full lg:w-[50%]'>
          <h4 className='text-4xl mb-2 font-semibold text-center'>Welcome back!</h4>
          <span className='text-sm lg:text-base mb-10 text-center'>Please enter your details</span>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button
              type='submit'
              color='primary'
              className='w-full mt-8'
              size='lg'
              isDisabled={loading}
            >
              Sign In
            </Button>
          </form>
        </Card>
        <div className='mt-6 text-center'>
          <span className='text-sm lg:text-base mr-2'>Don't have an account?</span>
          <Link className='underline text-primary' to='/sign-up'>
            Create now
          </Link>
        </div>
      </div>
    </Layout>
  );
}
