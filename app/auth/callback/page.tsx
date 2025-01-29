import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { handleAuthCallback } from '../../firebase/google'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const { code, state } = router.query
    if (code && state) {
      handleAuthCallback(code as string, state as string)
        .then(() => router.push('/dashboard')) // or wherever you want to redirect after auth
        .catch(console.error)
    }
  }, [router, router.query])

  return <div>Authenticating...</div>
}
