"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface CartItem {
  _id: string;
  name: string;
  description: string;
  price: number | string;
  imageUrl: string;
  quantity: number;
  
}


interface CartContextState {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  increaseQuantity: (_id: string) => void;
  decreaseQuantity: (_id: string) => void;
  getQuantity: (_id: string) => number;
  calculateCartTotal: () => string; 
  clearCart: () => void;
}


const CartContext = createContext<CartContextState | undefined>(undefined);


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      
      localStorage.removeItem('cartItems');
    }
  }, []);

  
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
        
        return prevItems.map((cartItem) =>
          cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        
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
          ? { ...item, quantity: Math.max(0, item.quantity - 1) } 
          : item
      ).filter(item => item.quantity > 0) 
    );
  };

  const getQuantity = (_id: string) => {
    const item = cartItems.find((cartItem) => cartItem._id === _id);
    return item ? item.quantity : 0;
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'string' ? parseFloat(item.price.replace('₹', '')) : item.price as number;
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };
  
  const clearCart = () => {
      setCartItems([]);
  };

  const value = { cartItems, addToCart, increaseQuantity, decreaseQuantity, getQuantity, calculateCartTotal, clearCart };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};