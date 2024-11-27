import React from 'react';
import { render, screen } from '@testing-library/react';
import MiniCart from './minicart';

test('displays cart items', () => {
  const mockCart = [
    { id: 1, size: 'L', quantity: 1, price: 100.0, imageURL: 'test-image.jpg' },
  ];
  render(<MiniCart cart={mockCart} />);
  expect(screen.getByText(/Size: L/i)).toBeInTheDocument();
  expect(screen.getByText(/1 x \$100.00/i)).toBeInTheDocument();
  expect(screen.getByText(/Total: \$100.00/i)).toBeInTheDocument();
});

test('shows empty cart message', () => {
  render(<MiniCart cart={[]} />);
  expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
});