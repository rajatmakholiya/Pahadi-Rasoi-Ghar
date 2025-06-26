"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}


interface MenuContextState {
  items: Item[];
  loading: boolean;
  error: string | null;
}


const MenuContext = createContext<MenuContextState | undefined>(undefined);


export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
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
  }, []); 

  const value = { items, loading, error };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};


export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};