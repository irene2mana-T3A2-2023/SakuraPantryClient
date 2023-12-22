import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCardList from '../../components/ProductCardList';

const mockProducts = [
  {
    name: 'Product 1',
    category: {
      name: 'Miso'
    },
    price: 100
  },
  {
    name: 'Product 2',
    category: {
      name: 'Miso'
    },
    price: 100
  },
  {
    name: 'Product 3',
    category: {
      name: 'Miso'
    },
    price: 100
  }
];

describe('ProductCardList', () => {
  it('renders product cards when not loading', () => {
    render(
      <BrowserRouter>
        <ProductCardList products={mockProducts} isLoading={false} />
      </BrowserRouter>
    );

    mockProducts.forEach((product) => {
      expect(screen.getByText(`${product.name}`)).toBeInTheDocument();
    });
  });

  it('renders a title when provided', () => {
    const title = 'Sample Title';

    render(
      <BrowserRouter>
        <ProductCardList title={title} isLoading={false} products={[]} />
      </BrowserRouter>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('does not render a title when not provided', () => {
    render(
      <BrowserRouter>
        <ProductCardList isLoading={false} products={[]} />
      </BrowserRouter>
    );

    expect(screen.queryByText('Sample Title')).not.toBeInTheDocument();
  });

  it('renders the correct number of skeletons when loading', () => {
    const skeletonNo = 3;

    render(<ProductCardList isLoading={true} skeletonNo={skeletonNo} products={[]} />);

    const skeletons = screen.getAllByTestId('skeleton');

    expect(skeletons).toHaveLength(skeletonNo);
  });

  it('applies flex overflow-x-auto classes when isHorizontalViewInMobile is true', () => {
    render(<ProductCardList isHorizontalViewInMobile={true} isLoading={false} products={[]} />);

    const container = screen.getByTestId('product-list-container');

    expect(container).toHaveClass('flex overflow-x-auto');
  });

  it('applies grid class when isHorizontalViewInMobile is false', () => {
    render(<ProductCardList isHorizontalViewInMobile={false} isLoading={false} products={[]} />);

    const container = screen.getByTestId('product-list-container');

    expect(container).toHaveClass('grid');
  });
});
