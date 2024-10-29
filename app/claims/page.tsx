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
import Link from 'next/link'
import { SVGBadge, SVGDate } from '../Assets/SVGs'
import {
  credentialBoxStyles,
  commonTypographyStyles,
  evidenceListStyles
} from '../components/Styles/appStyles'

// Define types
interface Claim {
  [x: string]: any
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
const cleanHTML = (htmlContent: string) => {
  return htmlContent
    .replace(/<p><br><\/p>/g, '')
    .replace(/<p><\/p>/g, '')
    .replace(/<br>/g, '')
    .replace(/class="[^"]*"/g, '')
    .replace(/style="[^"]*"/g, '')
}
const ClaimsPage: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([])
  const [openClaim, setOpenClaim] = useState<string | null>(null)
  const [detailedClaim, setDetailedClaim] = useState<ClaimDetail | null>(null)
  const [loadingClaims, setLoadingClaims] = useState<{ [key: string]: boolean }>({})
  const [storage, setStorage] = useState<GoogleDriveStorage | null>(null)
  const [loading, setLoading] = useState(true)
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
    return claimsData
  }, [storage])

  useEffect(() => {
    const fetchClaims = async () => {
      setLoading(true)
      const claimsData = await getAllClaims()
      console.log(':  fetchClaims  claimsData', claimsData)
      setClaims(claimsData)
      setLoading(false)
    }

    fetchClaims()
  }, [accessToken, storage, getAllClaims])

  const handleClaimClick = async (claimId: string, content: any) => {
    try {
      if (openClaim === claimId) {
        setOpenClaim(null)
        setDetailedClaim(null)
      } else {
        setLoadingClaims(prevState => ({ ...prevState, [claimId]: true }))
        setDetailedClaim(content)
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
        My Skills
      </Typography>
      <List>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100%'
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          claims.map(claim => (
            <div key={claim.id}>
              <ListItem
                button
                onClick={() => handleClaimClick(claim.content.id, claim.content)}
              >
                <ListItemText
                  primary={claim.content.credentialSubject?.achievement?.[0]?.name}
                />
                {openClaim === claim.content.id ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openClaim === claim.content.id} timeout='auto' unmountOnExit>
                <Container>
                  {loadingClaims[claim.content.id] ? (
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
                          <span
                            dangerouslySetInnerHTML={{
                              __html: cleanHTML(
                                detailedClaim?.credentialSubject?.achievement[0]
                                  ?.description || ''
                              )
                            }}
                          />
                        </Typography>
                        {detailedClaim?.credentialSubject?.achievement[0]?.criteria
                          ?.narrative && (
                          <Box>
                            <Typography>Earning criteria:</Typography>
                            <ul style={{ marginLeft: '25px' }}>
                              <li>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: cleanHTML(
                                      detailedClaim?.credentialSubject?.achievement[0]
                                        ?.criteria?.narrative || ''
                                    )
                                  }}
                                />
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
          ))
        )}
      </List>
    </Container>
  )
}

export default ClaimsPage
