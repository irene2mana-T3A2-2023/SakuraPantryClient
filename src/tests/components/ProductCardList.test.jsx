import { screen } from '@testing-library/react';
import ProductCardList from '../../components/ProductCardList';
import mockProducts from '../mocks/products';
import { renderWithContext } from '../helpers';

describe('components/ProductCardList', () => {
  it('renders product cards when not loading', () => {
    renderWithContext(<ProductCardList products={mockProducts} isLoading={false} />);

    mockProducts.forEach((product) => {
      expect(screen.getByText(`${product.name}`)).toBeInTheDocument();
    });
  });

  it('renders a title when provided', () => {
    const title = 'Sample Title';

    renderWithContext(<ProductCardList title={title} isLoading={false} products={[]} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('does not render a title when not provided', () => {
    renderWithContext(<ProductCardList isLoading={false} products={[]} />);

    expect(screen.queryByText('Sample Title')).not.toBeInTheDocument();
  });

  it('renders the correct number of skeletons when loading', () => {
    const skeletonNo = 3;

    renderWithContext(<ProductCardList isLoading={true} skeletonNo={skeletonNo} products={[]} />);

    const skeletons = screen.getAllByTestId('skeleton');

    expect(skeletons).toHaveLength(skeletonNo);
  });

  it('applies flex overflow-x-auto classes when isHorizontalViewInMobile is true', () => {
    renderWithContext(
      <ProductCardList isHorizontalViewInMobile={true} isLoading={false} products={[]} />
    );

    const container = screen.getByTestId('product-list-container');

    expect(container).toHaveClass('flex overflow-x-auto');
  });

  it('applies grid class when isHorizontalViewInMobile is false', () => {
    renderWithContext(
      <ProductCardList isHorizontalViewInMobile={false} isLoading={false} products={[]} />
    );

    const container = screen.getByTestId('product-list-container');

    expect(container).toHaveClass('grid');
  });
});
