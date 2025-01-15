import CredentialsProvider from "next-auth/providers/credentials";

import GoogleProvider from "next-auth/providers/google";
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Full Name", type: "text", placeholder: "your name" },
        email: { label: "Email", type: "email", placeholder: "your email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your password",
        },
        confirmPassword: {
          label: "Confirm Password",
          type: "password",
          placeholder: "confirm password",
        },
      },
      async authorize(credentials, req) {
        const user = {
          id: 1,
          email: "aditya@gmail.com",
          password: "121aditya",
        };
        console.log("user data authorize", credentials, req);
        if (credentials.email === user.email) {
          return user;
        }
        throw new Error("User not authorized")
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
    async jwt(params) {
      console.log("jwt params", params);
      return;
    },
    async session(params) {
      console.log("session params", params);
      return;
    },
    secret: process.env.NEXTAUTH_SECRET,
  },
};
export default authOptions;
