import { saveToGoogleDrive, GoogleDriveStorage } from '@cooperation/vc-storage'

/**
 * Save FormData when user click save an exit
 * @param data
 */
export const saveSession = async (data: any, accessToken: string) => {
  try {
    const storage = new GoogleDriveStorage(accessToken)
    await saveToGoogleDrive({ storage, data, type: 'SESSION' })
  } catch (error: any) {
    throw new Error(error)
  }
}
