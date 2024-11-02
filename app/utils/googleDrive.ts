export async function saveToGoogleDrive(accessToken: string | undefined, data: any) {
  if (!accessToken) {
    throw new Error('No access token available')
  }

  const storage = new GoogleDriveStorage(accessToken)
  try {
    const { didDocument, keyPair, issuerId } = await createDID(accessToken)
    const saveResponse = await saveToGoogleDrive(
      storage,
      {
        didDocument,
        keyPair
      },
      'DID'
    )
    const res = await signCred(accessToken, data, issuerId, keyPair, 'VC')
    const file = (await saveToGoogleDrive(storage, res, 'VC')) as any

    console.log('saved to google drive:', res)
    return file
  } catch (error) {
    console.error('Google Drive operation failed:', error)
    throw error
  }
}

export function makeGoogleDriveLink(file: any) {
   return `https://drive.google.com/file/d/${file.id}/view`
}
