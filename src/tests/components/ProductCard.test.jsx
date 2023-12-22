import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';

describe('components/ProductCard', () => {
  it('renders product details', () => {
    const mockProduct = {
      slug: 'miso-paste',
      imageUrl: 'image-url.jpg',
      name: 'Miso Paste',
      category: { name: 'Sauces&Seasonings' },
      price: 9.5
    };

    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );

    expect(screen.getByText('Miso Paste')).toBeInTheDocument();
    expect(screen.getByText('Sauces&Seasonings')).toBeInTheDocument();
    expect(screen.getByText('Price: $9.50')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'image-url.jpg');
  });
});
