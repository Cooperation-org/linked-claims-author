import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

declare module 'next-auth' {
  interface Session {
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
          scope:
            'openid email profile https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file'
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expires = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // 30 days
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.refreshToken = token.refreshToken as string
      session.expires = token.expires as number
      return session
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 , // 7 days
    updateAge: 60 * 60 * 24, // try one day
  }
})

export { handler as GET, handler as POST }
