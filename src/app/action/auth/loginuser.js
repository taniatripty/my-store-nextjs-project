'use server'


import dbconnet, { collectionNames } from '@/lib/dbconnect';
import bcrypt from 'bcrypt'

export const LoginUser=async(payload)=>{
    const{email,password}=payload;
    const userCollection= dbconnet(collectionNames.TEST_USER)
    const user=await userCollection.findOne({email});
    if(!user ){
        return null
    }
    const ispasswordOk= bcrypt.compare(user.password,password)
    if(!ispasswordOk){
        return null
    }
    return user
}
