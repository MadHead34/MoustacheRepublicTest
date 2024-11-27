import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ProductDetails from './productdetail';

jest.mock('axios');

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 25.99,
  description: 'Test Description',
  imageURL: 'test-image.jpg',
  sizeOptions: [
    { id: 1, label: 'S' },
    { id: 2, label: 'M' },
  ],
};

test('fetches and displays product details', async () => {
  axios.get.mockResolvedValue({ data: mockProduct });
  render(<ProductDetails cart={[]} setCart={jest.fn()} />);
  expect(screen.getByText(/Loading product details/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText(/\$25.99/i)).toBeInTheDocument();
  });
});

test('shows error if no size is selected on Add to Cart', async () => {
  axios.get.mockResolvedValue({ data: mockProduct });
  const mockSetCart = jest.fn();
  render(<ProductDetails cart={[]} setCart={mockSetCart} />);

  await waitFor(() => screen.getByText('Test Product'));
  fireEvent.click(screen.getByText(/Add to Cart/i));
  expect(screen.getByText(/Please select a size/i)).toBeInTheDocument();
});

test('adds selected product to the cart', async () => {
  axios.get.mockResolvedValue({ data: mockProduct });
  const mockSetCart = jest.fn();
  render(<ProductDetails cart={[]} setCart={mockSetCart} />);

  await waitFor(() => screen.getByText('Test Product'));

  fireEvent.click(screen.getByText('S'));
  fireEvent.click(screen.getByText(/Add to Cart/i));

  expect(mockSetCart).toHaveBeenCalledWith([
    expect.objectContaining({
      id: 1,
      size: 'S',
      quantity: 1,
      price: 25.99,
    }),
  ]);
});