import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

interface ExtendedSession {
  accessToken?: string
  refreshToken?: string
  expires?: number
  user?: {
    email?: string
    image?: string
    name?: string
  }
}

export const useGoogleSignIn = () => {
  const { data: session, status } = useSession()
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const extendedSession = session as ExtendedSession
    console.log('🚀 ~ useEffect ~ extendedSession:', extendedSession)

    if (extendedSession?.accessToken) {
      localStorage.setItem('accessToken', extendedSession.accessToken)
    } else {
      localStorage.removeItem('accessToken')
    }

    if (extendedSession?.refreshToken) {
      localStorage.setItem('refreshToken', extendedSession.refreshToken)
    } else {
      localStorage.removeItem('refreshToken')
    }

    const checkTokenExpiration = async () => {
      if (extendedSession?.expires && extendedSession.expires < Date.now() / 1000) {
        // Token is expired or about to expire, refresh it
        await refreshToken()
      }
    }

    if (status === 'authenticated') {
      checkTokenExpiration()
    }
  }, [session, status])

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) return

    try {
      setIsRefreshing(true)
      const response = await fetch('/api/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      })

      const data = await response.json()
      console.log('🚀 ~ refreshToken ~ data:', data)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to refresh token')
      }

      // Update localStorage and session with new tokens
      localStorage.setItem('accessToken', data.access_token)
      // Update session or any other state management as needed
    } catch (error) {
      console.error('Failed to refresh token:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

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
    localStorage.removeItem('refreshToken')
  }

  return { session, handleSignIn, handleSignOut, isRefreshing }
}
