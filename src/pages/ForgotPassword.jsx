import { Card } from '@nextui-org/react';
import { Input, Button } from '@nextui-org/react';
import Joi from 'joi';
import { FiMail } from 'react-icons/fi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useAuth from '../components/Auth/useAuth';
import Layout from '../layouts/Base';

// Joi schema definition for form validation for required fields to sign up a new account
const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': `Email cannot be empty`,
      'string.email': `Email is not valid`,
      'any.required': `Email is required`
    })
});

export default function ForgotPassword() {
  const { register, handleSubmit, formState } = useForm({
    resolver: joiResolver(schema)
  });

  const { forgotPassword } = useAuth();

  // State to manage the loading status.
  const [loading, setLoading] = useState(false);

  // Define an asynchronous function to handle form submission.
  const onSubmit = async ({ email }) => {
    // Set loading to true when the submission process starts.
    setLoading(true);

    try {
      await forgotPassword({ email });
    } finally {
      // Ensure loading is set to false after the registration attempt.
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className='container min-h-full mx-auto flex flex-col items-center justify-center'>
        <Card className='p-10 shadow-none border-1 w-full lg:w-[50%]'>
          <h4 className='text-4xl mb-2 font-semibold text-center'>Forgot your password?</h4>
          <span className='text-sm lg:text-base mb-10 text-center'>
            Enter your email below to receive your password reset instructions.
          </span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register('email')}
              label='Email'
              className='mb-6'
              errorMessage={formState.errors?.email?.message}
              endContent={<FiMail className='h-6 w-6 text-default-400 self-center' />}
            />
            <Button
              type='submit'
              color='primary'
              className='w-full mt-8'
              size='lg'
              isDisabled={loading}
            >
              Send
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
