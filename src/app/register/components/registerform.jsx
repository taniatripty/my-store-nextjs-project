'use client'

import { registerUser } from "@/app/action/auth/registeruser";


export default function RegisterForm() {
    const handlesubmit=async(e)=>{
        e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    await registerUser({name,email,password})
    }
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h2>

      <form onSubmit={handlesubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="w-full border border-gray-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="w-full border border-gray-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Confirm Password</label>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            className="w-full border border-gray-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
