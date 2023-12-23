import { render, screen } from '@testing-library/react';
import Toaster from '../../components/Toaster';

jest.mock('react-hot-toast', () => ({
  Toaster: () => <div>Mocked Toaster</div>
}));

describe('components/Toaster', () => {
  it('renders the Toaster component', () => {
    render(<Toaster />);

    expect(screen.getByText('Mocked Toaster')).toBeInTheDocument();
  });
});
