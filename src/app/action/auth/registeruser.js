 'use server'
 import bcrypt from 'bcrypt'

import dbconnet, { collectionNames } from "@/lib/dbconnect"

 export const registerUser=async(payload)=>{
    const{email,password}=payload
    if(!email || !password){
        return null
    }
    const user=await dbconnet(collectionNames.TEST_USER).findOne({email:payload.email})
    if(!user){
        const hashpassword=await bcrypt.hash(password,10)
        payload.password=hashpassword
          const result=await dbconnet(collectionNames.TEST_USER).insertOne(payload)
//const{acknowledged, insertedId}=result
          result.insertedId=result.insertedId.toString()
        return result
    }
     return null
  

}