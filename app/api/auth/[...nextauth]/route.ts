import NextAuth from "next-auth/next";
import GoogleProvidor from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvidor({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_Secret ?? "",
    }),
  ],
});

export { handler as GET, handler as POST };
