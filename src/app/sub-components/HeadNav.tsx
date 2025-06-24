// src/app/sub-components/HeadNav.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import LightModeLogo from "../../assets/darkmode_logo.png";
import { ShoppingCart } from 'lucide-react';
import CartSidebar from './CartSidebar';
import { useCart } from '@/context/CartContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AddressesModal from './AddressesModal';

const HeadNav: React.FC = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false); // State for the address modal
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { cartItems } = useCart();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUserEmail(null);
    setIsDropdownOpen(false);
  };

  const handleSignInClick = () => {
    router.push('/login');
  };

  const totalUniqueItems = cartItems.length;

  return (
    <header className="flex flex-row items-center justify-between w-full px-20 py-2 transition-colors duration-300 ease-in-out">
      <Image
        src={LightModeLogo}
        alt="PRG Logo"
        className="w-32 h-15 sm:w-32 sm:h-18"
        width={200}
        height={200}
        priority
      />

      <div className="flex flex-row items-center justify-center gap-15 w-full px-6 py-3 text-gray-800">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <div className="flex items-center space-x-4 sm:space-x-5">
        <div className="relative">
          <ShoppingCart
            className="h-6 w-6 cursor-pointer text-gray-700 hover:text-black"
            onClick={() => setIsCartSidebarOpen(true)}
          />
          {totalUniqueItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#ff5757] text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {totalUniqueItems}
            </span>
          )}
        </div>

        {userEmail ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5757]"
            >
              {userEmail.charAt(0).toUpperCase()}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl z-20 py-1 border">
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="text-sm font-medium text-gray-800 truncate">{userEmail}</p>
                </div>
                <div className="border-t border-gray-200"></div>
                <button
                  onClick={() => { setIsAddressModalOpen(true); setIsDropdownOpen(false); }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Addresses
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className={`px-4 py-2 rounded-md font-semibold text-sm shadow-sm transition-colors duration-150 ease-in-out bg-[#ff5757] text-white whitespace-nowrap hover:bg-[#e64a4a] active:bg-[#cc3f3f]`}
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        )}
      </div>

      {/* Cart Sidebar Component */}
      <CartSidebar isOpen={isCartSidebarOpen} onClose={() => setIsCartSidebarOpen(false)} />

      {/* Address Modal */}
      <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Manage Your Addresses</DialogTitle>
          </DialogHeader>
          <AddressesModal onClose={() => setIsAddressModalOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Overlay for when sidebar/modal is open with blur and glassy effect */}
      {(isCartSidebarOpen || isAddressModalOpen) && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" // Adjust bg-opacity and backdrop-blur as needed
          onClick={() => {
            setIsCartSidebarOpen(false);
            setIsAddressModalOpen(false);
          }}
        ></div>
      )}
    </header>
  );
}

export default HeadNav;