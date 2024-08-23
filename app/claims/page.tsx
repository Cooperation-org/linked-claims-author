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
  Button,
  Box
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { StorageContext, StorageFactory } from 'trust_storage'
import { SVGBadge, SVGDate } from '../Assets/SVGs'
import {
  credentialBoxStyles,
  commonTypographyStyles,
  evidenceListStyles
} from '../components/Styles/appStyles'

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
    duration: string
    portfolio: any
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

  const getAllClaims = useCallback(async (): Promise<any> => {
    if (!storage) throw new Error('Storage is not initialized')
    const claimsData = (await storage.getAllClaims()) as any
    if (!claimsData.files) return []
    const claimsNames: Claim[] = await Promise.all(
      claimsData.files.map(async (claim: any) => {
        console.log(':  claimsData.files.map  claimsData', claimsData)
        const content = await getContent(claim.id)
        console.log(':  claimsData.files.map  content', content)
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

  const handleClaimClick = async (claimId: string, claim: any) => {
    if (openClaim === claimId) {
      setOpenClaim(null)
      setDetailedClaim(null)
    } else {
      setLoadingClaims(prevState => ({ ...prevState, [claimId]: true }))
      const claimDetails = await getContent(claimId)
      console.log('claimDetails', claimDetails)
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
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 'calc(100vh - 153px)'
      }}
    >
      <List>
        <>
          <Typography
            variant='h4'
            sx={{
              mt: 5,
              textAlign: 'center'
            }}
          >
            Previous Claims
          </Typography>
          {claims.map(claim => (
            <div key={claim.id}>
              <ListItem button onClick={() => handleClaimClick(claim.id, claim)}>
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
                    <Box
                      sx={{
                        border: '1px solid #003FE0',
                        borderRadius: '10px',
                        p: '15px',
                        mt: '10px'
                      }}
                    >
                      {claims ? (
                        <>
                          <Box
                            sx={{
                              display: 'flex',
                              gap: '5px',
                              alignItems: 'center'
                            }}
                          >
                            <SVGBadge />
                            <Typography
                              sx={{ fontWeight: 700, fontSize: '13px', color: '#202E5B' }}
                            >
                              {detailedClaim?.credentialSubject?.name || ''} has claimed:
                            </Typography>
                          </Box>
                          <Box>
                            <Box>
                              <Typography
                                sx={{
                                  color: '#202E5B',
                                  fontFamily: 'Inter',
                                  fontSize: '24px',
                                  fontWeight: 700,
                                  letterSpacing: '0.075px',
                                  mb: '10px'
                                }}
                              >
                                Management Skills
                              </Typography>
                              <Box
                                sx={{
                                  ...credentialBoxStyles,
                                  bgcolor: '#d5e1fb'
                                }}
                              >
                                <Box sx={{ mt: '2px' }}>
                                  <SVGDate />
                                </Box>
                                <Typography
                                  sx={{ ...commonTypographyStyles, fontSize: '13px' }}
                                >
                                  {detailedClaim?.credentialSubject?.duration}
                                </Typography>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px'
                              }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: 'Lato',
                                  fontSize: '17px',
                                  letterSpacing: '0.075px',
                                  lineHeight: '24px'
                                }}
                              >
                                {detailedClaim?.credentialSubject?.achievement[0]?.description.replace(
                                  /<\/?[^>]+>/gi,
                                  ''
                                )}
                              </Typography>
                              <Box>
                                <Typography>Earning criteria:</Typography>
                                <ul style={{ marginLeft: '25px' }}>
                                  <li>
                                    {detailedClaim?.credentialSubject?.achievement[0]?.criteria?.narrative.replace(
                                      /<\/?[^>]+>/gi,
                                      ''
                                    )}
                                  </li>
                                </ul>
                              </Box>
                              <Box>
                                <Typography>Supporting Evidence:</Typography>
                                <ul style={evidenceListStyles}>
                                  {detailedClaim?.credentialSubject?.portfolio?.map(
                                    (porto: { url: any; name: any }) => (
                                      <li key={porto.url}>
                                        <Link href={porto.url}>{porto.name}</Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </Box>
                            </Box>
                          </Box>
                        </>
                      ) : (
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <CircularProgress />
                        </Box>
                      )}
                    </Box>
                  )}
                </Container>
              </Collapse>
            </div>
          ))}
        </>
      </List>
      <Link href='/CredentialForm'>
        <Box
          sx={{
            width: '100%',
            mb: 5,
            ml: 'auto',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button
            variant='contained'
            sx={{
              fontSize: '0.8rem',
              mt: 5,

              border: 'solid 1px blue',
              borderRadius: '50px',
              px: 2,
              fontWeight: 600
            }}
          >
            Add another one
          </Button>
        </Box>
      </Link>
    </Container>
  ) : (
    <h1>{errorMessage}</h1>
  )
}

export default ClaimsPage
