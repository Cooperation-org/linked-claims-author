/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { Box, CircularProgress, Typography, useMediaQuery, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SVGDate, SVGBadge, CheckMarkSVG } from '../../Assets/SVGs'
import { useSession } from 'next-auth/react'
import useGoogleDrive from '../../hooks/useGoogleDrive'
import SessionExpiryModal from '../../components/refreshtokenPopup'

interface Portfolio {
  name: string
  url: string
}

interface CredentialSubject {
  name: string
  achievement: {
    name: string
    description: string
    criteria?: { narrative: string }
    image?: { id: string }
  }[]
  duration: string
  portfolio: Portfolio[]
}

interface ClaimDetail {
  '@context': string[]
  id: string
  type: string[]
  issuanceDate: string
  expirationDate: string
  credentialSubject: CredentialSubject
}

interface ComprehensiveClaimDetailsProps {
  params: {
    claimId: string
  }
  setFullName: (name: string) => void
  setEmail?: (email: string) => void
  setFileID?: (fileId: string) => void
  claimId?: string
  onDataFetched?: (data: ClaimDetail | null) => void
}

const ComprehensiveClaimDetails: React.FC<ComprehensiveClaimDetailsProps> = ({
  params,
  setFullName,
  setEmail = () => {},
  setFileID = () => {},
  claimId,
  onDataFetched
}) => {
  const [claimDetail, setClaimDetail] = useState<ClaimDetail | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [ownerEmail, setOwnerEmail] = useState<string | null>(null)
  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const pathname = usePathname()
  const { data: session } = useSession()
  const accessToken = session?.accessToken

  const {
    getContent,
    fetchFileMetadata,
    fileMetadata,
    ownerEmail: fetchedOwnerEmail
  } = useGoogleDrive()

  // Memoize decoded ID and file ID extraction logic
  const decodedid = useMemo(() => decodeURIComponent(params.claimId), [params.claimId])
  const fileId = useMemo(() => decodedid.split('/d/')[1]?.split('/')[0], [decodedid])

  // Set error if fileId is invalid
  useEffect(() => {
    if (!fileId) {
      setErrorMessage('Invalid claim ID.')
      setLoading(false)
    }
  }, [fileId])

  // Fetch content and metadata
  useEffect(() => {
    const fetchDriveData = async () => {
      if (!accessToken || !fileId) return

      try {
        setFileID(fileId)

        // Check local cache for content
        const cachedContent = localStorage.getItem(`fileContent_${fileId}`)
        const cachedMetadata = localStorage.getItem(`fileMetadata_${fileId}`)

        // If cached content exists, use it
        if (cachedContent) {
          const parsedData = JSON.parse(cachedContent) as ClaimDetail
          setClaimDetail(parsedData)
          setFullName(parsedData.credentialSubject?.name)
          onDataFetched && onDataFetched(parsedData)
        } else {
          // Fetch content from Google Drive
          const content = await getContent(fileId)
          setClaimDetail(content)
          setFullName(content.credentialSubject?.name)
          localStorage.setItem(`fileContent_${fileId}`, JSON.stringify(content))
          onDataFetched && onDataFetched(content)
        }

        // If cached metadata exists, use it
        if (cachedMetadata) {
          const metadataOwnerEmail = JSON.parse(cachedMetadata)?.owners[0]?.emailAddress
          setOwnerEmail(metadataOwnerEmail)
          setEmail(metadataOwnerEmail)
        } else {
          // Fetch metadata from Google Drive
          await fetchFileMetadata(fileId, '')
        }
      } catch (error) {
        console.error('Error fetching claim details:', error)
        setErrorMessage('Failed to fetch claim details.')
      } finally {
        setLoading(false)
      }
    }

    if (accessToken && fileId) {
      fetchDriveData()
    }
  }, [
    accessToken,
    getContent,
    fetchFileMetadata,
    fileId,
    setFullName,
    setEmail,
    setFileID,
    onDataFetched
  ])

  // Update claim detail and metadata in state
  useEffect(() => {
    if (claimDetail) {
      const parsedData = claimDetail
      setClaimDetail(parsedData)
      setFullName(parsedData.credentialSubject?.name)
      localStorage.setItem(`fileContent_${fileId}`, JSON.stringify(parsedData))
    }

    if (fetchedOwnerEmail) {
      setOwnerEmail(fetchedOwnerEmail)
      setEmail(fetchedOwnerEmail)
      const metadata = { owners: [{ emailAddress: fetchedOwnerEmail }] }
      localStorage.setItem(`fileMetadata_${fileId}`, JSON.stringify(metadata))
    }
  }, [claimDetail, fetchedOwnerEmail, setFullName, setEmail, fileId])

  // Helper function to clean HTML content
  const cleanHTML = (htmlContent: string) => {
    return htmlContent.replace(/<p><br><\/p>|<p><\/p>|<br>|<\/?[^>]+>/g, '')
  }

  if (loading) {
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
    return (
      <Typography variant='h6' color='error'>
        {errorMessage}
      </Typography>
    )
  }

  if (!claimDetail) {
    return <Typography variant='h6'>No claim details found.</Typography>
  }

  const { credentialSubject } = claimDetail
  const achievement = credentialSubject.achievement[0]
  const hasValidEvidence =
    credentialSubject.portfolio && credentialSubject.portfolio.length > 0

  return (
    <Box
      sx={{
        width: '100%',
        p: pathname?.includes('/askforrecommendation') ? '5px' : '20px', // Change padding to 5px for askforrecommendation route
        gap: '20px',
        bgcolor: isLargeScreen ? theme.palette.t3NewWhitesmoke : 'none',
        maxWidth: '800px',
        margin: '20px auto',
        border: '1px solid #003FE0',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: pathname?.includes('/askforrecommendation')
          ? 'center'
          : 'flex-start' // Center content for askforrecommendation route
      }}
    >
      <SessionExpiryModal />

      {/* Conditionally render the image only in askforrecommendation route */}
      {pathname?.includes('/askforrecommendation') && (
        <Box
          sx={{
            width: '30%',
            marginRight: '20px',
            display: 'flex',
            justifyContent: 'center', // Center the image horizontally
            alignItems: 'center' // Center the image vertically
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            style={{
              borderRadius: '20px',
              maxWidth: '100%' // Ensure the image doesn't exceed the container's width
            }}
            src={achievement?.image?.id}
            alt='Achievement Evidence'
          />
        </Box>
      )}

      <Box
        sx={{
          flex: 1
        }}
      >
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
              {credentialSubject.name || fileMetadata?.name} has claimed:
            </Typography>
          </Box>
          <Typography
            sx={{ color: 't3BodyText', fontSize: '24px', fontWeight: 700, mt: 2 }}
          >
            {achievement?.name || 'Unnamed Achievement'}
          </Typography>
        </Box>

        {credentialSubject.duration && (
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
              {credentialSubject.duration}
            </Typography>
          </Box>
        )}

        {/* Conditionally hide this block on the askforrecommendation route */}
        {!pathname?.includes('/askforrecommendation') && (
          <>
            {achievement?.image?.id && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isLargeScreen ? 'row' : 'column',
                  gap: '20px',
                  my: '10px',
                  justifyContent: 'center'
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  style={{
                    borderRadius: '20px',
                    width: isLargeScreen ? '179px' : '100%',
                    height: '100%'
                  }}
                  src={achievement.image.id}
                  alt='Achievement Evidence'
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
                {cleanHTML(achievement.description)}
              </Typography>
            )}

            {achievement?.criteria?.narrative && (
              <Box sx={{ mt: 2 }}>
                <Typography>Earning criteria:</Typography>
                <ul style={{ marginLeft: '25px' }}>
                  <li>{cleanHTML(achievement.criteria.narrative)}</li>
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
                    color: 'blue',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  {credentialSubject.portfolio.map(portfolioItem => (
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

        {ownerEmail && (
          <Box sx={{ mt: 2 }}>
            <Typography variant='body2'>Owner Email: {ownerEmail}</Typography>
          </Box>
        )}

        {pathname?.includes('/claims') && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Link href={`/view/${claimId}`}>
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
            <Link href={`/askforrecommendation/${claimId}`}>
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

        {pathname?.includes('/view') && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', mt: '20px' }}>
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
  )
}

export default ComprehensiveClaimDetails