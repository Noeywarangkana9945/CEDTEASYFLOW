import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        // แก้จุดนี้ด้วยการ cast profile
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: (profile as any).picture, // แก้ปัญหา Property 'picture'
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.picture = (profile as any).picture; // ถ้ามีการใช้ใน jwt ด้วย
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
