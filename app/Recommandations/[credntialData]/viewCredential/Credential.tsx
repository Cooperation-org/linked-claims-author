'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Box, Button, Typography } from '@mui/material'
import {
  credentialBoxStyles,
  nextButtonStyle,
  commonTypographyStyles,
  evidenceListStyles
} from '../../../components/Styles/appStyles'
import { SVGBadge, SVGDate } from '../../../Assets/SVGs'
import useGoogleDrive from '../../../hooks/useGoogleDrive'
import CircularProgress from '@mui/material/CircularProgress'

const Credential = () => {
  const [driveData, setDriveData] = useState<any>(null)
  const params = useParams()

  const { fetchFile, fileData, gapiLoaded } = useGoogleDrive()

  setTimeout(() => {
    const fetchDriveData = async () => {
      const decodedLink = decodeURIComponent(params.credntialData as any)
      const extractedFile = decodedLink ? decodedLink.split('=')[1] : ''
      const fileId = extractedFile.split('/d/')[1].split('/')[0]
      const resourceKey = ''
      if (gapiLoaded) {
        await fetchFile(fileId, resourceKey)
      }
    }

    fetchDriveData()
  }, 1500)

  useEffect(() => {
    if (fileData) {
      const parsedData = JSON.parse(fileData)
      setDriveData(parsedData)
    }
  }, [fileData])

  const handleNavigate = (url: string) => {
    window.location.href = url
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Button onClick={() => {}} sx={{ ...nextButtonStyle, width: '100%' }}>
        Get Started
      </Button>
      <Box
        sx={{
          display: 'flex',
          height: '46px',
          gap: '5px',
          alignItems: 'center',
          border: '1px solid #003FE0',
          borderRadius: '10px',
          m: '30px 0 10px 0',
          p: '10px'
        }}
      >
        <SVGBadge />
        <Typography sx={{ fontWeight: 700, fontSize: '10px', color: '#202E5B' }}>
          {driveData?.fullName}’s Credential Claims:
        </Typography>
      </Box>
      {driveData ? (
        <Box>
          <Box>
            <Typography
              sx={{
                color: '#202E5B',
                fontFamily: 'Inter',
                fontSize: '15px',
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
                bgcolor: '#D5E1FB'
              }}
            >
              <Box sx={{ mt: '2px' }}>
                <SVGDate />
              </Box>
              <Typography sx={{ ...commonTypographyStyles, fontSize: '13px' }}>
                {driveData?.credentialDuration}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography
              sx={{
                fontFamily: 'Lato',
                fontSize: '17px',
                letterSpacing: '0.075px',
                lineHeight: '24px'
              }}
            >
              This credential certifies about {driveData?.credentialName}.
            </Typography>
            <Box>
              <Typography>Earning criteria:</Typography>
              <ul style={{ marginLeft: '25px' }}>
                <li>{driveData?.credentialDescription.replace(/<\/?[^>]+>/gi, '')}</li>
              </ul>
            </Box>
            <Box>
              <Typography>Evidence</Typography>
              <ul style={evidenceListStyles}>
                {driveData?.portfolio?.map(
                  (porto: {
                    url: React.Key | null | undefined
                    name:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined
                  }) => (
                    <li
                      style={{ cursor: 'pointer', width: 'fit-content' }}
                      key={porto.url}
                      onClick={() => handleNavigate(porto.url as any)}
                    >
                      {porto.name}
                    </li>
                  )
                )}
              </ul>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}

export default Credential
