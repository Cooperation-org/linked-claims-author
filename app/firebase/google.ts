import { setCookie, setLocalStorage } from '../utils/cookie'

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'

export const signInWithGoogle = async (): Promise<{
  user: any
  accessToken: string
} | null> => {
  try {
    // Create and store a random state value for security
    const state = Math.random().toString(36).substring(7)
    sessionStorage.setItem('oauth_state', state)

    // Configure OAuth parameters
    const params = new URLSearchParams({
      client_id:
        '1027526679703-jma4tf3e73ld1n4gfi3m9d7gbcgborld.apps.googleusercontent.com',
      redirect_uri: `${window.location.origin}/auth/callback`,
      response_type: 'code',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/drive.file'
      ].join(' '),
      access_type: 'offline', // This requests a refresh token
      prompt: 'consent', // Force consent screen to always get refresh token
      state: state
    })

    // Redirect to Google's auth page
    window.location.href = `${GOOGLE_AUTH_URL}?${params.toString()}`
    return null
  } catch (error) {
    console.error('Error initiating Google sign-in:', error)
    return null
  }
}

export const handleAuthCallback = async (
  code: string,
  state: string
): Promise<{
  user: any
  accessToken: string
} | null> => {
  try {
    // Verify state matches what we stored
    const storedState = sessionStorage.getItem('oauth_state')
    if (state !== storedState) {
      throw new Error('State mismatch - possible CSRF attack')
    }

    // Exchange code for tokens
    const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id:
          '1027526679703-jma4tf3e73ld1n4gfi3m9d7gbcgborld.apps.googleusercontent.com',
        client_secret: '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',
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${window.location.origin}/auth/callback`
      })
    })

    const tokens = await tokenResponse.json()

    if (tokens.error) {
      throw new Error(`Token error: ${tokens.error_description}`)
    }

    // Get user info using the access token
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`
      }
    })

    const user = await userResponse.json()

    // Store tokens
    setCookie('refresh_token', tokens.refresh_token, {
      secure: true,
      sameSite: 'strict',
      expires: 30 // 30 days
    })

    setCookie('accessToken', tokens.access_token, {
      secure: true,
      sameSite: 'strict',
      expires: tokens.expires_in / (24 * 60 * 60) // Convert seconds to days
    })

    setLocalStorage('user', JSON.stringify(user))

    return {
      user,
      accessToken: tokens.access_token
    }
  } catch (error) {
    console.error('Error handling auth callback:', error)
    return null
  }
}

// You'll also need a callback page/component like this:
/*
// pages/auth/callback.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { handleAuthCallback } from './auth'

export default function AuthCallback() {
  const router = useRouter()
  
  useEffect(() => {
    const { code, state } = router.query
    if (code && state) {
      handleAuthCallback(code as string, state as string)
        .then(() => router.push('/dashboard')) // or wherever you want to redirect after auth
        .catch(console.error)
    }
  }, [router.query])

  return <div>Authenticating...</div>
}
*/
