'use client'

import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { SVGDate, SVGBadge } from '../../Assets/SVGs'
import { useSession } from 'next-auth/react'
import useGoogleDrive from '../../hooks/useGoogleDrive'

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

const ComprehensiveClaimDetails: React.FC = () => {
  const [claimDetail, setClaimDetail] = useState<ClaimDetail | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [ownerEmail, setOwnerEmail] = useState<string | null>(null)
  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const params = useParams()
  const { data: session } = useSession()
  const accessToken = session?.accessToken

  const {
    fetchFileContent,
    fetchFileMetadata,
    fileContent,
    fileMetadata,
    ownerEmail: fetchedOwnerEmail
  } = useGoogleDrive()

  useEffect(() => {
    const fetchDriveData = async () => {
      if (!accessToken) {
        setErrorMessage('Please sign in to view your claim details.')
        setLoading(false)
        return
      }

      try {
        const decodedLink = decodeURIComponent(params.credntialData as string)
        const fileId = decodedLink.split('/d/')[1]?.split('/')[0]

        if (!fileId) {
          setErrorMessage('Invalid claim ID.')
          setLoading(false)
          return
        }

        const cachedContent = localStorage.getItem(`fileContent_${fileId}`)
        const cachedMetadata = localStorage.getItem(`fileMetadata_${fileId}`)

        if (cachedContent) {
          setClaimDetail(JSON.parse(cachedContent) as ClaimDetail)
          setLoading(false)
        } else {
          await fetchFileContent(fileId, accessToken)
        }

        if (cachedMetadata) {
          setOwnerEmail(JSON.parse(cachedMetadata)?.owners[0]?.emailAddress)
        } else {
          await fetchFileMetadata(fileId, '')
        }
      } catch (error) {
        console.error('Error fetching claim details:', error)
        setErrorMessage('Failed to fetch claim details.')
        setLoading(false)
      }
    }

    if (accessToken && params?.credntialData) {
      fetchDriveData()
    }
  }, [accessToken, fetchFileContent, fetchFileMetadata, params])

  useEffect(() => {
    if (fileContent) {
      const parsedData = JSON.parse(fileContent)
      setClaimDetail(parsedData as ClaimDetail)
      setLoading(false)

      const decodedLink = decodeURIComponent(params.credntialData as string)
      const fileId = decodedLink.split('/d/')[1]?.split('/')[0]
      localStorage.setItem(`fileContent_${fileId}`, fileContent)
    }

    if (fetchedOwnerEmail) {
      setOwnerEmail(fetchedOwnerEmail)

      const decodedLink = decodeURIComponent(params.credntialData as string)
      const fileId = decodedLink.split('/d/')[1]?.split('/')[0]
      const metadata = { owners: [{ emailAddress: fetchedOwnerEmail }] }
      localStorage.setItem(`fileMetadata_${fileId}`, JSON.stringify(metadata))
    }
  }, [fileContent, fetchedOwnerEmail])

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
      {/* Display Name and Achievement */}
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
          <Typography
            sx={{
              color: 't3BodyText',
              fontSize: '24px',
              fontWeight: 700,
              fontStyle: 'normal'
            }}
          >
            {credentialSubject.name || fileMetadata?.name} has claimed:
          </Typography>
        </Box>
        <Typography
          sx={{
            color: 't3BodyText',
            fontSize: '24px',
            fontWeight: 700,
            fontStyle: 'normal',
            mt: 2
          }}
        >
          {achievement?.name || 'Unnamed Achievement'}
        </Typography>
      </Box>

      {/* Credential Duration */}
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

      {/* Display Image */}
      {achievement?.image?.id && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: isLargeScreen ? 'row' : 'column',
            gap: isLargeScreen ? '20px' : '10px',
            my: '10px'
          }}
        >
          <img
            style={{
              borderRadius: '20px',
              width: !isLargeScreen ? '100%' : '179px',
              height: '100%'
            }}
            src={achievement.image.id}
            alt='Achievement Evidence'
          />
        </Box>
      )}

      {/* Achievement Description */}
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
          {achievement.description.replace(/<\/?[^>]+>/gi, '')}
        </Typography>
      )}

      {/* Achievement Criteria */}
      {achievement?.criteria?.narrative && (
        <Box sx={{ mt: 2 }}>
          <Typography>Earning criteria:</Typography>
          <ul style={{ marginLeft: '25px' }}>
            <li>{achievement.criteria.narrative.replace(/<\/?[^>]+>/gi, '')}</li>
          </ul>
        </Box>
      )}

      {/* Portfolio Evidence */}
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
            {credentialSubject.portfolio.map((porto, index) => (
              <li
                key={index}
                style={{ cursor: 'pointer', width: 'fit-content', marginBottom: '10px' }}
              >
                <Link href={porto.url} target='_blank' rel='noopener noreferrer'>
                  {porto.name}
                </Link>
              </li>
            ))}
          </ul>
        </Box>
      )}

      {/* Display the owner email if available */}
      {ownerEmail && (
        <Box sx={{ mt: 2 }}>
          <Typography variant='body2'>Owner Email: {ownerEmail}</Typography>
        </Box>
      )}
    </Box>
  )
}

export default ComprehensiveClaimDetails
