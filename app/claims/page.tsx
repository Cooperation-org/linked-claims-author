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
  Box,
  Button
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useSession } from 'next-auth/react'
import { GoogleDriveStorage } from '@cooperation/vc-storage'
import useGoogleDrive from '../hooks/useGoogleDrive'
import Link from 'next/link'
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

interface Comment {
  author: string
  howKnow: string
  recommendationText: string
  qualifications: string
  createdTime: string
}

const ClaimsPage: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([])
  const [openClaim, setOpenClaim] = useState<string | null>(null)
  const [detailedClaim, setDetailedClaim] = useState<ClaimDetail | null>(null)
  const [loadingClaims, setLoadingClaims] = useState<{ [key: string]: boolean }>({})
  const [storage, setStorage] = useState<GoogleDriveStorage | null>(null)
  const { getContent } = useGoogleDrive()
  const { data: session } = useSession()
  const accessToken = session?.accessToken as string

  useEffect(() => {
    if (accessToken) {
      const storageInstance = new GoogleDriveStorage(accessToken)
      setStorage(storageInstance)
    }
  }, [accessToken])

  const getAllClaims = useCallback(async (): Promise<any> => {
    const claimsData = await storage?.getAllFilesByType('VCs')
    if (!claimsData?.length) return []

    const claimsNames: Claim[] = await Promise.all(
      claimsData.map(async (claim: any) => {
        const content = await getContent(claim.id)
        const achievementName =
          content.credentialSubject.achievement?.[0]?.name || 'Unnamed Achievement'
        return { id: claim.id, achievementName }
      })
    )
    return claimsNames
  }, [getContent, storage])

  useEffect(() => {
    const fetchClaims = async () => {
      const claimsData = await getAllClaims()
      setClaims(claimsData)
    }

    fetchClaims()
  }, [accessToken, storage, getAllClaims])

  const handleClaimClick = async (claimId: string, claim: any) => {
    try {
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
    } catch (error) {
      console.error('Error in handleClaimClick:', error)
    }
  }

  return (
    <Container>
      <Typography
        sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4 }}
        variant='h4'
      >
        Previous Claims
      </Typography>
      <List>
        {claims.map(claim => (
          <div key={claim.id}>
            <ListItem button onClick={() => handleClaimClick(claim.id, claim)}>
              <ListItemText primary={claim.achievementName} />
              {openClaim === claim.id ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openClaim === claim.id} timeout='auto' unmountOnExit>
              <Container>
                {loadingClaims[claim.id] ? (
                  <CircularProgress />
                ) : (
                  <Box>
                    {/* Claim Details Box */}
                    <Box
                      sx={{
                        border: '1px solid #003FE0',
                        borderRadius: '10px',
                        p: '15px',
                        mb: '10px',
                        bgcolor: '#d5e1fb'
                      }}
                    >
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
                          {detailedClaim?.credentialSubject?.name ?? ''} has claimed:
                        </Typography>
                      </Box>
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
                        {claim.achievementName}
                      </Typography>
                      {detailedClaim?.credentialSubject?.duration && (
                        <Box
                          sx={{
                            ...credentialBoxStyles,
                            bgcolor: '#f9f9f9'
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
                      )}
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
                      {detailedClaim?.credentialSubject?.achievement[0]?.criteria
                        ?.narrative && (
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
                      )}
                      {detailedClaim?.credentialSubject?.portfolio && (
                        <Box>
                          <Typography>Supporting Evidence:</Typography>
                          <ul style={evidenceListStyles}>
                            {detailedClaim?.credentialSubject?.portfolio?.map(
                              (porto: { url: any; name: any }) => (
                                <li key={porto.url}>
                                  <Link
                                    href={porto.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                  >
                                    {porto.name}
                                  </Link>
                                </li>
                              )
                            )}
                          </ul>
                        </Box>
                      )}
                      <Box
                        sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}
                      >
                        <Link href={`/view/${claim.id}`}>
                          <Button
                            variant='contained'
                            sx={{
                              backgroundColor: '#003FE0',
                              textTransform: 'none',
                              borderRadius: '100px'
                            }}
                          >
                            View Credential
                          </Button>
                        </Link>
                        <Link href={`/askforrecommendation/${claim.id}`}>
                          <Button
                            variant='contained'
                            sx={{
                              backgroundColor: '#003FE0',
                              textTransform: 'none',
                              borderRadius: '100px'
                            }}
                          >
                            Ask for Recommendation
                          </Button>
                        </Link>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Container>
            </Collapse>
          </div>
        ))}
      </List>
    </Container>
  )
}

export default ClaimsPage
