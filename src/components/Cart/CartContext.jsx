import { createContext, useState, useEffect } from 'react';

// Create a new context for the shopping cart
export const CartContext = createContext();

// Create a provider component that will wrap the application and provide cart functionality
export const CartProvider = ({ children }) => {
  // State to manage the cart items
  const [cartItems, setCartItems] = useState(
    // Check if cart items exist in localStorage
    localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
  );

  // Function to add one item to cart
  const addToCart = (item) => {
    // Check if the item is already in cart
    const isItemInCart = cartItems.find((cartItem) => cartItem._id === item._id);

    if (isItemInCart) {
      setCartItems(
        // If the item is already in the cart, increase the quantity of the item
        // Otherwise, return the cart item
        cartItems.map((cartItem) =>
          cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      // If the item is not in the cart, add the item to the cart
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Function to minus one item from cart
  const minusFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem._id === item._id);

    // If the quantity of the item is 1, remove the item from the cart
    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
    } else {
      // If the quantity of the item is greater than 1, decrease the quantity of the item
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
      );
    }
  };

  // Function to remove the item from cart
  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem._id !== item._id);
    setCartItems(updatedCartItems);
  };

  // Function to calculate the total price of the items in the cart
  const getCartTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return totalPrice.toFixed(2);
  };

  // Function to get the total of item quantity in cart
  const getCartTotalQuantity = () => {
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    return totalQuantity;
  };

  // Set the cart items in the local storage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Get the cart items from the local storage
  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        minusFromCart,
        removeFromCart,
        getCartTotalPrice,
        getCartTotalQuantity,
        setCartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
