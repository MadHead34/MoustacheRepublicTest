import React from "react";

const MiniCart = ({ cart }) => {
  return (
    <div className="mini-cart">
      <h2>My Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <img src={item.imageURL} alt={item.size} loading="lazy" />
              <div>
                <p>Size: {item.size}</p>
                <p>
                  {item.quantity} x ${item.price.toFixed(2)}
                </p>
                <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default MiniCart;