import { screen } from '@testing-library/react';
import ProductCard from '../../components/ProductCard';
import { renderWithContext } from '../helpers';
import mockProducts from '../mocks/products';
import { currencyFormatter } from '../../utils';

describe('components/ProductCard', () => {
  it('renders product details', () => {
    renderWithContext(<ProductCard product={mockProducts[0]} />);

    expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockProducts[0].category.name)).toBeInTheDocument();
    expect(
      screen.getByText(`Price: ${currencyFormatter(mockProducts[0].price)}`)
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockProducts[0].imageUrl);
  });
});
