import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductDetails = ({ cart, setCart }) => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");
  const [toggleState, setToggleState] = useState({}); 
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const cachedProduct = localStorage.getItem("productData");
        const cacheTime = localStorage.getItem("cacheTime");

        // Cache validity: 1 hour
        if (cachedProduct && cacheTime && Date.now() - cacheTime < 3600000) {
          setProduct(JSON.parse(cachedProduct));
        } else {
          const response = await axios.get(
            "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product"
          );
          setProduct(response.data);
          localStorage.setItem("productData", JSON.stringify(response.data));
          localStorage.setItem("cacheTime", Date.now());
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setApiError("Failed to load product details. Please try again later.");
      }
    };

    fetchProduct();
  }, []);

  const toggleSize = (sizeLabel) => {
    setSelectedSize((prev) => (prev === sizeLabel ? "" : sizeLabel)); // Toggle size selection
    setToggleState((prev) => ({
      ...prev,
      [sizeLabel]: !prev[sizeLabel], // Toggle the state for the specific size button
    }));
    setError(""); // Clear any error when a size is clicked
  };

  const addToCart = () => {
    if (!selectedSize) {
      setError("Please select a size.");
      return;
    }
    setError("");

    const existingItem = cart.find(
      (item) => item.id === product.id && item.size === selectedSize
    );

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id && item.size === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        { id: product.id, size: selectedSize, quantity: 1, price: product.price, imageURL: product.imageURL, },
      ]);
    }

    setSuccessMessage("Item added to cart!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="product-details">
      {apiError ? (
      <p className="error">{apiError}</p>
    ) : product ? (
        <>
          <div className="product-details-image">
            <img src={product.imageURL} alt={product.title} loading="lazy" />
          </div>
          <div className="product-details-content">
            <h1>{product.title}</h1>
            <p>${product.price}</p>
            <p>{product.description}</p>

            <div className="size-label">
              SIZE<span className="required">*</span>
              {selectedSize && (
                <span className="selected-size">{selectedSize}</span>
              )}
            </div>

            <div className="sizes">
              {product.sizeOptions.map((size) => (
                <button
                  key={size.id}
                  onClick={() => toggleSize(size.label)}
                  className={toggleState[size.label] ? "selected" : ""}
                >
                  {size.label}
                </button>
              ))}
            </div>

            <button onClick={addToCart} disabled={!selectedSize}>
              Add to Cart
            </button>
            {successMessage && <p className="success">{successMessage}</p>}
            {error && <p className="error">{error}</p>}
          </div>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
       
    </div>
  );
};

export default ProductDetails;