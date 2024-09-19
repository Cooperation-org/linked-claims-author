import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

declare module 'next-auth' {
  interface Session {
    [x: string]: any
    accessToken?: string
    refreshToken?: string
    expires?: number
  }

  interface Token {
    accessToken?: string
    refreshToken?: string
    expires?: number
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/drive.file',
          access_type: 'offline' // Add this line
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token // Ensure refresh token is included
        token.expires = Math.floor(Date.now() / 1000) + 60 * 60 * 24  // Access token expires in 1 days
        token.refreshTokenExpires = Math.floor(Date.now() / 1000) + 60 * 60 * 24  // Refresh token expires in 1 days
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.refreshToken = token.refreshToken as string
      session.expires = token.expires as number // Use number for expiration time
      console.log('🚀 ~ session ~ session:', session)
      return session
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 2, // 2 days
    updateAge: 60 * 60 * 24, // try one day
  }
})

export { handler as GET, handler as POST }
