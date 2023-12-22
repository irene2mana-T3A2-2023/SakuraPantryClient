import { render, screen, act } from '@testing-library/react';
import Carousel from '../../components/Carousel';

const mockItems = [
  { imageUrl: 'url1.jpg', title: 'Item 1' },
  { imageUrl: 'url2.jpg', title: 'Item 2' },
  { imageUrl: 'url3.jpg', title: 'Item 3' }
];

describe('Carousel Component', () => {
  it('renders the first image on initial load', () => {
    render(<Carousel items={mockItems} />);
    const firstImage = screen.getByAltText('Item 1');
    expect(firstImage).toBeInTheDocument();
    expect(firstImage).toHaveAttribute('src', 'url1.jpg');
  });

  it('cycles to the next image after a delay', () => {
    jest.useFakeTimers();
    render(<Carousel items={mockItems} />);

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Expect the next image to be displayed
    const secondImage = screen.getByAltText('Item 2');
    expect(secondImage).toBeInTheDocument();

    jest.useRealTimers();
  });
});
