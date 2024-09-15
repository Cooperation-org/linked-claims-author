import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

declare global {
  interface Window {
    gapi: any
  }
}

const useGoogleDrive = () => {
  const { data: session } = useSession()
  const [gapiLoaded, setGapiLoaded] = useState(false)
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [fileMetadata, setFileMetadata] = useState<any | null>(null)
  const [ownerEmail, setOwnerEmail] = useState<string | null>(null)

  useEffect(() => {
    let gapiInitialized = false
    const initializeGapi = () => {
      if (gapiInitialized) return
      console.log('Initializing Google API client...')
      window.gapi.load('client', async () => {
        try {
          console.log('Loading Google API client...')
          await window.gapi.client.init({
            apiKey: process.env.GOOGLE_API_KEY,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
          })

          if (session?.accessToken) {
            console.log('Setting access token...')
            window.gapi.client.setToken({
              access_token: session.accessToken
            })
          }
          console.log('Google API client initialized successfully.')
          gapiInitialized = true
          setTimeout(() => setGapiLoaded(true), 1000)
        } catch (error) {
          console.error('Error initializing Google API client:', error)
        }
      })
    }

    if (window.gapi) {
      initializeGapi()
    } else {
      const script = document.createElement('script')
      script.src = 'https://apis.google.com/js/api.js'
      script.onload = initializeGapi
      document.body.appendChild(script)
    }
  }, [session])

  const fetchFileContent = async (fileId: string, resourceKey: string = '') => {
    const cachedContent = localStorage.getItem(`fileContent_${fileId}`)
    if (cachedContent) {
      console.log('Using cached file content...')
      setFileContent(cachedContent)
      return
    }

    console.log('Fetching file content from Google API:', fileId)
    try {
      const response = await window.gapi.client.drive.files.get({
        fileId: fileId,
        alt: 'media',
        headers: {
          'X-Goog-Drive-Resource-Keys': `${fileId}/${resourceKey}`
        }
      })

      console.log('Fetched file content:', response.body)
      setFileContent(response.body)
      localStorage.setItem(`fileContent_${fileId}`, response.body)
    } catch (error) {
      console.error('Error fetching file content:', error)
    }
  }

  const fetchFileMetadata = async (fileId: string, resourceKey: string = '') => {
    const cachedMetadata = localStorage.getItem(`fileMetadata_${fileId}`)
    if (cachedMetadata) {
      console.log('Using cached file metadata...')
      setFileMetadata(JSON.parse(cachedMetadata))
      return
    }
    console.log('Fetching file metadata from Google API:', fileId)
    try {
      const response = await window.gapi.client.drive.files.get({
        fileId: fileId,
        fields: 'owners, id, name, mimeType',
        headers: {
          'X-Goog-Drive-Resource-Keys': `${fileId}/${resourceKey}`
        }
      })

      console.log('Fetched file metadata:', response.result)
      setFileMetadata(response.result)
      localStorage.setItem(`fileMetadata_${fileId}`, JSON.stringify(response.result))
      if (response.result.owners && response.result.owners.length > 0) {
        setOwnerEmail(response.result.owners[0].emailAddress)
      } else {
        console.warn('No owners found for this file.')
      }
    } catch (error) {
      console.error('Error fetching file metadata:', error)
    }
  }

  return {
    gapiLoaded,
    fetchFileContent,
    fetchFileMetadata,
    fileContent,
    fileMetadata,
    ownerEmail
  }
}

export default useGoogleDrive
