// utils/saveSession.ts
import { saveToGoogleDrive, GoogleDriveStorage } from '@cooperation/vc-storage'

interface SessionData {
  fullName: string
  credentialName: string
}
/**
 * Save essential session data to Google Drive.
 * @param data - Contains at least fullName and credentialName.
 * @param accessToken - User's access token.
 */
export const saveSession = async (data: SessionData, accessToken: string) => {
  try {
    const storage = new GoogleDriveStorage(accessToken)
    await saveToGoogleDrive(storage, data, 'SESSION')
  } catch (error: any) {
    console.error('Failed to save session:', error)
    throw new Error(error.message || 'Failed to save session')
  }
}
