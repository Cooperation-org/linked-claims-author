import { auth, db, googleProvider } from './config/firebase'
import { getAuth, signInWithPopup, signOut, User } from 'firebase/auth'
import { setCookie, setLocalStorage } from '../utils/cookie'
import { GoogleAuthProvider } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { getFileTokens } from './storage'

export const signInWithGoogle = async (): Promise<{
  user: User
  accessToken: string
} | null> => {
  try {
    const googleProvider = new GoogleAuthProvider()

    // Add the required scopes
    googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile')
    googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email')
    googleProvider.addScope('https://www.googleapis.com/auth/drive.file') // The important scope for Google Drive

    const auth = getAuth()
    const result = await signInWithPopup(auth, googleProvider)

    if (!result.user) {
      throw new Error('No user found')
    }

    // Extract the Google credential and access token
    const credential = GoogleAuthProvider.credentialFromResult(result)

    // Access token is included in the credential and can be used directly
    const accessToken = credential?.accessToken
    // Now, we can get the refresh token from the credential object (Google OAuth2 refresh token)
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

export const refreshAccessToken = async ({
  refreshToken
}: {
  refreshToken: string
}): Promise<string | null> => {
  if (!refreshToken) {
    throw new Error('No refresh token available.')
  }

  const params = new URLSearchParams()
  params.append(
    'client_id',
    '1027526679703-jma4tf3e73ld1n4gfi3m9d7gbcgborld.apps.googleusercontent.com'
  ) // Replace with your Google OAuth client ID
  params.append('client_secret', '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') // Replace with your Google OAuth client secret
  params.append(
    'refresh_token',
    'AMf-vBzykTbpDSQ7lLHWern8cADNjjICraInz_aNMVgSrt2o3Yp2sHCmFWBmTkpVWlXEzWlhJkopar5Q2FN771SmokpeTYveFM4_H8S8rLePkwPJKIvtS8ZerZsIJEI-dLTfcSGOjIY5rY4BBBTtvUOuxXh2nlSusAd6DLC813o2vDZ-efGlh6x85J50PL7G3YO71y9NFj0fDTfhQnZEbPQvCbFW2dR2kVY5XB6xtC4khuGroJyB8jTiA-ftJ7nLdaJBQn2nZSf3L4w67kulFAqTgQj1kAusQuWMYRQZPEQU_Hs1i7atqoP4uLJyIhvkMw3KDEIx5AlW6zXv1h38EIe7LT21p7AT9xfjVm91npAvkN2uZMUHH87_cPwfCdDvGYSAjSsSUDd-09sdpkzX0HV2dJY_Fu2yx8okDp7TOfDsBNLF1p1bKeA'
  )
  params.append('grant_type', 'refresh_token')
  params.append(
    'scope',
    'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.file'
  )

  try {
    const response = await fetch(GOOGLE_TOKEN_URL, {
      method: 'POST',
      body: params
    })

    const data = await response.json()
    console.log('🚀 ~ data:', data)

    if (data.error) {
      throw new Error('Error refreshing token: ' + data.error_description)
    }

    return data.access_token
  } catch (error) {
    console.error('Error refreshing access token:', error)
    return null
  }
}

interface GoogleTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

interface StoredTokens {
  accessToken: string
  refreshToken: string
  uid: string
}

class PublicDriveViewer {
  private static async refreshGoogleToken(refreshToken: string): Promise<string> {
    if (!refreshToken) {
      throw new Error('No refresh token available.')
    }

    const params = new URLSearchParams()
    params.append(
      'client_id',
      '1027526679703-jma4tf3e73ld1n4gfi3m9d7gbcgborld.apps.googleusercontent.com'
    )
    params.append('client_secret', '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')
    params.append('refresh_token', refreshToken)
    params.append('grant_type', 'refresh_token')
    params.append(
      'scope',
      'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.file'
    )

    try {
      const response = await fetch(GOOGLE_TOKEN_URL, {
        method: 'POST',
        body: params
      })

      const data = await response.json()
      console.log('Token refresh response:', data)

      if (data.error) {
        throw new Error('Error refreshing token: ' + data.error_description)
      }

      return data.access_token
    } catch (error) {
      console.error('Error refreshing access token:', error)
      throw error
    }
  }

  static async getTokensForFile(fileId: string): Promise<string> {
    try {
      console.log('Getting tokens for file:', fileId)
      const storedTokens = await getFileTokens({
        googleFileId: fileId
      })

      if (!storedTokens?.refreshToken) {
        throw new Error('No refresh token found for this file')
      }

      try {
        // First try with the stored access token
        if (storedTokens.accessToken) {
          // Test if the access token is still valid
          const testResponse = await fetch(
            `https://www.googleapis.com/drive/v3/files/${fileId}?fields=id`,
            {
              headers: {
                Authorization: `Bearer ${storedTokens.accessToken}`
              }
            }
          )

          if (testResponse.ok) {
            return storedTokens.accessToken
          }
        }

        // If we get here, we need to refresh the token
        const newAccessToken = await this.refreshGoogleToken(storedTokens.refreshToken)

        // Update the token in Firestore
        await updateDoc(doc(db, 'tokens', fileId), {
          accessToken: newAccessToken
        })

        return newAccessToken
      } catch (error) {
        // If the stored access token fails, try refreshing
        const newAccessToken = await this.refreshGoogleToken(storedTokens.refreshToken)

        // Update the token in Firestore
        await updateDoc(doc(db, 'tokens', fileId), {
          accessToken: newAccessToken
        })

        return newAccessToken
      }
    } catch (error) {
      console.error('Error getting tokens:', error)
      throw new Error('Failed to get access to the file')
    }
  }
}

export default PublicDriveViewer
