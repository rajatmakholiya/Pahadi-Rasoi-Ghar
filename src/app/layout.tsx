"use client";
import React, { useState } from "react";
import { Inter, Playfair_Display, Lora } from "next/font/google"; // Import Lora
import { usePathname } from "next/navigation";
import "./globals.css";
import HeadNav from "./sub-components/HeadNav";
import { MenuProvider } from "../context/MenuContext"; 

const inter = Inter({ subsets: ["latin"] });

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify weights you want to use
  variable: "--font-playfair-display", // Ensure it's set up as a CSS variable
});

const lora = Lora({ // Instantiate Lora
  subsets: ["latin"],
  weight: ["400", "700"], // Specify weights you want to use
  variable: "--font-lora", // Define as CSS variable
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkTheme, setDarkTheme] = useState(false);
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <html lang="en">
      {/* Add Lora's variable to the body class */}
      <body className={`${inter.className} ${playfairDisplay.variable} ${lora.variable}`}>
        <MenuProvider>
          <div className={darkTheme ? "dark" : ""}>
          {isLoginPage ? (
            <main>{children}</main>
          ) : (
            <div className="grid grid-rows-[auto_1fr] h-screen bg-[#f6c448] dark:bg-[#1f1e1e]">
              <header className="text-gray-900 dark:text-gray-100 transition-colors duration-300 ease-in-out bg-[#f6c448]">
                <HeadNav darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
              </header>
              <div className="overflow-y-auto  text-gray-900 dark:text-gray-100 transition-colors duration-300 ease-in-out">
                <main>{children}</main>
              </div>
            </div>
          )}
        </div>
        </MenuProvider>
        
      </body>
    </html>
  );
}