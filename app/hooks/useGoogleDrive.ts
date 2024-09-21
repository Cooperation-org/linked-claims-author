import { useState } from 'react'
import { useSession } from 'next-auth/react'

const useGoogleDrive = () => {
  const { data: session } = useSession()
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [fileMetadata, setFileMetadata] = useState<any | null>(null)
  const [ownerEmail, setOwnerEmail] = useState<string | null>(null)

  const fetchFileContent = async (fileId: any, resourceKey: string = '') => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session?.accessToken}`
          }
        }
      )
      console.log(":  fetchFileContent  response", response)

      if (response.ok) {
        const content = await response.text()
        setFileContent(content)
      } else {
        console.error('Error fetching file content:', response)
      }
    } catch (error) {
      console.error('Error fetching file content:', error)
    }
  }

  const fetchFileMetadata = async (fileId: any, resourceKey: string = '') => {
    const cachedMetadata = localStorage.getItem(`fileMetadata_${fileId}`)
    if (cachedMetadata) {
      console.log('Using cached file metadata...')
      const parsedMetadata = JSON.parse(cachedMetadata)
      setFileMetadata(parsedMetadata)
      if (parsedMetadata.owners && parsedMetadata.owners.length > 0) {
        setOwnerEmail(parsedMetadata.owners[0].emailAddress)
        console.log(
          'Owner email from cached metadata:',
          parsedMetadata.owners[0].emailAddress
        )
      }
      return
    }

    console.log('Fetching file metadata from Google API:', fileId)
    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            'X-Goog-Drive-Resource-Keys': `${fileId}/${resourceKey}`
          }
        }
      )

      if (response.ok) {
        const metadata = await response.json()
        console.log('Fetched file metadata:', metadata)
        setFileMetadata(metadata)
        localStorage.setItem(`fileMetadata_${fileId}`, JSON.stringify(metadata))
        if (metadata.owners && metadata.owners.length > 0) {
          const ownerEmail = metadata.owners[0].emailAddress
          setOwnerEmail(ownerEmail)
          console.log('Fetched owner email:', ownerEmail)
        } else {
          console.warn('No owners found for this file.')
        }
      } else {
        console.error('Error fetching file metadata:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching file metadata:', error)
    }
  }

  return {
    fetchFileContent,
    fetchFileMetadata,
    fileContent,
    fileMetadata,
    ownerEmail
  }
}

export default useGoogleDrive
