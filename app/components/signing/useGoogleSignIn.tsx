import { useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { DefaultSession } from 'next-auth'

interface ExtendedSession extends DefaultSession {
  accessToken?: string
  idToken?: string
}

export const useGoogleSignIn = () => {
  const { data: session } = useSession()

  useEffect(() => {
    const extendedSession = session as ExtendedSession
    if (extendedSession?.accessToken) {
      localStorage.setItem('accessToken', extendedSession.accessToken)
    } else {
      localStorage.removeItem('accessToken')
    }
  }, [session])

  const handleSignIn = async (): Promise<boolean> => {
    try {
      const result = await signIn('google', { redirect: false })
      if (result?.error) {
        console.error('Sign-in failed:', result.error)
        return false
      }
      return true
    } catch (error) {
      console.error('Sign-in failed:', error)
      return false
    }
  }

  const handleSignOut = async (): Promise<void> => {
    await signOut({ redirect: false })
    localStorage.removeItem('accessToken')
  }

  return { session, handleSignIn, handleSignOut }
}
