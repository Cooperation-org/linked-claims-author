import { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { GoogleDriveStorage } from '@cooperation/vc-storage'

interface ClaimDetail {
  '@context': string[]
  id: string
  type: string[]
  issuer: {
    id: string
    type: string[]
  }
  issuanceDate: string
  expirationDate: string
  credentialSubject: {
    type: string[]
    name: string
    achievement: any
    duration: string
    portfolio: any
  }
}

const useGoogleDrive = () => {
  const { data: session } = useSession()
  const [fileMetadata, setFileMetadata] = useState<any | null>(null)
  const [ownerEmail, setOwnerEmail] = useState<string | null>(null)
  const [storage, setStorage] = useState<GoogleDriveStorage | null>(null)
  const accessToken = session?.accessToken

  useEffect(() => {
    if (accessToken) {
      const storageInstance = new GoogleDriveStorage(accessToken)
      setStorage(storageInstance)
    }
  }, [accessToken])

  const getContent = useCallback(
    async (fileId: string): Promise<ClaimDetail> => {
      // if (!storage) throw new Error('Storage is not initialized')
      const file = await storage?.retrieve(fileId)
      return file as ClaimDetail
    },
    [storage]
  )

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
    getContent,
    fetchFileMetadata,
    fileMetadata,
    ownerEmail
  }
}

export default useGoogleDrive
