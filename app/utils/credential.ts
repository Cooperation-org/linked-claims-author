import { CredentialEngine, GoogleDriveStorage } from '@cooperation/vc-storage'
import { FormData } from '../skillform/form/types/Types'

interface FormDataI {
  expirationDate: string
  fullName: string
  duration: string
  criteriaNarrative: string
  achievementDescription: string
  achievementName: string
  portfolio: { googleId?: string; name: string; url: string }[]
  evidenceLink: string
  evidenceDescription: string
  credentialType: string
}

interface RecommendationI {
  recommendationText: string
  qualifications: string
  expirationDate: string
  fullName: string
  howKnow: string
  explainAnswer: string
  portfolio: { googleId?: string; name: string; url: string }[]
}

function getCredentialEngine(accessToken: string): CredentialEngine {
  if (!accessToken) {
    throw new Error('Access token is required to instantiate CredentialEngine.')
  }
  const storage = new GoogleDriveStorage(accessToken)
  return new CredentialEngine(storage)
}

/**
 * Create a DID using MetaMask address
 * @param metaMaskAddress - The user's MetaMask address
 * @param accessToken - The access token for authentication
 * @returns DID Document, Key Pair, and Issuer ID
 */
export async function createDIDWithMetaMask(
  metaMaskAddress: string,
  accessToken: string
) {
  const credentialEngine = getCredentialEngine(accessToken)
  const { didDocument, keyPair } = await credentialEngine.createWalletDID(metaMaskAddress)
  return { didDocument, keyPair, issuerId: didDocument.id }
}

/**
 * Create a DID
 * @param accessToken - The access token for authentication
 * @returns DID Document, Key Pair, and Issuer ID
 */
export const createDID = async (accessToken: string) => {
  const credentialEngine = getCredentialEngine(accessToken)
  const { didDocument, keyPair } = await credentialEngine.createDID()

  return { didDocument, keyPair, issuerId: didDocument.id }
}

/**
 * Sign a Verifiable Credential
 * @param accessToken - The access token for authentication
 * @param data - The data to include in the credential
 * @param issuerDid - The issuer's DID
 * @param keyPair - The key pair used for signing
 * @param type - The type of credential ('RECOMMENDATION' or 'VC')
 * @returns The signed Verifiable Credential
 */
const signCred = async (
  accessToken: string,
  data: any,
  issuerDid: string,
  keyPair: string,
  type: 'RECOMMENDATION' | 'VC',
  vcFileId: any
) => {
  if (!accessToken) {
    throw new Error('Access token is not provided')
  }
  let formData: FormDataI | RecommendationI
  let signedVC
  try {
    const credentialEngine = getCredentialEngine(accessToken)
    if (type === 'RECOMMENDATION') {
      formData = generateRecommendationData(data)
      signedVC = await credentialEngine.signVC({
        data: formData,
        type: 'RECOMMENDATION',
        keyPair,
        issuerId: issuerDid,
        vcFileId
      })
    } else {
      formData = generateCredentialData(data)
      signedVC = await credentialEngine.signVC({
        data: formData,
        type: 'VC',
        keyPair,
        issuerId: issuerDid
      })
    }

    return signedVC
  } catch (error) {
    console.error('Error during VC signing:', error)
    throw error
  }
}

/**
 * Generate credential data for 'VC' type
 * @param data - The form data
 * @returns FormDataI object
 */
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
        ? data.portfolio.map(({ googleId, ...rest }) => rest)
        : [{ name: '', url: '' }],
    evidenceLink: data?.evidenceLink || '',
    evidenceDescription: data.evidenceDescription || '',
    credentialType: data.persons || ''
  }
}

/**
 * Generate credential data for 'RECOMMENDATION' type
 * @param data - The form data
 * @returns RecommendationI object
 */
const generateRecommendationData = (data: any): RecommendationI => {
  return {
    recommendationText: data.recommendationText,
    qualifications: data.qualifications,
    expirationDate: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toISOString(),
    fullName: data.fullName,
    howKnow: data.howKnow,
    explainAnswer: data.explainAnswer,
    portfolio: data.portfolio
  }
}

export { signCred }
