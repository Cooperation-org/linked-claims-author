import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const useGoogleDrive = () => {
  const { data: session } = useSession()
  const [gapiLoaded, setGapiLoaded] = useState(false)
  const [fileData, setFileData] = useState(null)

  useEffect(() => {
    const initializeGapi = () => {
      console.log('Initializing Google API client...')
      window.gapi.load('client', async () => {
        try {
          console.log('Initializing Google API client: Loading client...')
          await window.gapi.client.init({
            apiKey: process.env.GOOGLE_API_KEY,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
          })

          console.log('Initializing Google API client: Setting token...')
          if (session?.accessToken) {
            window.gapi.client.setToken({
              access_token: session.accessToken
            })
          }
          console.log('Initializing Google API client: Done')
          setGapiLoaded(true)
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

  const fetchFile = async (
    fileId,
    resourceKey
    // , retries = 3, delay = 1000
  ) => {
    console.log('Fetching file:', fileId, resourceKey)
    try {
      const response = await window.gapi.client.drive.files.get({
        fileId: fileId,
        alt: 'media',
        headers: {
          'X-Goog-Drive-Resource-Keys': `${fileId}/${resourceKey}`
        }
      })
      console.log('Fetched file:', response.body)
      setFileData(response.body)
    } catch (error) {
      console.error('Error fetching file:', error)
      // if (error.result?.error?.code === 403 && retries > 0) {
      //   console.log(`Retrying... attempts left: ${retries - 1}`)
      //   setTimeout(() => fetchFile(fileId, resourceKey, retries - 1, delay * 2), delay)
      // }
    }
  }

  return { gapiLoaded, fetchFile, fileData }
}

export default useGoogleDrive
