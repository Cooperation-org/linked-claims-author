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
    async (fileID: string): Promise<ClaimDetail> => {
      const file = await storage?.retrieve(fileID)
      return file as ClaimDetail
    },
    [storage]
  )
  function extractGoogleDriveId(url: string) {
    const marker = '/file/d/'
    const startIndex = url.indexOf(marker)

    if (startIndex !== -1) {
      const idPart = url.substring(startIndex + marker.length)
      const endIndex = idPart.indexOf('/')
      if (endIndex !== -1) {
        return idPart.substring(0, endIndex)
      } else {
        return idPart
      }
    } else {
      return null
    }
  }
  const getComments = useCallback(
    async (fileID: string): Promise<ClaimDetail> => {
      const file = await storage?.getFileComments(fileID)
      const comments: any[] = []
      await Promise.all(
        file?.map(async (file: any) => {
          const ID = extractGoogleDriveId(file.content)
          const comment = await storage?.retrieve(ID as any)
          if (comment) comments.push(comment)
        }) ?? []
      )
      return comments as unknown as ClaimDetail
    },
    [storage]
  )

  const fetchFileMetadata = async (fileID: string, resourceKey: string = '') => {
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
        const metadata = await response.json()
        console.log('Fetched Metadata:', metadata)

        setFileMetadata(metadata)

        if (metadata.owners && metadata.owners.length > 0) {
          setOwnerEmail(metadata.owners[0].emailAddress)
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
    ownerEmail,
    getComments
  }
}

export default useGoogleDrive
