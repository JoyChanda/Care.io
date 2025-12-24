import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        try {
          await dbConnect();

          const { identifier, password } = credentials;
          let user;

          // Check if identifier looks like an email
    const normalizedIdentifier = identifier.toLowerCase();
    const isEmail = normalizedIdentifier.includes("@");

    if (isEmail) {
      user = await User.findOne({ email: normalizedIdentifier });
    } else {
      user = await User.findOne({ contact: identifier });
    }

          if (!user || !user.password) {
            console.log("Auth failed: User not found or no password");
            throw new Error("Invalid credentials");
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            console.log("Auth failed: Password mismatch");
            throw new Error("Invalid credentials");
          }

          return {
            id: (user as any)._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error("Critical Auth Error:", error);
          throw error;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Destructure safely
          const email = user?.email;
          const name = user?.name;
          const image = user?.image;

          if (!email) {
            console.error("Google login failed: Email not provided by Google");
            return false; // This is a legitimate failure
          }

          // Try to sync with DB, but don't block auth if it fails
          try {
            await dbConnect();
            const userExists = await User.findOne({ email: email as string });

            if (!userExists) {
              await User.create({
                name: name || (email as string).split('@')[0],
                email,
                image,
              });
              console.log("New Google user created:", email);
            }
          } catch (dbError) {
            console.error("Non-blocking DB error during Google Sign-In:", dbError);
          }
          
          return true;
        } catch (error) {
          console.error("Unexpected error in signIn callback:", error);
          return true; // Fallback to allow login
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        try {
          await dbConnect();
          const dbUser = await User.findOne({ email: user.email as string });
          if (dbUser) {
            token.id = (dbUser as any)._id.toString();
          }
        } catch (error) {
          console.error("JWT Callback Error:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  // Enable debug in development to see full error logs in terminal
  debug: true,
});

export { handler as GET, handler as POST };
