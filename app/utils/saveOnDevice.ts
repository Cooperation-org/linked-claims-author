import { CredentialEngine } from '@cooperation/vc-storage'
import { createDID, generateCredentialData } from './signCred'

/**
 * Signs and saves the signed credential on the user's device
 * @param data
 * @returns
 */
export async function signAndSaveOnDevice(data: any) {
  if (typeof window === 'undefined') return // Ensure this only runs in the browser

  // Generate DID, credential data, and sign the VC
  const newDid = await createDID()
  const formData = generateCredentialData(data)
  const credentialEngine = new CredentialEngine()
  const { didDocument, keyPair } = newDid

  const signedVC = await credentialEngine.signVC(formData, 'VC', keyPair, didDocument.id)

  const jsonString = JSON.stringify(signedVC, null, 2)

  // Check if File System Access API is available
  if ('showSaveFilePicker' in window) {
    try {
      // Use File System Access API to show save file dialog
      const options = {
        suggestedName: `${data.credentialName}.json`,
        types: [
          {
            description: 'JSON file',
            accept: { 'application/json': ['.json'] }
          }
        ]
      }

      // Open save file picker
      const fileHandle = await (window as any).showSaveFilePicker(options)

      // Create writable stream to save the file
      const writable = await fileHandle.createWritable()
      await writable.write(jsonString)

      // Close the writable stream
      await writable.close()

      console.log('File saved successfully.')
    } catch (error) {
      console.error('File save was canceled or failed:', error)
    }
  } else {
    // Fallback to automatic download if File System Access API is not available
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `${data.credentialName}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    console.log('File downloaded automatically.')
  }
}
