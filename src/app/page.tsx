"use client";

import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import HomeImage from "../assets/homeImage.png"; 
import Link from "next/link";
import ItemCard from "./sub-components/ItemCard";
import { useMenu } from "../context/MenuContext";

// interface Item {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
// }

function Home() {
  // const [items, setItems] = useState<Item[]>([]);
  // const [loading, setLoading] = useState(true);

   const { items, loading } = useMenu();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/items');
        const data = await res.json();
        if (data.success) {
          setItems(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Pahadi Rasoi Ghar</title>
        <meta name="description" content="Welcome to Pahadi Rasoi Ghar" />
      </Head>
<div className=" dark:bg-[#1f1e1e] min-h-screen">
   <div className="relative bg-gradient-to-b from-[#f6c448] via-[#f6ab48] to-[#fc7060]">
        <div className="flex flex-row items-center justify-between px-25 gap-10 pb-25 ">
          <div className="flex flex-col items-center gap-10">
            <h1 className="text-5xl font-bold font-sans text-center">
              Experience the authentic taste of the mountains with our traditional
              Pahadi cuisine.
            </h1>
            <div className="flex flex-row justify-between items-center gap-15">
              <Link
                href="/menu"
                className="text-md font-medium px-10 py-2 rounded-md shadow-sm ease-in-out bg-[#ff5757] text-white hover:bg-[#e64a4a] transition-colors duration-150"
              >
                Menu
              </Link>
              <Link
                href="/"
                className="text-md font-medium px-10 py-2 rounded-md shadow-sm ease-in-out bg-amber-50 dark:text-black transition-colors duration-150"
              >
                Reviews
              </Link>
            </div>
          </div>
          <Image
            src={HomeImage}
            alt="Pahadi Rasoi Ghar"
            className="max-w-130 max-h-130"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" style={{ transform: 'translateY(1px)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)]]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31.74,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-current text-white dark:text-[#1f1e1e]"></path>
          </svg>
        </div>
      </div>

      <div className="px-25 bg-white dark:bg-[#1f1e1e] pb-5">
        <h2 className="text-3xl font-bold text-center mb-10">Our Specials</h2>
        {loading ? (
          <p className="text-center">Loading items...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {items.slice(0, 4).map((item) => (
              <ItemCard
                key={item._id}
                title={item.name}
                description={item.description}
                price={`₹${item.price}`}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        )}
      </div>
</div>
      {/* This relative container allows us to position the wave SVG correctly. */}
     
    </Fragment>
  );
}

export default Home;