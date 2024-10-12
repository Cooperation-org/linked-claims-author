import { CredentialEngine } from '@cooperation/vc-storage'
import { FormData } from '../credentialForm/form/types/Types'

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

interface RecommendationI {
  recommendationText: string
  qualifications: string
  expirationDate: string
  fullName: string
  howKnow: string
  explainAnswer: string
  portfolio: { name: string; url: string }[]
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
  keyPair: string,
  type: 'RECOMMENDATION' | 'VC'
) => {
  if (!accessToken) {
    throw new Error('Access token is not provided')
  }
  let formData: FormDataI | RecommendationI
  let signedVC
  try {
    const credentialEngine = new CredentialEngine(accessToken)
    if (type === 'RECOMMENDATION') {
      formData = genearteRecommendtionData(data)
      signedVC = await credentialEngine.signVC(
        formData,
        'RECOMMENDATION',
        keyPair,
        issuerDid
      )
    } else {
      formData = generateCredentialData(data)
      signedVC = await credentialEngine.signVC(formData, 'VC', keyPair, issuerDid)
    }

    return signedVC
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

const genearteRecommendtionData = (data: any): RecommendationI => {
  return {
    recommendationText: data.recommendationText,
    qualifications: data.howKnow,
    expirationDate: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toISOString(),
    fullName: data.fullName,
    howKnow: data.howKnow,
    explainAnswer: data.explainAnswer,
    portfolio: data.portfolio
  }
}

export { createDID, signCred }
