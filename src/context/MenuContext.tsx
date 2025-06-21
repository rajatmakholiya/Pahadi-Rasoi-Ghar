"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of a menu item
interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Define the shape of the context state
interface MenuContextState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

// Create the context with a default undefined value
const MenuContext = createContext<MenuContextState | undefined>(undefined);

// Create the provider component
export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This effect runs only once to fetch the data for the entire app
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/items');
        if (!res.ok) throw new Error('Failed to fetch menu items.');
        
        const data = await res.json();
        if (data.success) {
          setItems(data.data);
        } else {
          throw new Error(data.error || 'Could not retrieve items.');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []); // Empty dependency array ensures this runs only once

  const value = { items, loading, error };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};