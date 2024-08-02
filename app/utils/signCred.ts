import {
  saveToGoogleDrive,
  CredentialEngine,
  StorageContext,
  StorageFactory
} from 'trust_storage'
import { credentialEngine, storage } from '../config/storage'

const createDID = async () => {
  const { didDocument, keyPair } = await credentialEngine.createDID()
  console.log('DID:', didDocument)
  return { didDocument, keyPair, issuerId: didDocument.id }
}

const signCred = async (data: any, issuerDid: string, keyPair: string) => {
  const unsignedVC = await credentialEngine.createUnsignedVC(data, issuerDid)
  await saveToGoogleDrive(storage, unsignedVC, 'UnsignedVC')
  console.log('Unsigned VC:', unsignedVC)

  try {
    const signedVC = await credentialEngine.signVC(unsignedVC, keyPair)
    await saveToGoogleDrive(storage, signedVC, 'VC')
    console.log('Signed VC:', signedVC)
  } catch (error) {
    console.error('Error during VC signing:', error)
  }
}

export { createDID, signCred }
