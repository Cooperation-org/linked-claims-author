import { saveToGoogleDrive, CredentialEngine, GoogleDriveStorage } from 'trust_storage'

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

export async function createDIDWithMetaMask(
  metaMaskAddress: string,
  accessToken: string
) {
  const credentialEngine = new CredentialEngine(accessToken)
  const { didDocument, keyPair } = await credentialEngine.createWalletDID(metaMaskAddress)
  return { didDocument, keyPair, issuerId: didDocument.id }
}

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
  if (!accessToken) {
    throw new Error('Access token is not provided')
  }
  console.log('🚀 ~ data:', data)
  const formData: FormDataI = {
    expirationDate: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toISOString(),
    fullName: data.fullName,
    duration: data.credentialDuration,
    criteriaNarrative: data.credentialDescription,
    achievementDescription: data.credentialDescription,
    achievementName: data.credentialName,
    portfolio: data.portfolio,
    evidenceLink: data.evidenceLink,
    evidenceDescription: data.description,
    credentialType: data.persons
  }
  console.log('🚀 ~ formData:', formData)
  try {
    const credentialEngine = new CredentialEngine(accessToken)
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

export { createDID, signCred }
