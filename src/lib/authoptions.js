import CredentialsProvider from "next-auth/providers/credentials"
 import GoogleProvider from "next-auth/providers/google";
 import GitHubProvider from "next-auth/providers/github";

import dbconnet, { collectionNames } from "./dbconnect";
import { LoginUser } from "@/app/action/auth/loginuser";


export const authOptions={
providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "Email", type: "text", placeholder: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
       console.log('form  credntials',credentials)
      // You need to provide your own logic here that takes the credentials
      // submitted and returns either a object representing a user or value
      // that is false/null if the credentials are invalid.
      // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
      // You can also use the `req` object to obtain additional parameters
      // (i.e., the request IP address)
      // const res = await fetch("/your/endpoint", {
      //   method: 'POST',
      //   body: JSON.stringify(credentials),
      //   headers: { "Content-Type": "application/json" }
      // })
      const user = await LoginUser(credentials)
      console.log(user)

      // If no error and we have user data, return it
      if ( user) {
        return user
      }
      // Return null if user data could not be retrieved
      return null
    }
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }),
   GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  })
],
pages: {
  signIn: '/login',
},
callbacks: {
  async signIn({ user, account, profile, email, credentials }) {

     if(account){
            try {
                const{providerAccountId,provider}=account
        const{ email:user_email, image,name}=user
        const payload={role:'user',providerAccountId,provider,user_email,name,image}
        console.log('from singin',payload)
        const isUserExist=await dbconnet(collectionNames.TEST_USER).findOne({providerAccountId})
        if(!isUserExist){
            await dbconnet(collectionNames.TEST_USER).insertOne(payload)
        }
                
            } catch (error) {
                return false
                console.log(error)
            }
        // console.log('from singin',{ user, account, profile, email, credentials })
        
        }
        
    return true
    
  },
}
}