import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithContext } from '../helpers';
import ForgotPasswordPage from '../../pages/ForgotPassword';

describe('pages/ForgotPassword', () => {
  const mockForgotPassword = jest.fn();

  const setup = () => {
    renderWithContext(<ForgotPasswordPage />, {
      authProviderProps: { forgotPassword: mockForgotPassword }
    });
    const emailInput = screen.getByTestId('email');
    const submitButton = screen.getByTestId('submit-button');
    return { emailInput, submitButton };
  };

  it('should display the email input and submit button', () => {
    const { emailInput, submitButton } = setup();
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('allows typing in the email input', () => {
    const { emailInput } = setup();
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('submits the form with the email', async () => {
    const { emailInput, submitButton } = setup();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(mockForgotPassword).toHaveBeenCalledWith({ email: 'test@example.com' })
    );
  });
});
