"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import DarkModeLogo from "../../assets/darkmode_logo.png";
import LightModeLogo from "../../assets/lightmode_logo.png";
import { Moon, ShoppingCart, Sun } from 'lucide-react';

interface HeadNavProps {
  darkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
}

const HeadNav: React.FC<HeadNavProps> = ({ darkTheme, setDarkTheme }) => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    // The background color now uses the dark: variant to match the layout
    <header className="flex flex-row items-center justify-between w-full px-20 py-2 transition-colors duration-300 ease-in-out">
      {darkTheme ? (
        <Image
          src={DarkModeLogo}
          alt="PRG Logo Dark"
          className="w-32 h-15 sm:w-32 sm:h-18"
          width={200}
          height={200}
          priority
        />
      ) : (
        <Image
          src={LightModeLogo}
          alt="PRG Logo Light"
          className="w-32 h-15 sm:w-32 sm:h-18"
          width={200}
          height={200}
          priority
        />
      )}

      {/* Text color also uses the dark: variant now for consistency */}
      <div className="flex flex-row items-center justify-center gap-15 w-full px-6 py-3 text-gray-800 dark:text-white">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <div className="flex items-center space-x-4 sm:space-x-5">
        <ShoppingCart
          className="h-6 w-6 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
        />
        {darkTheme ? (
          <Sun
            className="cursor-pointer h-6 w-6 text-white hover:text-yellow-300"
            onClick={() => setDarkTheme(false)}
          />
        ) : (
          <Moon
            className="cursor-pointer h-6 w-6 text-white hover:text-gray-200"
            onClick={() => setDarkTheme(true)}
          />
        )}
        
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
    </header>
  );
}

export default HeadNav;