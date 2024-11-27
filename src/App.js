import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar/navbar';
import ProductDetails from './components/productdetail/productdetail';
import './App.css';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <Navbar cart={cart} />
      <ProductDetails cart={cart} setCart={setCart} />
    </div>
  );
}

export default App;
