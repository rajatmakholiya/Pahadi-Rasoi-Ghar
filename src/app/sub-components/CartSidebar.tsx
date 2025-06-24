// src/app/sub-components/CartSidebar.tsx
"use client";

import React from 'react';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cartItems, increaseQuantity, decreaseQuantity } = useCart();

  const calculateItemTotalPrice = (item: any) => {
    // Ensure item.price is treated as a number
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace('₹', '')) : item.price;
    return (price * item.quantity).toFixed(2);
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'string' ? parseFloat(item.price.replace('₹', '')) : item.price;
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-100 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Your Cart ({cartItems.length})</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 mt-20">
            <ShoppingCart className="h-16 w-16 mb-4" />
            <p className="text-lg">Your cart is empty.</p>
            <p className="text-sm">Add some delicious food!</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => ( 
              <li key={item._id} className="flex items-center space-x-4 p-2 bg-gray-50 rounded-md">
               
                <div className="flex-1">
                  <h3 className="text-md font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">Price: ₹{(typeof item.price === 'string' ? parseFloat(item.price.replace('₹', '')) : item.price).toFixed(2)}</p>
                  <div className="flex items-center mt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => decreaseQuantity(item._id)}
                      className="h-7 w-7 p-0 mr-1"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-md font-semibold text-gray-800 mx-2">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => increaseQuantity(item._id)}
                      className="h-7 w-7 p-0 ml-1"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-md font-semibold text-gray-900">
                  ₹{calculateItemTotalPrice(item)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
 
      <div className="p-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-900">Total:</span>
          <span className="text-lg font-bold text-[#ff5757]">₹{calculateCartTotal()}</span>
        </div>
        <Button
          className="w-full bg-[#ff5757] text-white py-2 rounded-md hover:bg-[#e64a4a] transition-colors duration-300"
          disabled={cartItems.length === 0}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default CartSidebar;