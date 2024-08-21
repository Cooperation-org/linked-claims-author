import {
  saveToGoogleDrive,
  CredentialEngine,
  StorageContext,
  StorageFactory
} from 'trust_storage'

import { ethers } from 'ethers'

export async function getMetaMaskAddress(): Promise<string | null> {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request MetaMask account access
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      // Get the user's MetaMask address
      const address = await signer.getAddress()
      return address
    } catch (error) {
      console.error('MetaMask error:', error)
      return null
    }
  } else {
    console.error('MetaMask not installed')
    return null
  }
}

export async function createDIDWithMetaMask(accessToken: string) {
  const metaMaskAddress = await getMetaMaskAddress()
  if (!metaMaskAddress) {
    throw new Error('MetaMask address could not be retrieved')
  }

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
  const formData = {
    expirationDate: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toISOString(),
    fullname: data.fullName,
    criteriaNarrative: data.credentialDescription,
    achievementDescription: data.credentialDescription,
    achievementName: data.credentialName
  }
  try {
    const credentialEngine = new CredentialEngine(accessToken)
    const storage = new StorageContext(
      StorageFactory.getStorageStrategy('googleDrive', { accessToken })
    )
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
  }
}

export { createDID, signCred }
