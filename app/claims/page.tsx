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
          content.credentialSubject?.achievement?.[0]?.name || 'Unnamed Achievement'
        return { id: claim.id, achievementName }
      })
    )
    return claimsNames
  }, [getContent, storage])
  const fetchComments = async (fileId: string) => {
    if (!accessToken) {
      console.log('Access Token not available.')
      return
    }

    try {
      const url = `https://www.googleapis.com/drive/v2/files/${fileId}/comments`
      console.log('Fetching comments from URL:', url)

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error.message)
      }

      const data = await response.json()

      const commentsData = data.items.map((comment: any) => {
        console.log('Raw comment content:', comment.content)

        let parsedContent: Record<string, string> = {}
        if (comment.content?.trim().startsWith('{')) {
          try {
            parsedContent = JSON.parse(comment.content)
          } catch (e) {
            console.error('Error parsing comment content:', e)
            parsedContent = {}
          }
        } else {
          console.warn('Comment content is not valid JSON:', comment.content)
          parsedContent = {
            recommendationText: comment.content
          }
        }

        return {
          author:
            typeof comment.author === 'string'
              ? comment.author
              : comment.author.displayName,
          howKnow: parsedContent['howKnow'] || '',
          recommendationText: parsedContent['recommendationText'] || '',
          qualifications:
            parsedContent['qualifications'] ||
            parsedContent['qualif'] ||
            parsedContent['mainAnswer'] ||
            '',
          createdTime: comment.createdTime
        }
      })
      setComments(prevState => ({ ...prevState, [fileId]: commentsData }))
      console.log('Parsed commentsData:', commentsData)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }
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
            <ListItem
              component='button'
              onClick={() => handleClaimClick(claim.id, claim)}
            >
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
                    {/* Comments Box */}
                    {comments[claim.id] && comments[claim.id].length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant='h6' sx={{ mb: 2 }}>
                          Recommendations
                        </Typography>
                        {comments[claim.id].map(comment => (
                          <Card
                            key={comment.createdTime}
                            variant='outlined'
                            sx={{
                              mb: 4,
                              borderRadius: 2,
                              boxShadow: 3,
                              borderColor: 'primary.main'
                            }}
                          >
                            <CardContent>
                              {/* Display the Author */}
                              <Typography variant='h5' component='div' gutterBottom>
                                {comment.author}
                              </Typography>

                              {/* How Known */}
                              {comment.howKnow && (
                                <Box sx={{ mt: 2 }}>
                                  <Typography variant='subtitle1' color='text.secondary'>
                                    How Known
                                  </Typography>
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: cleanHTML(comment.howKnow)
                                    }}
                                  />
                                </Box>
                              )}

                              {/* Recommendation Text */}
                              {comment.recommendationText && (
                                <Box sx={{ mt: 2 }}>
                                  <Typography variant='subtitle1' color='text.secondary'>
                                    Recommendation Text
                                  </Typography>
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: cleanHTML(comment.recommendationText)
                                    }}
                                  />
                                </Box>
                              )}

                              {/* Qualifications */}
                              {comment.qualifications && (
                                <Box sx={{ mt: 2 }}>
                                  <Typography variant='subtitle1' color='text.secondary'>
                                    Qualifications
                                  </Typography>
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: cleanHTML(comment.qualifications)
                                    }}
                                  />
                                </Box>
                              )}

                              {/* Created Time */}
                              <Typography variant='caption' sx={{ mt: 2 }}>
                                {formatCommentDate(comment.createdTime)}
                              </Typography>
                            </CardContent>
                          </Card>
                        ))}
                      </Box>
                    )}

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
