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
}

const ComprehensiveClaimDetails: React.FC<ComprehensiveClaimDetailsProps> = ({
  params,
  setFullName,
  setEmail = () => {},
  setFileID = () => {},
  claimId
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

  const decodedid = useMemo(() => decodeURIComponent(params.claimId), [params.claimId])
  const fileId = useMemo(() => decodedid.split('/d/')[1]?.split('/')[0], [decodedid])

  useEffect(() => {
    if (!fileId) {
      setErrorMessage('Invalid claim ID.')
      setLoading(false)
    }
  }, [fileId])

  useEffect(() => {
    const fetchDriveData = async () => {
      if (!accessToken || !fileId) return

      try {
        if (fileId) {
          // Directly setting fileId without using functional updates
          setFileID(fileId)
        }

        const cachedContent = localStorage.getItem(`fileContent_${fileId}`)

        if (cachedContent) {
          const parsedData = JSON.parse(cachedContent) as ClaimDetail
          setClaimDetail(parsedData)
          // Directly set the full name without functional updates
          setFullName(parsedData.credentialSubject?.name)
        } else {
          const content = await getContent(fileId)
          setClaimDetail(content)
          // Directly set the full name without functional updates
          setFullName(content.credentialSubject?.name)
          localStorage.setItem(`fileContent_${fileId}`, JSON.stringify(content))
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
  }, [accessToken, getContent, fileId, setFullName, setFileID])

  useEffect(() => {
    if (fetchedOwnerEmail) {
      console.log('Fetched owner email is being set:', fetchedOwnerEmail)
      // Directly set the email without functional updates
      setEmail(fetchedOwnerEmail)
    }
  }, [fetchedOwnerEmail, setEmail])

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
        p: '20px',
        gap: '20px',
        bgcolor: isLargeScreen ? theme.palette.t3NewWhitesmoke : 'none',
        maxWidth: '800px',
        margin: '20px auto',
        border: '1px solid #003FE0',
        borderRadius: '10px'
      }}
    >
      <SessionExpiryModal />

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

      {achievement?.image?.id && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: isLargeScreen ? 'row' : 'column',
            gap: '20px',
            my: '10px'
          }}
        >
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
                style={{ cursor: 'pointer', width: 'fit-content', marginBottom: '10px' }}
              >
                <Link href={portfolioItem.url} target='_blank' rel='noopener noreferrer'>
                  {portfolioItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </Box>
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
  )
}

export default ComprehensiveClaimDetails
