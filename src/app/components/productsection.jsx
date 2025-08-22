// import dbconnet, { collectionNames } from '@/lib/dbconnect'
// import Link from 'next/link'
// import React from 'react'

// export  default async function Productsection() {
//     const products=await dbconnet(collectionNames.PRODUCTS_DATA).find({}).toArray()
//   return (
//    <section className="py-10 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {products.map((product, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300"
//             >
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-48 object-cover rounded-xl"
//               />
//               <div className="mt-4">
//                 <h3 className="text-lg font-semibold">{product.name}</h3>
//                 <p className="text-gray-600 text-sm mt-1">{product.description}</p>
//                 <p className="text-indigo-600 font-bold mt-3">
//                   ${product.price.toFixed(2)}
//                 </p>
//               <Link href={`/products/${product._id}`}>
//                 <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition">
//                  Details
//                 </button>
//               </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/product")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl" />
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <p className="text-indigo-600 font-bold mt-3">${product.price.toFixed(2)}</p>
                <Link href={`/products/${product._id}`}>
                  <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition">Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
