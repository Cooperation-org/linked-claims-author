import { auth, googleProvider } from './config/firebase'
import { signInWithPopup, signOut, User } from 'firebase/auth'
import { setCookie, setLocalStorage } from '../utils/cookie'
import { GoogleAuthProvider } from 'firebase/auth'

export const signInWithGoogle = async (): Promise<{
  user: User
  accessToken: string
} | null> => {
  try {
    googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile')
    googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email')
    googleProvider.addScope('https://www.googleapis.com/auth/drive.file')

    const result = await signInWithPopup(auth, googleProvider)

    if (!result.user) {
      throw new Error('No user found')
    }

    const credential = GoogleAuthProvider.credentialFromResult(result)
    const accessToken = credential?.accessToken
    if (!accessToken) {
      throw new Error('No access token found')
    }

    setCookie('refresh_token', result.user.refreshToken, {
      secure: true,
      sameSite: 'strict',
      expires: 7
    })

    console.log('Access Token:', accessToken)
    setCookie('accessToken', accessToken, {})

    setLocalStorage('user', JSON.stringify(result.user))

    return {
      user: result.user,
      accessToken
    }
  } catch (error) {
    console.error('Error signing in with Google:', error)
    return null
  }
}

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error signing out:', error)
  }
}

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    if (!clientId || !clientSecret) {
      throw new Error('Missing Environment Variables Google client ID or secret')
    }
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      })
    })

    const data = await response.json()

    if (response.ok) {
      return data.access_token
    }

    console.error('Error refreshing access token:', data.error_description)
    return null
  } catch (error) {
    console.error('Error during token refresh:', error)
    return null
  }
}
