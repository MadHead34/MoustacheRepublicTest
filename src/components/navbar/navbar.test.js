import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './navbar';
import MiniCart from '../minicart/minicart';

const mockCart = [
  { id: 1, size: 'M', quantity: 2, price: 50.0, imageURL: 'test-image.jpg' },
];

test('renders Navbar with cart count', () => {
  render(<Navbar cart={mockCart} />);
  expect(screen.getByText(/My Cart \(2\)/i)).toBeInTheDocument();
});

test('toggles MiniCart on button click', () => {
  render(<Navbar cart={mockCart} />);
  const cartButton = screen.getByText(/My Cart \(2\)/i);
  fireEvent.click(cartButton);
  expect(screen.getByText(/My Cart/i)).toBeInTheDocument(); // MiniCart should render
});