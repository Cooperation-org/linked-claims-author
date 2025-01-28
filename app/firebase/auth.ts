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
