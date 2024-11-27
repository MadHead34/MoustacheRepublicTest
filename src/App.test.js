import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Navbar and ProductDetails components', () => {
  render(<App />);
  expect(screen.getByText(/My Store/i)).toBeInTheDocument();
  expect(screen.getByText(/Loading product details/i)).toBeInTheDocument();
});