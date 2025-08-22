'use client'
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa6";

import Image from "next/image";
import SocialLogin from "../login/component/sociallogin";
import RegisterForm from "./components/registerform";


export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 shadow-lg rounded-lg overflow-hidden ">
        
        {/* Left Illustration */}
        <div className="bg-white h-full w-full flex items-center justify-center p-10">
         <Image src={'/asset/login.jpg'} width={400} height={200} alt="login images">

         </Image>
        </div>

        {/* Right Form */}
        <div className="bg-white p-10">
         
            <RegisterForm></RegisterForm>
          <div className="text-center my-4 text-gray-500">Or Sign Up with</div>

        <SocialLogin></SocialLogin>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-orange-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
    );
}