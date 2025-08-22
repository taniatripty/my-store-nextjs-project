"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  const navMenu = () => (
    <>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/addproduct">Add Products</Link></li>
      <li><Link href="/contact">Contact</Link></li>
      
    </>
  );

  return (
    <div className="navbar bg-gray-900 text-white shadow-sm">
      {/* Left side */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content  rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {navMenu()}
          </ul>
        </div>

        {/* Logo */}
        <Link href="/" className="btn btn-ghost text-xl">
         <h1> My store</h1>
        </Link>
      </div>

      {/* Center links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navMenu()}</ul>
      </div>

      {/* Right side */}
      <div className="navbar-end flex items-center gap-5">
        {/* User avatar */}
        {status === "authenticated" && (
          <Image
            src={session?.user?.image || "/asset/user.jpg"}
            width={40}
            height={40}
            alt="user"
            className="rounded-full"
          />
        )}

        {/* Auth buttons */}
        {status === "authenticated" ? (
          <button onClick={() => signOut()} className="btn btn-outline btn-sm">
            Logout
          </button>
        ) : (
          <>
            <Link href="/register" className="btn btn-ghost btn-sm">Register</Link>
            <Link href="/login" className="btn btn-primary btn-sm">Login</Link>
          </>
        )}
      </div>
    </div>
  );
}
