
// "use client";

// import { useState } from "react";
// import Swal from "sweetalert2";
// import { useSession } from "next-auth/react";

// export default function AddProductForm() {
//   const { data: session } = useSession(); // get logged-in user session
//   const [product, setProduct] = useState({
//     name: "",
//     image: "",
//     price: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Extra check: user must be logged in
//     if (!session) {
//       Swal.fire({
//         title: "Unauthorized",
//         text: "You must be logged in to add a product.",
//         icon: "warning",
//       });
//       return;
//     }

//     try {
//       const res = await fetch("https://my-store-nextjs-project.vercel.app/api/product", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(product),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         Swal.fire({
//           title: "Success!",
//           text: "Product added successfully 🎉",
//           icon: "success",
//           confirmButtonColor: "#4F46E5",
//         });
//         setProduct({ name: "", image: "", price: "", description: "" });
//       } else {
//         Swal.fire({
//           title: "Error!",
//           text: data.message || "Failed to add product.",
//           icon: "error",
//           confirmButtonColor: "#EF4444",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Error!",
//         text: "Something went wrong!",
//         icon: "error",
//       });
//     }
//   };

//   if (!session) {
//     return (
//       <p className="text-center text-red-500 mt-10">
//         You must be logged in to add a product.
//       </p>
//     );
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-2xl mt-10"
//     >
//       <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

//       <input
//         type="text"
//         name="name"
//         placeholder="Product Name"
//         value={product.name}
//         onChange={handleChange}
//         className="w-full p-2 mb-4 border rounded-md"
//         required
//       />

//       <input
//         type="text"
//         name="image"
//         placeholder="Image URL"
//         value={product.image}
//         onChange={handleChange}
//         className="w-full p-2 mb-4 border rounded-md"
//         required
//       />

//       <input
//         type="number"
//         name="price"
//         placeholder="Price"
//         value={product.price}
//         onChange={handleChange}
//         className="w-full p-2 mb-4 border rounded-md"
//         required
//       />

//       <textarea
//         name="description"
//         placeholder="Description"
//         value={product.description}
//         onChange={handleChange}
//         className="w-full p-2 mb-4 border rounded-md"
//         rows="3"
//         required
//       ></textarea>

//       <button
//         type="submit"
//         className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
//       >
//         Add Product
//       </button>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export default function AddProductForm({ onProductAdded }) {
  const { data: session } = useSession();
  const [product, setProduct] = useState({ name: "", image: "", price: "", description: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      Swal.fire({ title: "Unauthorized", text: "Login to add product.", icon: "warning" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();

      if (res.ok) {
        Swal.fire({ title: "Success!", text: "Product added 🎉", icon: "success" });
        setProduct({ name: "", image: "", price: "", description: "" });
        if (onProductAdded) onProductAdded(data.product); // update parent
      } else {
        Swal.fire({ title: "Error!", text: data.message || "Failed", icon: "error" });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ title: "Error!", text: "Something went wrong!", icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (!session) return <p className="text-center text-red-500 mt-10">Login to add a product.</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} className="w-full p-2 mb-4 border rounded-md" required />
      <input type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} className="w-full p-2 mb-4 border rounded-md" required />
      <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} className="w-full p-2 mb-4 border rounded-md" required />
      <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} className="w-full p-2 mb-4 border rounded-md" rows="3" required></textarea>
      <button type="submit" disabled={loading} className={`w-full py-2 rounded-xl text-white ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}>
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}
