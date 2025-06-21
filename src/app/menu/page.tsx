"use client";

import React from 'react';
import ItemCard from '../sub-components/ItemCard';
import { useMenu } from '../../context/MenuContext';

// Define the shape of a menu item, consistent with your home page
// interface Item {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
// }

const Menu = () => {
  // const [items, setItems] = useState<Item[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const { items, loading, error } = useMenu();

  // useEffect(() => {
  //   // Asynchronously fetch menu items from your API endpoint
  //   const fetchItems = async () => {
  //     try {
  //       const res = await fetch('/api/items');
  //       if (!res.ok) {
  //         throw new Error('Failed to fetch menu items.');
  //       }
  //       const data = await res.json();
  //       if (data.success) {
  //         setItems(data.data);
  //       } else {
  //         throw new Error(data.error || 'Could not retrieve items.');
  //       }
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : 'An unknown error occurred.');
  //       console.error("Failed to fetch items:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchItems();
  // }, []); // The empty dependency array ensures this effect runs only once on mount

  // Display a loading state while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading our delicious menu...</p>
      </div>
    );
  }

  // Display an error message if the API call fails
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
    

 <div className="py-12 sm:py-16 bg-white dark:bg-[#1f1e1e]">
  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* A stylish title using the 'Playfair Display' font from your layout */}
          <h1 style={{ fontFamily: 'var(--font-playfair-display)' }} className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Our Menu
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our collection of authentic Pahadi dishes, crafted with traditional recipes and the finest ingredients.
          </p>
        </div>

       

        {/* Responsive grid for the menu items */}
        <div className="mt-12">
          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {items.map((item) => (
                <div key={item._id} className="flex justify-center">
                  <ItemCard
                    title={item.name}
                    description={item.description}
                    price={`₹${item.price}`}
                    imageUrl={item.imageUrl}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
              No menu items are available at the moment. Please check back later.
            </p>
          )}
        </div>
      </div>
    </div>
    </>
   
  );
};

export default Menu;