"use client";
import React from "react";
import { Inter, Playfair_Display, Lora } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import HeadNav from "./sub-components/HeadNav";
import { MenuProvider } from "../context/MenuContext";
import { CartProvider } from "@/context/CartContext";
import { AddressProvider } from "@/context/AddressContext";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair-display",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lora",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body className={`${inter.className} ${playfairDisplay.variable} ${lora.variable}`}>
        <MenuProvider>
          <CartProvider>
            <AddressProvider>
              <div>
              {isLoginPage ? (
                <main>{children}</main>
              ) : (
                <div className="grid grid-rows-[auto_1fr] bg-[#f6c448]">
                  <header className="text-gray-900 transition-colors duration-300 ease-in-out bg-[#f6c448]">
                    <HeadNav />
                  </header>
                  <div className=" text-gray-900 transition-colors duration-300 ease-in-out">
                    <main>{children}</main>
                  </div>
                    <footer className="w-full bg-gray-100 py-4 text-center text-gray-600 text-sm border-t border-gray-200 transition-colors duration-300 ease-in-out">
                    <p>&copy; {currentYear} Pahadi Rasoi Ghar. All rights reserved. Designed by Rajat Makholiya.</p>
                  </footer>
                </div>
              )}
            </div>
            </AddressProvider>
          </CartProvider>
        </MenuProvider>
        <Toaster />
      </body>
    </html>
  );
}