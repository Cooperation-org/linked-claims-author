import { CredentialEngine, StorageContext, StorageFactory } from 'trust_storage'

const accessToken = localStorage.getItem('accessToken')
if (!accessToken) {
  console.error('No access token found')
  throw new Error('No access token found')
}

const credentialEngine = new CredentialEngine(accessToken)
const storage = new StorageContext(
  StorageFactory.getStorageStrategy('googleDrive', { accessToken })
)

export { credentialEngine, storage }
