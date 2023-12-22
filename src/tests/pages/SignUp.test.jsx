import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithAuthContext } from '../helpers';
import SignUpPage from '../../pages/SignUp';

describe('SignUpPage Component', () => {
  const mockSignUp = jest.fn();

  const setup = () => {
    renderWithAuthContext(<SignUpPage />, { authProviderProps: { register: mockSignUp } });
    const firstNameInput = screen.getByTestId('firstName');
    const lastNameInput = screen.getByTestId('lastName');
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const confirmPasswordInput = screen.getByTestId('confirmPassword');
    const submitButton = screen.getByTestId('signup-button');
    return {
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton
    };
  };

  it('should display inputs for first name, last name, email, password, and confirm password along with the submit button', () => {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton
    } = setup();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('allows typing in all input fields', () => {
    const { firstNameInput, lastNameInput, emailInput, passwordInput, confirmPasswordInput } =
      setup();

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(confirmPasswordInput.value).toBe('password123');
  });

  it('submits the form with all fields filled out', async () => {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton
    } = setup();

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(mockSignUp).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      })
    );
  });

  // Add additional tests for form validation feedback, loading state, etc., as needed.
});
