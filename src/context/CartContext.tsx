// src/context/CartContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of an item in the cart
interface CartItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

// Define the shape of the Cart Context state
interface CartContextState {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  increaseQuantity: (_id: string) => void;
  decreaseQuantity: (_id: string) => void;
  getQuantity: (_id: string) => number;
}

// Create the context
const CartContext = createContext<CartContextState | undefined>(undefined);

// Create the provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      // Optionally clear corrupted data
      localStorage.removeItem('cartItems');
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map((cartItem) =>
          cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (_id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (_id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === _id
          ? { ...item, quantity: Math.max(0, item.quantity - 1) } // Ensure quantity doesn't go below 0
          : item
      ).filter(item => item.quantity > 0) // Remove item if quantity becomes 0
    );
  };

  const getQuantity = (_id: string) => {
    const item = cartItems.find((cartItem) => cartItem._id === _id);
    return item ? item.quantity : 0;
  };

  const value = { cartItems, addToCart, increaseQuantity, decreaseQuantity, getQuantity };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};