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
  Box
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

declare global {
  interface Window {
    gapi: any
  }
}

const ClaimsPage: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([])
  console.log(':  claims', claims)
  const [openClaim, setOpenClaim] = useState<string | null>(null)
  const [detailedClaim, setDetailedClaim] = useState<ClaimDetail | null>(null)
  const [loadingClaims, setLoadingClaims] = useState<{ [key: string]: boolean }>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [storage, setStorage] = useState<GoogleDriveStorage | null>(null)
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({})
  const [gapiInitialized, setGapiInitialized] = useState<boolean>(false)
  const { data: session } = useSession()
  const accessToken = session?.accessToken as string
  console.log('Session data:', session)
  console.log('Access token:', accessToken)

  // Load gapi and initialize the Drive API
  const loadGapiClient = () => {
    return new Promise<void>((resolve, reject) => {
      window.gapi.load('client:auth2', async () => {
        try {
          await window.gapi.client.init({
            apiKey: process.env.GOOGLE_API_KEY, // Loaded from env variables
            clientId: process.env.GOOGLE_CLIENT_ID, // Loaded from env variables
            scope: 'https://www.googleapis.com/auth/drive',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
          })
          resolve()
        } catch (error: unknown) {
          console.error('Error loading GAPI client:', error)
          if (error instanceof Error) {
            reject(new Error(`Error loading GAPI client: ${error.message}`))
          } else {
            reject(new Error('Error loading GAPI client: An unknown error occurred'))
          }
        }
      })
    })
  }

  useEffect(() => {
    if (accessToken) {
      console.log('Initializing Google Drive Storage with access token...')
      const storageInstance = new GoogleDriveStorage(accessToken)
      setStorage(storageInstance)
    } else {
      console.log('No access token found.')
    }

    // Ensure gapi is initialized only on the client-side
    if (typeof window !== 'undefined' && window.gapi) {
      loadGapiClient()
        .then(() => {
          console.log('GAPI client initialized successfully.')
          setGapiInitialized(true)
        })
        .catch(error => {
          console.error('Failed to initialize gapi:', error)
        })
    }
  }, [accessToken])

  const getContent = useCallback(
    async (fileId: string): Promise<ClaimDetail> => {
      if (!storage) {
        console.log('Storage is not initialized.')
        throw new Error('Storage is not initialized')
      }
      const file = await storage.retrieve(fileId)
      return file as ClaimDetail
    },
    [storage]
  )

  const getAllClaims = useCallback(async (): Promise<any> => {
    if (!storage) {
      console.log('Storage is not initialized.')
      throw new Error('Storage is not initialized')
    }
    console.log('Fetching claims from Google Drive...')
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
    if (!window.gapi || !gapiInitialized) return

    try {
      const commentsList = await window.gapi.client.drive.comments.list({
        fileId: fileId,
        fields: 'comments(author, content, createdTime)'
      })
      console.log('Comments list:', commentsList)

      const commentsData =
        commentsList.result.comments?.map((comment: any) => ({
          author: comment.author.displayName,
          content: comment.content,
          createdTime: comment.createdTime
        })) || []

      setComments(prevState => ({ ...prevState, [fileId]: commentsData }))
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  useEffect(() => {
    if (!accessToken || !storage) {
      console.log('Setting error message: Please sign in to view your claims')
      setErrorMessage('Please sign in to view your claims')
      return
    }
    const fetchClaims = async () => {
      try {
        console.log('Fetching all claims...')
        const claimsData = await getAllClaims()
        if (claimsData.length === 0) {
          console.log('No claims available.')
          setErrorMessage('No claims available.')
        } else {
          setClaims(claimsData)
          setErrorMessage(null) // Clear error message when claims are fetched successfully
        }
      } catch (error) {
        console.error('Error fetching claims:', error)
        setErrorMessage('Failed to fetch claims.')
      }
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
      await fetchComments(claimId)
    }
  }

  return errorMessage ? (
    <Container>
      <Typography variant='h4'>Previous Claims</Typography>
      <Typography color='error'>{errorMessage}</Typography>
    </Container>
  ) : (
    <Container>
      <Typography variant='h4'>Previous Claims</Typography>
      <List>
        {claims.map(claim => (
          <div key={claim.id}>
            <ListItem onClick={() => handleClaimClick(claim.id, claim)}>
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
                        Management Skills
                      </Typography>
                      <Box
                        sx={{
                          ...credentialBoxStyles,
                          bgcolor: '#f9f9f9'
                        }}
                      >
                        <Box sx={{ mt: '2px' }}>
                          <SVGDate />
                        </Box>
                        <Typography sx={{ ...commonTypographyStyles, fontSize: '13px' }}>
                          {detailedClaim?.credentialSubject?.duration}
                        </Typography>
                      </Box>
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
                            (porto: { url: string; name: string }) => (
                              <li key={porto.url}>
                                <Link href={porto.url}>{porto.name}</Link>
                              </li>
                            )
                          )}
                        </ul>
                      </Box>
                    </Box>

                    {/* Comments Box */}
                    <Box
                      sx={{
                        border: '1px solid #003FE0',
                        borderRadius: '10px',
                        p: '15px',
                        bgcolor: '#f1f1f1'
                      }}
                    >
                      <Typography variant='h6'>Comments</Typography>
                      {comments[claim.id] && comments[claim.id].length > 0 ? (
                        comments[claim.id].map(comment => (
                          <Box key={comment.createdTime} mb={2}>
                            <Typography>
                              <strong>{comment.author}</strong>: {comment.content}
                            </Typography>
                            <Typography variant='caption'>
                              {new Date(comment.createdTime).toLocaleString()}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Typography>No comments found.</Typography>
                      )}
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
