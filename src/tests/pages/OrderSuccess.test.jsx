import { screen } from '@testing-library/react';
import { renderWithContext } from '../helpers';
import OrderSuccessPage from '../../pages/OrderSuccess';

describe('pages/OrderSuccess', () => {
  it('renders the OrderSuccess component', () => {
    renderWithContext(<OrderSuccessPage />);

    // Check that the OrderSuccess component is rendered
    expect(screen.getByText('Thank you for your purchase!')).toBeInTheDocument();
  });
});
