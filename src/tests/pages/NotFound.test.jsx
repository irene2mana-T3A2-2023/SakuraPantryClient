import { screen } from '@testing-library/react';
import { renderWithContext } from '../helpers';
import NotFoundPage from '../../pages/NotFound';

describe('pages/NotFound', () => {
  it('should display the 404 error message and a link to the home page', () => {
    renderWithContext(<NotFoundPage />);

    // Check for 404 error message
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/This page does not exist/i)).toBeInTheDocument();
    expect(
      screen.getByText(/The page you are looking for could not be found/i)
    ).toBeInTheDocument();

    // Check for the Back to home button
    const homeButton = screen.getByTestId('back-home-button');

    expect(homeButton).toBeInTheDocument();
  });
});
