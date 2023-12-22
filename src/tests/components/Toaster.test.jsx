import { render, screen } from '@testing-library/react';
import Toaster from '../../components/Toaster';

jest.mock('react-hot-toast', () => ({
  Toaster: () => <div>Mocked Toaster</div>
}));

describe('Toaster Component', () => {
  it('renders the Toaster component', () => {
    render(<Toaster />);
    expect(screen.getByText('Mocked Toaster')).toBeInTheDocument();
  });
});
