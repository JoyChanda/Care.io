import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

// Validate environment variables
if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID is not set in environment variables");
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_SECRET is not set in environment variables");
}
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is not set in environment variables");
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
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
    async signIn({ user, account, profile }) {
      // Allow Google sign-in to proceed
      if (account?.provider === "google") {
        const { name, email, image } = user;
        
        // Validate email exists
        if (!email) {
          console.error("Google sign-in failed: No email provided");
          return false;
        }

        try {
          await dbConnect();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            await User.create({
              name,
              email,
              image,
            });
          }
        } catch (error) {
          console.error("Error saving user to DB during Google Sign-In:", error);
          // Don't block sign-in if DB save fails, but log it
          // return false; // Uncomment if you want to block sign-in on DB error
        }
      }
      return true;
    },
    async session({ session, token }) {
      try {
        if (session.user?.email) {
          await dbConnect();
          const dbUser = await User.findOne({ email: session.user.email });
          if (dbUser) {
            (session.user as any).id = dbUser._id.toString();
          }
        }
      } catch (error) {
        console.error("Error fetching user session from DB:", error);
      }
      return session;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
