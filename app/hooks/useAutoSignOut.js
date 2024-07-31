import { useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'

const useAutoSignOut = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session && session.expires) {
      const expiresAt = new Date(session.expires * 1000) 
      const now = new Date()
      const timeToExpire = expiresAt - now
      const signOutTimeout = Math.max(timeToExpire - 60000, 0) 

      const timer = setTimeout(() => {
        signOut({ redirect: false }) 
      }, signOutTimeout)

      return () => clearTimeout(timer)
    }
  }, [session])
}

export default useAutoSignOut
