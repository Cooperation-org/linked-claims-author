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
import Link from 'next/link'
import { SVGBadge, SVGDate } from '../Assets/SVGs'
import {
  credentialBoxStyles,
  commonTypographyStyles,
  evidenceListStyles
} from '../components/Styles/appStyles'
import { GoogleDriveStorage } from '@cooperation/vc-storage'

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
  content: string
  createdTime: string
}

const ClaimsPage: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([])
  const [openClaim, setOpenClaim] = useState<string | null>(null)
  const [detailedClaim, setDetailedClaim] = useState<ClaimDetail | null>(null)
  const [loadingClaims, setLoadingClaims] = useState<{ [key: string]: boolean }>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [storage, setStorage] = useState<GoogleDriveStorage | null>(null)
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({})
  const { data: session } = useSession()
  const accessToken = session?.accessToken as string

  useEffect(() => {
    if (accessToken) {
      const storageInstance = new GoogleDriveStorage(accessToken)
      setStorage(storageInstance)
    }
  }, [accessToken])

  const getContent = useCallback(
    async (fileId: string): Promise<ClaimDetail> => {
      if (!storage) throw new Error('Storage is not initialized')
      const file = await storage.retrieve(fileId)
      return file as ClaimDetail
    },
    [storage]
  )

  const getAllClaims = useCallback(async (): Promise<any> => {
    if (!storage) throw new Error('Storage is not initialized')
    const claimsData = await storage.getAllClaims()
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

  const fetchComments = async (fileId: string) => {
    if (!accessToken) {
      console.log('Access Token not available.')
      return
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v2/files/${fileId}/comments`,
        {
          headers: new Headers({
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          })
        }
      )
      const data = await response.json()
      if (response.ok) {
        const commentsData = data.items.map((comment: { author: { displayName: any }; content: any; createdTime: any }) => ({
          author: comment.author.displayName,
          content: comment.content,
          createdTime: comment.createdTime
        }))
        setComments(prevState => ({ ...prevState, [fileId]: commentsData }))
      } else {
        throw new Error(data.error.message)
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  useEffect(() => {
    if (!accessToken || !storage) {
      setErrorMessage('Please sign in to view your claims')
      return
    }
    const fetchClaims = async () => {
      const claimsData = await getAllClaims()
      setClaims(claimsData)
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
      setDetailedClaim(claimDetails)
      setOpenClaim(claimId)
      setLoadingClaims(prevState => ({ ...prevState, [claimId]: false }))
      fetchComments(claimId)
    }
  }

  return errorMessage ? (
    <Container>
      <Typography
        sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
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
                        <Link
                          href={`/View/${encodeURIComponent(
                            `https://drive.google.com/file/d/${claim.id}/view`
                          )}`}
                        >
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
                        <Link
                          href={`/AskForRecommendation/${encodeURIComponent(
                            `https://drive.google.com/file/d/${claim.id}/view`
                          )}`}
                        >
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
                      <Box
                        sx={{
                          border: '1px solid #003FE0',
                          borderRadius: '10px',
                          p: '15px',
                          bgcolor: '#f1f1f1'
                        }}
                      >
                        <Typography variant='h6'>Comments</Typography>
                        {comments[claim.id].map((comment, index) => (
                          <Box key={index} mb={2}>
                            <Typography>
                              <strong>{comment.author}</strong>: {comment.content}
                            </Typography>
                            <Typography variant='caption'>
                              {new Date(comment.createdTime).toLocaleString()}
                            </Typography>
                          </Box>
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
  ) : (
    <h1>{errorMessage}</h1>
  )
}

export default ClaimsPage
