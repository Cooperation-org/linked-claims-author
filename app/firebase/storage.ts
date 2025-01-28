import { db } from '../config/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'

export const storeRefreshToken = async (
  userId: string,
  refreshToken: string
): Promise<void> => {
  try {
    await setDoc(doc(db, 'users', userId, 'tokens', 'googleDrive'), {
      refreshToken
    })
  } catch (error) {
    console.error('Error storing refresh token:', error)
  }
}

export const getRefreshToken = async (userId: string): Promise<string | null> => {
  try {
    const docRef = doc(db, 'users', userId, 'tokens', 'googleDrive')
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data().refreshToken
    }
    return null
  } catch (error) {
    console.error('Error retrieving refresh token:', error)
    return null
  }
}

export const getAccessToken = async (userId: string): Promise<string | null> => {
  const refreshToken = await getRefreshToken(userId)
  if (!refreshToken) return null

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
        client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET || '',
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      })
    })
    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error('Error generating access token:', error)
    return null
  }
}
