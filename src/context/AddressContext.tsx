"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { IAddress } from '@/models/User';

interface AddressContextState {
  addresses: IAddress[];
  loading: boolean;
  error: string | null;
  fetchAddresses: () => Promise<void>;
  addAddress: (address: Omit<IAddress, '_id'>) => Promise<boolean>;
  updateAddress: (id: string, newAddress: Partial<IAddress>) => Promise<boolean>;
  deleteAddress: (id: string) => Promise<boolean>;
}

const AddressContext = createContext<AddressContextState | undefined>(undefined);

export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // This helper function is now correctly defined in the provider's scope
  const getUserEmail = () => {
    return typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
  };

  const fetchAddresses = useCallback(async () => {
    setLoading(true);
    setError(null);
    const userEmail = getUserEmail();
    if (!userEmail) {
        setAddresses([]);
        setLoading(false);
        return;
    }
    try {
      const res = await fetch('/api/addresses', {
        headers: { 'Authorization': `Bearer ${userEmail}` },
      });
      if (!res.ok) throw new Error('Failed to fetch addresses.');
      const data = await res.json();
      if (data.success) {
        setAddresses(data.data);
      } else {
        throw new Error(data.error || 'Could not retrieve addresses.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const addAddress = async (address: Omit<IAddress, '_id'>): Promise<boolean> => {
    console.log("[AddressContext] Attempting to add address:", address);
    setLoading(true);
    setError(null);
    try {
      const userEmail = getUserEmail(); // This will now work
      if (!userEmail) {
        console.error("[AddressContext] Failed: User not logged in.");
        throw new Error('User not logged in.');
      }

      console.log("[AddressContext] Making API call to POST /api/addresses...");
      const res = await fetch('/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userEmail}`,
        },
        body: JSON.stringify(address),
      });

      console.log("[AddressContext] API call finished with status:", res.status);
      const data = await res.json();
      if (res.ok && data.success) {
        console.log("[AddressContext] Success, updating addresses.");
        setAddresses(data.data);
        return true;
      } else {
        throw new Error(data.error || 'Could not add address.');
      }
    } catch (err) {
      console.error("[AddressContext] addAddress function failed:", err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (id: string, newAddress: Partial<IAddress>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
        const userEmail = getUserEmail();
        if (!userEmail) {
            throw new Error('User not logged in.');
        }

        const res = await fetch(`/api/addresses/${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userEmail}`,
            },
            body: JSON.stringify(newAddress),
        });
        const data = await res.json();
        if (res.ok && data.success) {
            setAddresses(data.data);
            return true;
        } else {
            throw new Error(data.error || 'Could not update address.');
        }
    } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        return false;
    } finally {
        setLoading(false);
    }
  };

  const deleteAddress = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
        const userEmail = getUserEmail();
        if (!userEmail) {
            throw new Error('User not logged in.');
        }
        const res = await fetch(`/api/addresses/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${userEmail}` },
        });
        const data = await res.json();
        if (res.ok && data.success) {
            setAddresses(data.data);
            return true;
        } else {
            throw new Error(data.error || 'Could not delete address.');
        }
    } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        return false;
    } finally {
        setLoading(false);
    }
  };

  const value = { addresses, loading, error, fetchAddresses, addAddress, updateAddress, deleteAddress };

  return (
    <AddressContext.Provider value={value}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};