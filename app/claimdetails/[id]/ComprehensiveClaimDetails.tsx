/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  Button,
  Collapse,
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { SVGDate, SVGBadge, CheckMarkSVG, LineSVG } from '../../Assets/SVGs'
import { useSession } from 'next-auth/react'
import useGoogleDrive from '../../hooks/useGoogleDrive'
import Image from 'next/image'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

// Define types
interface Portfolio {
  name: string
  url: string
}

interface Achievement {
  name: string
  description: string
  criteria?: { narrative: string }
  image?: { id: string }
}

interface CredentialSubject {
  name: string
  achievement: Achievement[]
  duration: string
  portfolio: Portfolio[]
  howKnow?: string
  recommendationText?: string
  qualifications?: string
  createdTime?: string
  evidenceLink?: string
}

interface ClaimDetail {
  '@context': string[]
  id: string
  type: string[]
  issuanceDate: string
  expirationDate: string
  credentialSubject: CredentialSubject
}

const cleanHTML = (htmlContent: string) => {
  return htmlContent
    .replace(/<p><br><\/p>/g, '')
    .replace(/<p><\/p>/g, '')
    .replace(/<br>/g, '')
    .replace(/class="[^"]*"/g, '')
    .replace(/style="[^"]*"/g, '')
}

const ComprehensiveClaimDetails = () => {
  const params = useParams()
  const fileID = params?.id as string
  const [claimDetail, setClaimDetail] = useState<ClaimDetail | null>(null)
  const [comments, setComments] = useState<ClaimDetail[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const pathname = usePathname()
  const { data: session } = useSession()
  const accessToken = session?.accessToken
  const isAskForRecommendation = pathname?.includes('/askforrecommendation')
  const isView = pathname?.includes('/view')

  const { getContent, fetchFileMetadata, getComments } = useGoogleDrive()

  // State to manage expanded comments
  const [expandedComments, setExpandedComments] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    if (!fileID) {
      setErrorMessage('Invalid claim ID.')
      setLoading(false)
    }
  }, [fileID])

  useEffect(() => {
    const fetchDriveData = async () => {
      if (!accessToken || !fileID) {
        console.warn('Access token or fileID is missing.')
        setLoading(false)
        return
      }
      try {
        const content = await getContent(fileID)

        if (content) {
          setClaimDetail(content)
        } else {
          console.warn('No content found for the given file ID.')
        }

        await fetchFileMetadata(fileID, '')

        const commentsData = await getComments(fileID)
        console.log(':  fetchDriveData  commentsData', commentsData)
        if (commentsData && commentsData.length > 0) {
          setComments(commentsData)
          console.log('Set comments:', commentsData)
        } else {
          console.warn('No comments found for the given file ID.')
        }
      } catch (error) {
        console.error('Error fetching drive data:', error)
        setErrorMessage('Failed to fetch claim details.')
      } finally {
        setLoading(false)
      }
    }

    fetchDriveData()
  }, [accessToken, fileID, getContent, fetchFileMetadata, getComments])

  const handleToggleComment = (commentId: string) => {
    setExpandedComments(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId]
    }))
  }

  if (loading || !claimDetail) {
    console.log('Loading state is true.')
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (errorMessage) {
    console.error('Error Message:', errorMessage)
    return (
      <Typography variant='h6' color='error' align='center' sx={{ mt: 4 }}>
        {errorMessage}
      </Typography>
    )
  }

  const credentialSubject = claimDetail?.credentialSubject
  const achievement = credentialSubject?.achievement[0]

  const hasValidEvidence =
    credentialSubject?.portfolio && credentialSubject?.portfolio.length > 0

  return (
    <Container sx={{ maxWidth: '800px' }}>
      <Box
        sx={{
          p: isAskForRecommendation ? '5px' : '20px',
          gap: '20px',
          margin: '20px auto 0',
          border: '1px solid #003FE0',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: isAskForRecommendation ? 'center' : 'flex-start'
        }}
      >
        {isAskForRecommendation && (
          <Box
            sx={{
              width: credentialSubject?.evidenceLink ? '30%' : '0',
              marginRight: credentialSubject?.evidenceLink ? '20px' : '15px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden'
            }}
          >
            {claimDetail?.credentialSubject?.evidenceLink ? (
              <img
                src={claimDetail?.credentialSubject?.evidenceLink}
                alt='Achievement Evidence'
                width={500}
                height={300}
                style={{ borderRadius: '10px', objectFit: 'cover' }}
              />
            ) : (
              <Box
                sx={{
                  width: '15px',
                  height: '100px',
                  backgroundColor: 'transparent'
                }}
              />
            )}
          </Box>
        )}

        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              justifyContent: 'center'
            }}
          >
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <SVGBadge />
              <Typography sx={{ color: 't3BodyText', fontSize: '24px', fontWeight: 700 }}>
                {credentialSubject?.name} has claimed:
              </Typography>
            </Box>
            <Typography
              sx={{ color: 't3BodyText', fontSize: '24px', fontWeight: 700, mt: 2 }}
            >
              {achievement?.name || 'Unnamed Achievement'}
            </Typography>
          </Box>

          {credentialSubject?.duration && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                padding: '2px 5px',
                borderRadius: '5px',
                width: 'fit-content',
                mb: '10px',
                bgcolor: '#d5e1fb',
                mt: 2
              }}
            >
              <Box sx={{ mt: '2px' }}>
                <SVGDate />
              </Box>
              <Typography sx={{ color: 't3BodyText', fontSize: '13px' }}>
                {credentialSubject?.duration}
              </Typography>
            </Box>
          )}

          {!isAskForRecommendation && (
            <>
              {claimDetail?.credentialSubject?.evidenceLink && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: isLargeScreen ? 'row' : 'column',
                    gap: '20px',
                    my: '10px',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    src={claimDetail?.credentialSubject?.evidenceLink}
                    alt='Achievement Evidence'
                    width={180}
                    height={150}
                    style={{ borderRadius: '10px', objectFit: 'cover' }}
                  />
                </Box>
              )}

              {achievement?.description && (
                <Typography
                  sx={{
                    fontFamily: 'Lato',
                    fontSize: '17px',
                    letterSpacing: '0.075px',
                    lineHeight: '24px',
                    mt: 2
                  }}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: cleanHTML(achievement.description)
                    }}
                  />
                </Typography>
              )}

              {achievement?.criteria?.narrative && (
                <Box sx={{ mt: 2 }}>
                  <Typography>What does that entail?:</Typography>
                  <ul style={{ marginLeft: '25px' }}>
                    <li>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: cleanHTML(achievement?.criteria?.narrative)
                        }}
                      />
                    </li>
                  </ul>
                </Box>
              )}

              {hasValidEvidence && (
                <Box sx={{ mt: 3 }}>
                  <Typography sx={{ fontWeight: 600 }}>
                    Supporting Evidence / Portfolio:
                  </Typography>
                  <ul
                    style={{
                      marginLeft: '25px',
                      textDecorationLine: 'underline',
                      color: 'blue'
                    }}
                  >
                    {credentialSubject?.portfolio.map(portfolioItem => (
                      <li
                        key={portfolioItem.url}
                        style={{
                          cursor: 'pointer',
                          width: 'fit-content',
                          marginBottom: '10px'
                        }}
                      >
                        <Link
                          href={portfolioItem.url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {portfolioItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </>
          )}

          {pathname?.includes('/claims') && (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Link href={`/view/${fileID}`}>
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
              <Link href={`/askforrecommendation/${fileID}`}>
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
          )}

          {pathname?.includes('/view') && claimDetail && (
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: '4px', mt: '20px' }}
            >
              <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#000E40' }}>
                Credential Details
              </Typography>
              <Box sx={{ display: 'flex', gap: '5px', mt: '10px', alignItems: 'center' }}>
                <Box sx={{ borderRadius: '4px', bgcolor: '#C2F1BE', p: '4px' }}>
                  <CheckMarkSVG />
                </Box>
                <Typography>Has a valid digital signature</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <Box sx={{ borderRadius: '4px', bgcolor: '#C2F1BE', p: '4px' }}>
                  <CheckMarkSVG />
                </Box>
                <Typography>Has not expired</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <Box sx={{ borderRadius: '4px', bgcolor: '#C2F1BE', p: '4px' }}>
                  <CheckMarkSVG />
                </Box>
                <Typography>Has not been revoked by issuer</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* Comments Section */}

      {isView && (
        <Box>
          {loading ? (
            <Box display='flex' justifyContent='center' my={2}>
              <CircularProgress size={24} />
            </Box>
          ) : comments && comments.length > 0 ? (
            <List sx={{ p: 0, m: 0 }}>
              {comments.map((comment: ClaimDetail, index: number) => (
                <React.Fragment key={comment.id || index}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      pr: '30px'
                    }}
                  >
                    <LineSVG />
                  </Box>
                  <ListItem
                    sx={{ borderRadius: '10px', border: '1px solid #003FE0' }}
                    alignItems='flex-start'
                    secondaryAction={
                      <IconButton
                        edge='end'
                        onClick={() =>
                          handleToggleComment(comment.id || index.toString())
                        }
                        aria-label='expand'
                      >
                        {expandedComments[comment.id || index.toString()] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <SVGBadge />
                          <Box>
                            <Typography variant='h6' component='div'>
                              {comment.credentialSubject?.name}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                              Vouched for {credentialSubject?.name}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Collapse
                    in={expandedComments[comment.id || index.toString()]}
                    timeout='auto'
                    unmountOnExit
                  >
                    <Box sx={{ pl: 7, pr: 2, pb: 2 }}>
                      {comment.credentialSubject?.howKnow && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant='subtitle2' color='text.secondary'>
                            How Known:
                          </Typography>
                          <Typography variant='body2'>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: cleanHTML(comment.credentialSubject.howKnow)
                              }}
                            />
                          </Typography>
                        </Box>
                      )}
                      {comment.credentialSubject?.recommendationText && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant='subtitle2' color='text.secondary'>
                            Recommendation:
                          </Typography>
                          <Typography variant='body2'>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: cleanHTML(
                                  comment.credentialSubject.recommendationText
                                )
                              }}
                            />
                          </Typography>
                        </Box>
                      )}
                      {comment.credentialSubject?.qualifications && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant='subtitle2' color='text.secondary'>
                            Qualifications:
                          </Typography>
                          <Typography variant='body2'>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: cleanHTML(
                                  comment.credentialSubject.qualifications
                                )
                              }}
                            />
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Collapse>
                  {/* Add Divider between comments */}
                  {index < comments.length - 1 && <Divider component='li' />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography variant='body2'>No recommendations available.</Typography>
          )}
        </Box>
      )}
    </Container>
  )
}

export default ComprehensiveClaimDetails
