import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import jwt from "jsonwebtoken";
import md5 from "md5";

declare module "next-auth" {
  interface User {
    id?: string; // requerido por NextAuth
    userId?: string;
    tokenAccess?: string;
    givenName?: string;
    familyName?: string;
    userName?: string;
  }

  interface Session {
    accessToken?: string;
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    userId?: string;
    givenName?: string;
    familyName?: string;
    userName?: string;
  }
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
const PUBLIC_KEY = process.env.JWT_PUBLIC_KEY!.replace(/\\n/g, "\n");

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const hashedPassword = md5(password);

        try {
          const response = await axios.post(`${BACKEND_URL}/users/login`, {
            email,
            password: hashedPassword,
          });

          const user = response.data?.data;

          if (user && user.tokenAccess) {
            jwt.verify(user.tokenAccess, PUBLIC_KEY, { algorithms: ["RS256"] });

            return {
              id: user.userId, // requerido
              userId: user.userId,
              tokenAccess: user.tokenAccess,
              givenName: user.givenName,
              familyName: user.familyName,
              userName: user.userName,
            };
          }

          throw new Error("Invalid credentials");
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.log(
              "Authorization error:",
              error.response?.data?.message || error.message
            );
          } else if (error instanceof Error) {
            console.log("Authorization error:", error.message);
          }
          throw new Error("Login failed");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.tokenAccess;
        token.userId = user.userId;
        token.givenName = user.givenName;
        token.familyName = user.familyName;
        token.userName = user.userName;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken!;
      session.user = {
        userId: token.userId!,
        tokenAccess: token.accessToken!,
        givenName: token.givenName!,
        familyName: token.familyName!,
        userName: token.userName!,
      };
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
};
