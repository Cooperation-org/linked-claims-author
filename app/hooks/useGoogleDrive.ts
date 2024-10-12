import { useState, useEffect, useCallback } from 'react'
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

interface FileMetadata {
  id: string
  name: string
  mimeType: string
  owners: { emailAddress: string }[]
}

const useGoogleDrive = () => {
  const { data: session } = useSession()
  const [fileMetadata, setFileMetadata] = useState<FileMetadata | null>(null)
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
    async (fileID: string): Promise<ClaimDetail> => {
      try {
        if (!storage) throw new Error('Storage is not initialized.')
        const file = await storage.retrieve(fileID)
        console.log('Fetched File:', file)
        return file as ClaimDetail
      } catch (error) {
        console.error('Failed to fetch claim details:', error)
        throw error
      }
    },
    [storage]
  )

  const fetchFileMetadata = useCallback(
    async (fileID: string, resourceKey: string = '') => {
      if (!fileID || !accessToken) {
        console.error('FileId or Access token is missing or invalid')
        return
      }

      try {
        const response = await fetch(
          `https://www.googleapis.com/drive/v3/files/${fileID}?fields=id,name,mimeType,owners&supportsAllDrives=true`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )

        if (response.ok) {
          const metadata: FileMetadata = await response.json()

          console.log('Fetched Metadata:', metadata)

          setFileMetadata((prev: FileMetadata | null) => {
            if (prev?.id === metadata.id) return prev
            return metadata
          })

          if (metadata.owners && metadata.owners.length > 0) {
            setOwnerEmail(metadata.owners[0].emailAddress)
          }
        } else {
          console.error('Error fetching file metadata:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching file metadata:', error)
      }
    },
    [accessToken]
  )

  return {
    getContent,
    fetchFileMetadata,
    fileMetadata,
    ownerEmail
  }
}

export default useGoogleDrive
