import { createContext, useState, useEffect } from 'react';

const dummyCartItems = [
  {
    id: 1,
    image:
      'https://image.dokodemo.world/catalog-skus/9032237/8665ac97785ade2d5e8de6341621e2fd.jpg?d=450x0',
    name: 'Sukiyaki Sauce ',
    price: 10.99,
    quantity: 2
  },
  {
    id: 2,
    image:
      'https://image.dokodemo.world/catalog-skus/1508989/fb207367efcf8fbdbb7c58c5596d7767.jpg?d=450x0',
    name: 'Dashi Stock Powder',
    price: 20.99,
    quantity: 1
  },
  {
    id: 3,
    image:
      'https://image.dokodemo.world/catalog-skus/1508989/fb207367efcf8fbdbb7c58c5596d7767.jpg?d=450x0',
    name: 'Calbee Potato Chips',
    price: 20.99,
    quantity: 3
  }
];

// Create a new context for the shopping cart
export const CartContext = createContext();

// Create a provider component that will wrap the application and provide cart functionality
export const CartProvider = ({ children }) => {
  // State to manage the cart items
  const [cartItems, setCartItems] = useState(
    // Check if cart items exist in localStorage
    localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : dummyCartItems // replace dummyCartItems with empty array when there're actual data
  );

  // Function to add one item to cart
  const addToCart = (item) => {
    // Check if the item is already in cart
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      setCartItems(
        // If the item is already in the cart, increase the quantity of the item
        // Otherwise, return the cart item
        cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      // If the item is not in the cart, add the item to the cart
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Function to minus one item from cart
  const minusFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    // If the quantity of the item is 1, remove the item from the cart
    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      // If the quantity of the item is greater than 1, decrease the quantity of the item
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
      );
    }
  };

  // Function to remove the item from cart
  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
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
        getCartTotalQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
