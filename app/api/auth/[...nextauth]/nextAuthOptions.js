import User from "@/models/user";
import CredentialsProvider from "next-auth/providers/credentials";

import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your password",
        },
      },
      async authorize(credentials, req) {
        try {
          const {email, password} = credentials
          if(!email || !password){
            throw new Error("Email and password are required.");
          }
          const user = await User.findOne({email : email})
          if(!user){
            throw new Error("User not authorized. Email not found.");
          }
          const isPasswordValid = await user.comparePassword(password);
          if(!isPasswordValid){
            throw new Error("Invalid email or password.");
          }
          return {
            id : user._id,
            email: user.email,
            name : user.name,
            picture : user.profileImageUrl,
          }
        } catch (error) {
          console.error(error)
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({token, user, account, isNewUser, trigger}) {
      if(user){
        token.id = user.id
        token.picture = user.picture
      } 
      console.log(token)  
      return token;
    },
    async session(params) {
      console.log("session params", params);
      return;
    },
    secret: process.env.NEXTAUTH_SECRET,
  },
};
export default authOptions;
