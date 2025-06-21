"use client";
import React from 'react'
import { Utensils, Sparkles, HeartHandshake, Leaf } from 'lucide-react'; // Icons for values
import { Button } from "@/components/ui/button"; // Assuming this path
import Link from 'next/link';

 const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1f1e1e] text-gray-900 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            About Pahadi Rasoi Ghar
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Bringing the authentic flavors of the mountains to your table.
          </p>
        </div>

        {/* Our Story Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Utensils className="h-6 w-6 mr-3 text-[#ff5757]" /> Our Story
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Pahadi Rasoi Ghar was born from a passion for the rich, wholesome, and often
            undiscovered culinary traditions of the Himalayan region. Our founders,
            inspired by their ancestral roots and the vibrant flavors of mountain
            cuisine, embarked on a journey to share this unique gastronomic experience
            with the world. What started as a small dream in a humble kitchen has
            grown into a beloved establishment, dedicated to authenticity and quality.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Every dish at Pahadi Rasoi Ghar tells a story – a story of fresh, local
            ingredients, time-honored recipes passed down through generations, and the
            warmth of mountain hospitality. We believe in preserving the essence of
            &quot;Pahadi&quot; (mountain) cooking, ensuring that each bite transports you
            to the serene landscapes and vibrant culture of the Himalayas.
          </p>
        </section>

        {/* Our Mission Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Sparkles className="h-6 w-6 mr-3 text-[#ff5757]" /> Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our mission is to be the premier destination for authentic Himalayan cuisine,
            offering an unparalleled dining experience that celebrates tradition,
            quality, and community. We are committed to sourcing the freshest ingredients,
            upholding traditional cooking methods, and providing exceptional service
            that makes every guest feel like family.
          </p>
        </section>

        {/* Our Values Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <HeartHandshake className="h-6 w-6 mr-3 text-[#ff5757]" /> Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-[#ff5757]" /> Authenticity
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                We stay true to the original recipes and flavors of the Himalayan region.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-[#ff5757]" /> Quality
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                From farm to table, we ensure the highest quality ingredients and preparation.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <HeartHandshake className="h-5 w-5 mr-2 text-[#ff5757]" /> Community
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                We foster a welcoming environment and support local producers.
              </p>
            </div>
          </div>
        </section>

        <div className="text-center mt-10">
          <Link href="/contact" passHref>
            <Button className="bg-[#ff5757] text-white py-2 px-6 rounded-md hover:bg-[#e64a4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5757] dark:focus:ring-offset-gray-800">
              Have Questions? Contact Us!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About;