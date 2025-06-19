"use client"
import React, { useState } from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import HeadNav from './sub-components/HeadNav';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={darkTheme ? "dark" : ""}>
          {/* Added transition classes to this div */}
          <div className="bg-[#ebe6e6] dark:bg-[#1f1e1e] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 ease-in-out">
            <HeadNav darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}