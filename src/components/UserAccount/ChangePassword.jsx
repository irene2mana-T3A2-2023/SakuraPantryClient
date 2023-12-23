import { Input, Button, Card } from '@nextui-org/react';
import Joi from 'joi';
import { FiLock } from 'react-icons/fi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../Auth/useAuth';

// Joi schema definition for form validation for required fields to reset password.
const schema = Joi.object({
  currentPassword: Joi.string().required().messages({
    'string.empty': `Current password cannot be empty`,
    'any.required': `Current password is required`
  }),

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

// CHANGE PASSWORD COMPONENT
export const ChangePassword = () => {
  // Use the useForm hook from React-Hook-Form to manage form data, validation, and submissions.
  const { register, handleSubmit, formState } = useForm({
    // `resolver: joiResolver(schema)` integrates Joi for schema-based form validation.
    resolver: joiResolver(schema)
  });

  const { changePassword, verifyCurrentPassword } = useAuth();

  // useState hook to manage the loading state, initially set to false.
  const [loading, setLoading] = useState(false);

  // Define an asynchronous function to handle form submission.
  const onSubmit = async ({ currentPassword, newPassword, confirmNewPassword }) => {
    setLoading(true);

    try {
      // Check if the current password is correct
      const isCurrentPasswordValid = await verifyCurrentPassword(currentPassword);

      // If not, send an error message
      if (!isCurrentPasswordValid) {
        toast.error('Current password is not valid');
      } else {
        // If the current password is correct, allow users to change password
        await changePassword({ newPassword, confirmNewPassword });
        toast.success('Password successfully updated!');
      }
    } finally {
      // After the reset attempt (whether successful or not), set the loading state back to false.
      setLoading(false);
    }
  };

  // JSX structure for Change password component
  return (
    <div className='container mx-auto flex flex-col items-center justify-center mt-8'>
      <Card className='p-10 shadow-none border-1 w-full lg:w-[60%]'>
        <h1 className='text-3xl mb-2 text-center'>CHANGE MY PASSWORD</h1>
        <span className='text-sm lg:text-base mt-5 mb-10 text-center lg:mx-8 text-gray-500'>
          Enter a new password below to change your password. Password must be least 8 characters
          long and contain letters or numbers only.
        </span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('currentPassword')}
            label='Current Password'
            type='password'
            className='mb-6'
            errorMessage={formState.errors?.currentPassword?.message}
            endContent={<FiLock className='h-6 w-6 text-default-400 self-center' />}
          />
          <Input
            {...register('newPassword')}
            label='New Password'
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
            Change Password
          </Button>
        </form>
      </Card>
    </div>
  );
};
