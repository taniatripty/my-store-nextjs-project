"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to My Store 
          </h1>
          <p className="text-lg md:text-xl max-w-md mb-6">
            Discover amazing products, explore details, and manage your own items after logging in.
          </p>
          <Link
            href="/products"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100"
          >
            Explore Products
          </Link>
        </div>

        {/* Image */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <Image
            src="/asset/product.jpg" // put image in public/hero-image.png
            alt="Hero Banner"
            width={500}
            height={350}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
