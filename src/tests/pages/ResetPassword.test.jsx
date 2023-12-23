import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithContext } from '../helpers';
import ResetPasswordPage from '../../pages/ResetPassword';

describe.only('pages/ResetPassword', () => {
  const mockResetPassword = jest.fn();

  const setup = () => {
    renderWithContext(<ResetPasswordPage />, {
      Page: ResetPasswordPage,
      authProviderProps: { resetPassword: mockResetPassword },
      path: '/reset-password/:resetToken',
      initialEntries: ['/reset-password/abc123']
    });
    const newPasswordInput = screen.getByTestId('newPassword');
    const confirmNewPasswordInput = screen.getByTestId('confirmNewPassword');
    const submitButton = screen.getByTestId('submit-button');
    return { newPasswordInput, confirmNewPasswordInput, submitButton };
  };

  it('should display inputs for new password and confirm new password along with the submit button', () => {
    const { newPasswordInput, confirmNewPasswordInput, submitButton } = setup();
    expect(newPasswordInput).toBeInTheDocument();
    expect(confirmNewPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('allows typing in the new password and confirm new password inputs', () => {
    const { newPasswordInput, confirmNewPasswordInput } = setup();

    fireEvent.change(newPasswordInput, { target: { value: 'NewPassword123' } });
    fireEvent.change(confirmNewPasswordInput, { target: { value: 'NewPassword123' } });

    expect(newPasswordInput.value).toBe('NewPassword123');
    expect(confirmNewPasswordInput.value).toBe('NewPassword123');
  });

  it('submits the form with new password and confirm new password', async () => {
    const { newPasswordInput, confirmNewPasswordInput, submitButton } = setup();

    fireEvent.change(newPasswordInput, { target: { value: 'NewPassword123' } });
    fireEvent.change(confirmNewPasswordInput, { target: { value: 'NewPassword123' } });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(mockResetPassword).toHaveBeenCalledWith({
        resetToken: 'abc123',
        newPassword: 'NewPassword123',
        confirmNewPassword: 'NewPassword123'
      })
    );
  });
});
