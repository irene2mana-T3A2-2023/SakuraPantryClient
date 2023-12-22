import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithContext } from '../helpers';
import SignInPage from '../../pages/SignIn';

describe('components/SignIn', () => {
  const mockLogin = jest.fn();
  const setup = () => {
    renderWithContext(<SignInPage />, { authProviderProps: { login: mockLogin } });
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByTestId('signin-button');
    const rememberMeCheckbox = screen.queryByTestId('rememberMe');
    return { emailInput, passwordInput, submitButton, rememberMeCheckbox };
  };

  it('should display email, password inputs, and the submit button', () => {
    const { emailInput, passwordInput, submitButton, rememberMeCheckbox } = setup();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(rememberMeCheckbox).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should allow the user to enter email and password', () => {
    const { emailInput, passwordInput } = setup();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('should call the login function with email and password on form submission', async () => {
    const { emailInput, passwordInput, submitButton } = setup();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false
      })
    );
  });

  it('should include the remember me option in the login function when selected', async () => {
    const { emailInput, passwordInput, submitButton, rememberMeCheckbox } = setup();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    if (rememberMeCheckbox) {
      fireEvent.click(rememberMeCheckbox);
    }

    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: true
      })
    );
  });
});
