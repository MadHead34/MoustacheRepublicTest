import React, { useState } from "react";
import "./navbar.css";
import MiniCart from "../minicart/minicart";

const Navbar = ({ cart }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">My Store</h1>
      <button className="cart-button" onClick={toggleCart}>
        My Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
      </button>
      {isCartOpen && <MiniCart cart={cart} />} {/* Show MiniCart */}
    </nav>
  );
};

export default Navbar;