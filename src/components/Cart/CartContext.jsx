import { createContext, useState, useEffect } from 'react';

const dummyCartItems = [
  {
    _id: '65801bee8715821d22fe9df3',
    name: 'Soy Sauce',
    image:
      'https://image.dokodemo.world/catalog-skus/1454900/a5e084aa98a809c6c2eed42f9ad2945d.jpg?d=0x0',
    price: 6.1,
    quantity: 2
  },
  {
    _id: '65801bee8715821d22fe9df4',
    name: 'Sukiyaki Sauce',
    image:
      'https://image.dokodemo.world/catalog-skus/9032237/8665ac97785ade2d5e8de6341621e2fd.jpg?d=450x0',
    price: 6.1,
    quantity: 3
  },
  {
    _id: '65801bee8715821d22fe9df5',
    name: 'Dashi Stock Powder',
    image:
      'https://image.dokodemo.world/catalog-skus/1508989/fb207367efcf8fbdbb7c58c5596d7767.jpg?d=450x0',
    price: 22.6,
    quantity: 1
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
