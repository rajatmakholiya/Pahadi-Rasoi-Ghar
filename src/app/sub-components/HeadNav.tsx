"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import LightModeLogo from "../../assets/darkmode_logo.png";
import { ShoppingCart, Menu, X } from 'lucide-react';
import CartSidebar from './CartSidebar';
import { useCart } from '@/context/CartContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AddressesModal from './AddressesModal';

const HeadNav: React.FC = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <header className="flex flex-row items-center justify-between w-full px-6 sm:px-8 md:px-12 lg:px-20 py-2 transition-colors duration-300 ease-in-out">
      <Link href="/">
        <Image
          src={LightModeLogo}
          alt="PRG Logo"
          className="w-24 sm:w-32 h-auto"
          width={200}
          height={200}
          priority
        />
      </Link>

      <nav className="hidden md:flex flex-row items-center justify-center gap-8 lg:gap-15 w-full text-gray-800">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact</Link>
      </nav>

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
            className={`hidden sm:block px-4 py-2 rounded-md font-semibold text-sm shadow-sm transition-colors duration-150 ease-in-out bg-[#ff5757] text-white whitespace-nowrap hover:bg-[#e64a4a] active:bg-[#cc3f3f]`}
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        )}

        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className={`absolute top-16 w-[90vw] h[100vh] text-white backdrop-opacity-60 md:hidden z-50 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none overflow-hidden'}`}>
        <nav className="flex flex-col items-center gap-4 p-4">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/menu" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          {!userEmail && (
            <button
              className={`px-4 py-2 rounded-md font-semibold text-sm shadow-sm transition-colors duration-150 ease-in-out bg-[#ff5757] text-white whitespace-nowrap hover:bg-[#e64a4a] active:bg-[#cc3f3f]`}
              onClick={() => {
                handleSignInClick();
                setIsMobileMenuOpen(false);
              }}
            >
              Sign In
            </button>
          )}
        </nav>
      </div>

      <CartSidebar isOpen={isCartSidebarOpen} onClose={() => setIsCartSidebarOpen(false)} />

      <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Manage Your Addresses</DialogTitle>
          </DialogHeader>
          <AddressesModal onClose={() => setIsAddressModalOpen(false)} />
        </DialogContent>
      </Dialog>

      {(isCartSidebarOpen || isAddressModalOpen || isMobileMenuOpen) && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-lg z-40"
          onClick={() => {
            setIsCartSidebarOpen(false);
            setIsAddressModalOpen(false);
            setIsMobileMenuOpen(false);
          }}
        ></div>
      )}
    </header>
  );
}

export default HeadNav;