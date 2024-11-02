import { GoogleDriveStorage, saveToGoogleDrive } from '@cooperation/vc-storage'
import { createDID, signCred } from './signCred'



export async function saveRaw(accessToken: string | undefined, data: any) {
  if (!accessToken) {
    throw new Error('No access token available')
  }

  const storage = new GoogleDriveStorage(accessToken)
  try {
    const file = (await saveToGoogleDrive(storage, data, 'VC')) as any

    console.log('saved to google drive:', file)
    return file
  } catch (error) {
    console.error('Google Drive operation failed:', error)
    throw error
  }
}

export function makeGoogleDriveLink(file: any) {
   return `https://drive.google.com/file/d/${file.id}/view`
}
