import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer Component', () => {
  it('renders the ABOUT US section with description', () => {
    render(<Footer />);
    expect(screen.getByText('ABOUT US')).toBeInTheDocument();
    expect(screen.getByText(/Sakura Pantry is dedicated to delivering/i)).toBeInTheDocument();
  });

  it('renders the CONTACT US section with inputs', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Your name')).toBeInTheDocument();
    expect(screen.getByLabelText('Your email')).toBeInTheDocument();
    expect(screen.getByLabelText('Questions')).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://www.facebook.com/');
    expect(links[1]).toHaveAttribute('href', 'https://www.instagram.com/');
  });

  it('renders a send button', () => {
    render(<Footer />);
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });
});
