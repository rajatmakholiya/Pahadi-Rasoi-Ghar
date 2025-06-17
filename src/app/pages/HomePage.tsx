"use client";

import { Moon, ShoppingCart, Sun } from "lucide-react";
import React, { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import DarkModeLogo from "../../assets/darkmode_logo.png";
import LightModeLogo from "../../assets/lightmode_logo.png";
import Image from "next/image";
// import Navbar from "../components/Navbar";
import Link from "next/link";

function HomePage() {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme]);

  return (
    <Fragment>
      {/* Note: In Next.js App Router, metadata (title, description) is typically handled 
          via exported 'metadata' objects in page.tsx or layout.tsx, not with 'next/head'. */}
      <Head>
        <title>Pahadi Rasoi Ghar</title>
        <meta name="description" content="Welcome to Pahadi Rasoi Ghar" />
      </Head>

      <div
        className={`flex flex-col items-center justify-start h-screen w-screen min-h-screen px-15
                      ${
                        darkTheme
                          ? "bg-gray-900 dark:bg-gray-800"
                          : "bg-white dark:bg-gray-100"
                      }
                      transition-colors duration-300 ease-in-out`}
      >
        {/* Header Row */}
        <header className="flex flex-row items-center justify-between w-full px-6 py-3 ">
          {/* Logo */}
          {darkTheme ? (
            <Image
              src={DarkModeLogo}
              alt="PRG Logo Dark"
              className="w-32 h-15 sm:w-32 sm:h-18" // Increased width
              width={200} // Intrinsic width of the logo asset
              height={200} // Intrinsic height of the logo asset
              priority
            />
          ) : (
            <Image
              src={LightModeLogo}
              alt="PRG Logo Light"
              className="w-32 h-15 sm:w-32 sm:h-18" // Increased width
              width={200} // Intrinsic width of the logo asset
              height={200} // Intrinsic height of the logo asset
              priority
            />
          )}

          {/* Navbar (Title) */}
          <div
            className={`flex flex-row items-center justify-center gap-25 w-full px-6 py-3 ${
              darkTheme ? " text-white" : " text-gray-800"
            }`}
          >
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          {/* Icons Group */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            <ShoppingCart
              className={`h-6 w-6 cursor-pointer text-gray-700 ${
                darkTheme ? "dark:text-gray-300" : ""
              } hover:text-black dark:hover:text-white`}
            />
            {/* Theme Toggle */}
            {darkTheme ? (
              <Sun
                className="cursor-pointer h-6 w-6 text-yellow-400 hover:text-yellow-300"
                onClick={() => setDarkTheme(false)}
              />
            ) : (
              <Moon
                className="cursor-pointer h-6 w-6 text-indigo-600 hover:text-indigo-500"
                onClick={() => setDarkTheme(true)}
              />
            )}
            <button
              className={`px-4 py-2 rounded-md font-semibold text-sm shadow-sm transition-colors duration-150 ease-in-out
                       bg-[#ff5757] text-white whitespace-nowrap
                       hover:bg-[#e64a4a] active:bg-[#cc3f3f]
                      `}
            >
              Sign In
            </button>
          </div>
        </header>

        {/* Main Content Area (below header) */}
      </div>
    </Fragment>
  );
}

export default HomePage;
