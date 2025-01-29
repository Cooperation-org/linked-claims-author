import { auth, googleProvider } from './config/firebase'
import {
  getAuth,
  getIdToken,
  reauthenticateWithPopup,
  signInWithPopup,
  signOut,
  User
} from 'firebase/auth'
import { getCookie, setCookie, setLocalStorage } from '../utils/cookie'
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
    const refreshToken = result.user.refreshToken
    if (!accessToken || !refreshToken) {
      throw new Error('No tokens found')
    }

    setCookie('refresh_token', refreshToken, {
      secure: true,
      sameSite: 'strict',
      expires: 7 // 7 days
    })

    console.log('Access Token:', accessToken)
    setCookie('accessToken', accessToken, {
      secure: true,
      sameSite: 'strict',
      expires: 1 / 24 // 1 hour
    })

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

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getCookie('refresh_token')

    if (!refreshToken) {
      throw new Error('No refresh token available.')
    }

    const requestBody = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    })

    const response = await fetch(GOOGLE_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: requestBody.toString()
    })

    if (!response.ok) {
      throw new Error(`Failed to refresh access token: ${response.statusText}`)
    }

    const data = await response.json()
    const newAccessToken = data.access_token

    if (!newAccessToken) {
      throw new Error('No new access token received.')
    }

    // Store the new access token in cookies
    setCookie('accessToken', newAccessToken, {
      secure: true,
      sameSite: 'strict',
      expires: 1 / 24 // 1 hour
    })

    console.log('New Access Token:', newAccessToken)

    return newAccessToken
  } catch (error) {
    console.error('Error refreshing access token:', error)
    return null
  }
}

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth)
    // Clear cookies and local storage on logout
    setCookie('accessToken', '', { expires: 0 })
    setCookie('refresh_token', '', { expires: 0 })
    setLocalStorage('user', '')
  } catch (error) {
    console.error('Error signing out:', error)
  }
}
