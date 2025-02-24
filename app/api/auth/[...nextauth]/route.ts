import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { setCookie } from '../../../utils/cookie'
import { storeFileTokens } from '../../../firebase/storage'
import { refreshAccessToken } from '../../../utils/refreshToken'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    refreshToken?: string
    expires?: number
    error?: string
    user?: {
      name?: string
      email?: string
      image?: string
    }
  }

  interface Token {
    accessToken?: string
    refreshToken?: string
    expires?: number
    error?: string
    user?: {
      name?: string
      email?: string
      image?: string
    }
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
            'openid email profile https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata',
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign-in
      if (account && user) {
        const accessToken = account.access_token
        const refreshToken = account.refresh_token

        setCookie('accessToken', accessToken as string, { expires: 60 * 60 * 24 * 30 }) // Expire in 30 days
        setCookie('refreshToken', refreshToken as string, { expires: 60 * 60 * 24 * 30 })

        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expires: Date.now() + (account.expires_in as number) * 1000,
          user: {
            name: user.name,
            email: user.email,
            image: user.image
          }
        }
      }

      // Return previous token if the access token has not expired yet

      if (
        token.expires &&
        typeof token.expires === 'number' &&
        Date.now() < token.expires
      ) {
        return token
      }

      //if the Access token has expired
      return await refreshAccessToken(token)
    },
    async session({ session, token }: { session: any; token: any }) {
      if (typeof token.accessToken === 'string') {
        session.accessToken = token.accessToken
      }
      if (typeof token.refreshToken === 'string') {
        session.refreshToken = token.refreshToken
      }
      if (typeof token.expires === 'number') {
        session.expires = token.expires
      }
      if (typeof token.error === 'string') {
        session.error = token.error
      }
      session.user = token.user

      console.log('🚀 ~ session ~ session:', session)
      return session
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // 2 days
    updateAge: 60 * 60 * 24 // 1 day
  }
})

export { handler as GET, handler as POST }
