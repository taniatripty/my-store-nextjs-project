'use client'
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {  FaGoogle } from "react-icons/fa6";

export default function SocialLogin() {
  const session=useSession()
  const router=useRouter()
  const handlelogin=(providername)=>{
    console.log('social login',providername)
    const result= signIn(providername)
    
  }
  useEffect(()=>{
   if( session?.status=='authenticated'){
    router.push('/')
   }
  },[session?.status])
    return (
        <div>
              <div className="flex justify-center gap-8">
      <p
       onClick={()=>handlelogin('google')}
        className="bg-slate-200 rounded-full p-3"
      >
        <FaGoogle type="button" />
      </p>
     
    </div>
        </div>
    );
}
