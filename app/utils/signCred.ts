import {
  saveToGoogleDrive,
  CredentialEngine,
  StorageContext,
  StorageFactory
} from 'trust_storage'

const createDID = async (accessToken: string) => {
  const credentialEngine = new CredentialEngine(accessToken)
  const { didDocument, keyPair } = await credentialEngine.createDID()
  console.log('DID:', didDocument)
  return { didDocument, keyPair, issuerId: didDocument.id }
}

const signCred = async (
  accessToken: string,
  data: any,
  issuerDid: string,
  keyPair: string
) => {
  const formData = {
    expirationDate: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toISOString(),
    fullname: data.fullName,
    criteriaNarrative: data.credentialDescription,
    achievementDescription: data.credentialDescription,
    achievementName: data.credentialName
  }
  const credentialEngine = new CredentialEngine(accessToken)
  const storage = new StorageContext(
    StorageFactory.getStorageStrategy('googleDrive', { accessToken })
  )
  const unsignedVC = await credentialEngine.createUnsignedVC(formData, issuerDid)
  await saveToGoogleDrive(storage, unsignedVC, 'UnsignedVC')
  console.log('Unsigned VC:', unsignedVC)

  try {
    const signedVC = await credentialEngine.signVC(unsignedVC, keyPair)
    await saveToGoogleDrive(storage, signedVC, 'VC')
    console.log('Signed VC:', signedVC)
    return signedVC
  } catch (error) {
    console.error('Error during VC signing:', error)
  }
}

export { createDID, signCred }
