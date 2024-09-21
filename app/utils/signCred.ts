import {
  saveToGoogleDrive,
  CredentialEngine,
  GoogleDriveStorage
} from '@cooperation/vc-storage'
import { FormData } from '../CredentialForm/form/types/Types'

interface FormDataI {
  expirationDate: string
  fullName: string
  duration: string
  criteriaNarrative: string
  achievementDescription: string
  achievementName: string
  portfolio: { name: string; url: string }[]
  evidenceLink: string
  evidenceDescription: string
  credentialType: string
}

export async function createDIDWithMetaMask(metaMaskAddress: string) {
  const credentialEngine = new CredentialEngine()
  const { didDocument, keyPair } = await credentialEngine.createWalletDID(metaMaskAddress)
  return { didDocument, keyPair, issuerId: didDocument.id }
}

const createDID = async () => {
  const credentialEngine = new CredentialEngine()
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
  if (!accessToken) {
    throw new Error('Access token is not provided')
  }
  console.log('🚀 ~ data:', data)
  const formData: FormDataI = generateCredentialData(data)
  try {
    const credentialEngine = new CredentialEngine()
    const storage = new GoogleDriveStorage(accessToken)
    const unsignedVC = await credentialEngine.createUnsignedVC(formData, issuerDid)
    await saveToGoogleDrive(storage, unsignedVC, 'UnsignedVC')
    console.log('Unsigned VC:', unsignedVC)

    const signedVC = await credentialEngine.signVC(unsignedVC, keyPair)
    const signedVCFile = await saveToGoogleDrive(storage, signedVC, 'VC')
    console.log('🚀 ~ signedVCFile:', signedVCFile)
    console.log('Signed VC:', signedVC)
    return signedVCFile
  } catch (error) {
    console.error('Error during VC signing:', error)
    throw error
  }
}

export const generateCredentialData = (data: FormData): FormDataI => {
  return {
    expirationDate: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toISOString(),
    fullName: data.fullName || '',
    duration: data.credentialDuration || '',
    criteriaNarrative: data.credentialDescription || '',
    achievementDescription:
      typeof data.description === 'string'
        ? data.description
        : String(data.description || ''),
    achievementName: data.credentialName || '',
    portfolio:
      data.portfolio && data.portfolio.length > 0
        ? data.portfolio
        : [{ name: '', url: '' }],
    evidenceLink: data.evidenceLink || '',
    evidenceDescription: data.evidenceDescription || '',
    credentialType: data.persons || ''
  }
}

export { createDID, signCred }
