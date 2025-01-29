import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from './config/firebase'

interface FileTokens {
  accessToken: string
  refreshToken: string
  expiresAt: number // Timestamp when the access token expires
}

interface UserTokens {
  accessToken: string
  refreshToken: string
  expiresAt: number
}

/**
 * Stores both access and refresh tokens in Firestore for a Google Drive file.
 */
export const storeFileTokens = async ({
  googleFileId,
  ownerId,
  tokens
}: {
  googleFileId: string
  ownerId: string
  tokens: FileTokens
}): Promise<void> => {
  try {
    await setDoc(doc(db, 'files', googleFileId), {
      owner: ownerId,
      ...tokens
    })

    console.log(`Tokens stored for file ${googleFileId}`)
  } catch (error) {
    console.error('Error storing file tokens:', error)
    throw error
  }
}

/**
 * Updates the access token for a Google Drive file in Firestore.
 */
export const updateFileAccessToken = async ({
  googleFileId,
  accessToken,
  expiresAt
}: {
  googleFileId: string
  accessToken: string
  expiresAt: number
}): Promise<void> => {
  try {
    await setDoc(
      doc(db, 'files', googleFileId),
      { accessToken, expiresAt },
      { merge: true }
    )

    console.log(`Access token updated for file ${googleFileId}`)
  } catch (error) {
    console.error('Error updating file access token:', error)
    throw error
  }
}

/**
 * Retrieves tokens for a specific Google Drive file from Firestore.
 */
export const getFileTokens = async ({
  googleFileId
}: {
  googleFileId: string
}): Promise<FileTokens | null> => {
  try {
    const docRef = doc(db, 'files', googleFileId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as FileTokens
    }
    return null
  } catch (error) {
    console.error('Error retrieving file tokens:', error)
    throw error
  }
}

/**
 * Retrieves tokens from Firestore for a specific user.
 */
export const getUserTokens = async ({
  userId
}: {
  userId: string
}): Promise<UserTokens | null> => {
  try {
    const docRef = doc(db, 'users', userId, 'tokens', 'googleDrive')
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as UserTokens
    }
    return null
  } catch (error) {
    console.error('Error retrieving user tokens:', error)
    throw error
  }
}

/**
 * Retrieves or refreshes the access token for a Google Drive file.
 */
export const getAccessTokenForFile = async ({
  googleFileId
}: {
  googleFileId: string
}): Promise<string | null> => {
  try {
    const tokens = await getFileTokens({ googleFileId })
    if (!tokens) {
      console.error(`No tokens found for file: ${googleFileId}`)
      return null
    }

    // Check if the access token is still valid
    if (tokens.expiresAt > Date.now()) {
      console.log('Access token is still valid')
      return tokens.accessToken
    }

    // Refresh the access token
    console.log(`Refreshing access token for file: ${googleFileId}...`)
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
        refresh_token: tokens.refreshToken,
        grant_type: 'refresh_token'
      })
    })

    if (!response.ok) {
      throw new Error('Failed to refresh access token')
    }

    const data = await response.json()
    const newAccessToken = data.access_token
    const expiresIn = data.expires_in // Token expiry time in seconds
    const expiresAt = Date.now() + expiresIn * 1000

    // Update the access token in Firestore
    await updateFileAccessToken({
      googleFileId,
      accessToken: newAccessToken,
      expiresAt
    })

    console.log(`Access token refreshed successfully for file: ${googleFileId}`)
    return newAccessToken
  } catch (error) {
    console.error('Error refreshing access token:', error)
    throw error
  }
}

/**
 * Deletes tokens for a Google Drive file from Firestore.
 */
export const deleteFileTokens = async ({
  googleFileId
}: {
  googleFileId: string
}): Promise<void> => {
  try {
    await setDoc(doc(db, 'files', googleFileId), {})
    console.log(`Tokens deleted successfully for file ${googleFileId}`)
  } catch (error) {
    console.error('Error deleting file tokens:', error)
    throw error
  }
}

/**
 * Deletes user tokens from Firestore.
 */
export const deleteUserTokens = async ({ userId }: { userId: string }): Promise<void> => {
  try {
    await setDoc(doc(db, 'users', userId, 'tokens', 'googleDrive'), {})
    console.log(`Tokens deleted successfully for user ${userId}`)
  } catch (error) {
    console.error('Error deleting user tokens:', error)
    throw error
  }
}
