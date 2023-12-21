import { Input, Button, Card } from '@nextui-org/react';
import Joi from 'joi';
import { FiLock } from 'react-icons/fi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../components/Auth/useAuth';
import Layout from '../layouts/Base';

// Joi schema definition for form validation for required fields to reset password.
const schema = Joi.object({
  newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required().messages({
    'string.pattern.base': `New password should be between 8 to 30 characters and contain letters or numbers only`,
    'string.empty': `Password cannot be empty`,
    'any.required': `Password is required`
  }),
  confirmNewPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
    'any.only': `Confirm password does not match`,
    'string.empty': `Confirm password cannot be empty`,
    'any.required': `Confirm password is required`
  })
});

// Export a default function component named ResetPasswordPage.
export default function ResetPasswordPage() {
  // Use the useForm hook from React-Hook-Form to manage form data, validation, and submissions.
  const { register, handleSubmit, formState } = useForm({
    // `resolver: joiResolver(schema)` integrates Joi for schema-based form validation.
    resolver: joiResolver(schema)
  });

  // Use a custom authentication hook (useAuth) for reset password functionality.
  const { resetPassword } = useAuth();

  // Retrieve the reset token from the URL parameters using useParams hook from React Router.
  const { resetToken } = useParams();

  // useState hook to manage the loading state, initially set to false.
  const [loading, setLoading] = useState(false);

  // Define an asynchronous function to handle form submission.
  const onSubmit = async ({ newPassword, confirmNewPassword }) => {
    // Set loading to true when the submission process starts.
    setLoading(true);

    try {
      // Attempt to reset password the user with the provided details.
      await resetPassword({ resetToken, newPassword, confirmNewPassword });
    } finally {
      // After the reset attempt (whether successful or not), set the loading state back to false.
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className='container min-h-full mx-auto flex flex-col items-center justify-center'>
        <Card className='p-10 shadow-none border-1 w-full lg:w-[50%]'>
          <h4 className='text-4xl mb-2 font-semibold text-center'>Set new password</h4>
          <span className='text-sm lg:text-base mb-10 text-center'>
            Must be at least 8 characters and contain letters or numbers only!
          </span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register('newPassword')}
              label='Password'
              type='password'
              className='mb-6'
              errorMessage={formState.errors?.newPassword?.message}
              endContent={<FiLock className='h-6 w-6 text-default-400 self-center' />}
            />
            <Input
              {...register('confirmNewPassword')}
              label='Confirm Password'
              type='password'
              errorMessage={formState.errors?.confirmNewPassword?.message}
              endContent={<FiLock className='h-6 w-6 text-default-400 self-center' />}
            />
            <Button
              type='submit'
              color='primary'
              className='w-full mt-8'
              size='lg'
              isDisabled={loading}
            >
              Update Password
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
