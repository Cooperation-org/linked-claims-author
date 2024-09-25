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
import ComprehensiveClaimDetails from '../test/[credentialData]/ComprehensiveClaimDetails'
import Link from 'next/link'
import { useParams } from 'next/navigation'

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
  const [loadingClaims, setLoadingClaims] = useState<{ [key: string]: boolean }>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [storage, setStorage] = useState<GoogleDriveStorage | null>(null)
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({})
  const { data: session } = useSession()
  const params = useParams()
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
        const commentsData = data.items.map(
          (comment: {
            author: { displayName: any }
            content: any
            createdTime: any
          }) => ({
            author: comment.author.displayName,
            content: comment.content,
            createdTime: comment.createdTime
          })
        )
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

  const handleClaimClick = async (claimId: string) => {
    if (openClaim === claimId) {
      setOpenClaim(null)
    } else {
      setLoadingClaims(prevState => ({ ...prevState, [claimId]: true }))
      await getContent(claimId)
      setOpenClaim(claimId)
      setLoadingClaims(prevState => ({ ...prevState, [claimId]: false }))
      fetchComments(claimId)
    }
  }

  const cleanHTML = (htmlContent: string) => {
    return htmlContent
      .replace(/<p><br><\/p>/g, '')
      .replace(/<p><\/p>/g, '')
      .replace(/<br>/g, '')
      .replace(/class="[^"]*"/g, '')
      .replace(/style="[^"]*"/g, '')
  }

  const formatCommentDate = (createdTime: string | undefined) => {
    if (!createdTime) return 'No Date Available'
    const commentDate = new Date(createdTime)
    return isNaN(commentDate.getTime()) ? 'Invalid Date' : commentDate.toLocaleString()
  }

  return (
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
            <ListItem button onClick={() => handleClaimClick(claim.id)}>
              <ListItemText primary={claim.achievementName} />
              {openClaim === claim.id ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openClaim === claim.id} timeout='auto' unmountOnExit>
              <Container>
                {loadingClaims[claim.id] ? (
                  <CircularProgress />
                ) : (
                  <ComprehensiveClaimDetails
                    params={{
                      credentialData: encodeURIComponent(
                        `https://drive.google.com/file/d/${claim.id}/view`
                      )
                    }}
                    setFullName={() => {}}
                    setEmail={() => {}}
                    setFileID={() => {}}
                    claimId={''}
                  />
                )}
                {/* Comments Section */}
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
                    {comments[claim.id].map((comment, index) => {
                      let parsedContent
                      try {
                        parsedContent = JSON.parse(comment.content)
                      } catch (e) {
                        parsedContent = comment.content
                      }

                      const filteredContent = Object.entries(parsedContent).reduce(
                        (acc, [key, value]) => {
                          if (Array.isArray(value)) {
                            const nonEmptyItems = value.filter(
                              (item: any) => item.name && item.url
                            )
                            if (nonEmptyItems.length > 0) {
                              acc[key] = nonEmptyItems
                            }
                          } else if (typeof value === 'string' && value.trim() !== '') {
                            acc[key] = cleanHTML(value)
                          } else {
                            acc[key] = value
                          }
                          return acc
                        },
                        {} as Record<string, any>
                      )

                      return (
                        <Box key={index} mb={2}>
                          <Typography>
                            <strong>{comment.author}</strong>:
                          </Typography>
                          <ul>
                            {Object.entries(filteredContent).map(([key, value], idx) => {
                              if (Array.isArray(value)) {
                                return (
                                  <li key={idx}>
                                    <strong>{key}:</strong>
                                    <ul>
                                      {value.map(
                                        (
                                          item: { name: string; url: string },
                                          itemIndex: number
                                        ) => (
                                          <li key={itemIndex}>
                                            <Link
                                              href={item.url}
                                              target='_blank'
                                              rel='noopener noreferrer'
                                            >
                                              {item.name}
                                            </Link>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </li>
                                )
                              }

                              return (
                                <li key={idx}>
                                  <strong>{key}:</strong>{' '}
                                  {typeof value === 'string' ? (
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: cleanHTML(value)
                                      }}
                                    />
                                  ) : (
                                    value
                                  )}
                                </li>
                              )
                            })}
                          </ul>
                          <Typography variant='caption'>
                            {formatCommentDate(comment.createdTime)}
                          </Typography>
                        </Box>
                      )
                    })}
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
