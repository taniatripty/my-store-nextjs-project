
"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SocialLogin from "./sociallogin";
import Swal from "sweetalert2";



export default function LoginFormPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handlelogin = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
if(response.ok){
  Swal.fire({
  position: "top-end",
  icon: "success",
  title: "login successfull",
  showConfirmButton: false,
  timer: 1500
});
   router.push("/");
}
    if (!response || !response.ok) {
      setError("Invalid email or password.");
      return;
    }

   
  };

  return (
    <form onSubmit={handlelogin} className="w-full max-w-lg space-y-6">
      {error && (
        <div className="text-red-500 text-center font-semibold">{error}</div>
      )}
      
      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text font-bold">Email</span>
        </div>
        <input
          type="text"
          name="email"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
      </label>

      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text font-bold">Password</span>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
      </label>

      <button className="w-full h-12 bg-orange-500 text-white font-bold">
        Sign In
      </button>

      <p className="text-center">Or Sign In with</p>

     <SocialLogin></SocialLogin>
      <p className="text-center">
        Don't have an account?{" "}
        <Link href="/register" className="text-orange-500 font-bold">
          Register
        </Link>
      </p>
    </form>
  );
}
