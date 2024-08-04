'use client'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
  CircularProgress,
  Button
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { StorageContext, StorageFactory } from 'trust_storage'

// Define types
interface Claim {
  id: string
  achievementName: string
}

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
  }
}

const ClaimsPage: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [openClaim, setOpenClaim] = useState<string | null>(null)
  const [detailedClaim, setDetailedClaim] = useState<ClaimDetail | null>(null)
  const [loadingClaims, setLoadingClaims] = useState<{ [key: string]: boolean }>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [storage, setStorage] = useState<StorageContext | null>(null)
  const { data: session } = useSession()
  const accessToken = session?.accessToken as string

  useEffect(() => {
    if (accessToken) {
      const storageInstance = new StorageContext(
        StorageFactory.getStorageStrategy('googleDrive', { accessToken })
      )
      setStorage(storageInstance)
    }
  }, [accessToken])

  const getContent = useCallback(
    async (fileId: string): Promise<ClaimDetail> => {
      if (!storage) throw new Error('Storage is not initialized')
      const file = await storage.getFileContent(fileId)
      return file as ClaimDetail
    },
    [storage]
  )

  const getAllClaims = useCallback(async (): Promise<Claim[]> => {
    if (!storage) throw new Error('Storage is not initialized')
    const claimsData = (await storage.getAllClaims()) as any
    if (!claimsData.files) return []
    const claimsNames: Claim[] = await Promise.all(
      claimsData.files.map(async (claim: any) => {
        const content = await getContent(claim.id)
        const achievementName =
          content.credentialSubject.achievement?.[0]?.name || 'Unnamed Achievement'
        return { id: claim.id, achievementName }
      })
    )
    return claimsNames
  }, [getContent, storage])

  useEffect(() => {
    if (!accessToken || !storage) {
      setErrorMessage('Please sign in to view your claims')
      setLoading(false)
      return
    }
    const fetchClaims = async () => {
      const claimsData = await getAllClaims()
      console.log('🚀 ~ fetchClaims ~ claimsData:', claimsData)
      setClaims(claimsData)
      setLoading(false)
    }

    fetchClaims()
  }, [accessToken, storage, getAllClaims])

  const handleClaimClick = async (claimId: string) => {
    if (openClaim === claimId) {
      setOpenClaim(null)
      setDetailedClaim(null)
    } else {
      setLoadingClaims(prevState => ({ ...prevState, [claimId]: true }))
      const claimDetails = await getContent(claimId)
      setDetailedClaim(claimDetails)
      setOpenClaim(claimId)
      setLoadingClaims(prevState => ({ ...prevState, [claimId]: false }))
    }
  }

  if (loading) {
    return (
      <Container
        sx={{
          height: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress />
      </Container>
    )
  }

  return errorMessage ? (
    <Container>
      <List>
        <>
          <Typography
            variant='h4'
            sx={{
              mt: 5
            }}
          >
            Previous Claims
          </Typography>
          {claims.map(claim => (
            <div key={claim.id}>
              <ListItem button onClick={() => handleClaimClick(claim.id)}>
                <ListItemText primary={claim.achievementName} />
                {openClaim === claim.id ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openClaim === claim.id} timeout='auto' unmountOnExit>
                <Container>
                  {loadingClaims[claim.id] ? (
                    <div>
                      <CircularProgress />
                    </div>
                  ) : (
                    <pre>{JSON.stringify(detailedClaim, null, 2)}</pre>
                  )}
                </Container>
              </Collapse>
            </div>
          ))}
        </>
      </List>
      <Link href='/CredentialForm'>
        <Button
          sx={{
            fontSize: '0.8rem',
            color: 'blue',
            mt: 5,
            border: 'solid 1px blue',
            borderRadius: '50px',
            px: 2
          }}
        >
          Add another one
        </Button>
      </Link>
    </Container>
  ) : (
    <h1>{errorMessage}</h1>
  )
}

export default ClaimsPage
