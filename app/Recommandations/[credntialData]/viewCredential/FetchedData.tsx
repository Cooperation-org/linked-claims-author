'use client'

import React, { useState, useEffect } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { SVGBadge, SVGDate } from '../../../Assets/SVGs'
import {
  credentialBoxStyles,
  commonTypographyStyles,
  evidenceListStyles
} from '../../../components/Styles/appStyles'
import useGoogleDrive from '../../../hooks/useGoogleDrive'

const FetchedData = () => {
  const [driveData, setDriveData] = useState<any>(null)
  console.log(':  FetchedData  driveData', driveData)
  const params = useParams()

  const { fetchFile, fileData, gapiLoaded } = useGoogleDrive()

  useEffect(() => {
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
  }, [gapiLoaded])

  useEffect(() => {
    if (fileData) {
      const parsedData = JSON.parse(fileData)
      setDriveData(parsedData)
      localStorage.setItem('parsedData', JSON.stringify(parsedData))
    }
  }, [fileData])
  return (
    <Box sx={{ border: '1px solid #003FE0', borderRadius: '10px', p: '15px' }}>
      {driveData ? (
        <>
          <Box
            sx={{
              display: 'flex',
              gap: '5px',
              alignItems: 'center'
            }}
          >
            <SVGBadge />
            <Typography sx={{ fontWeight: 700, fontSize: '13px', color: '#202E5B' }}>
              {driveData?.fullName}’s has claimed:
            </Typography>
          </Box>
          <Box>
            <Box>
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
                  bgcolor: '#d5e1fb'
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
                  <li>{driveData?.credentialDescription?.replace(/<\/?[^>]+>/gi, '')}</li>
                </ul>
              </Box>
              <Box>
                <Typography>Evidence:</Typography>
                <ul style={evidenceListStyles}>
                  {driveData?.portfolio?.map((porto: { url: any; name: any }) => (
                    <li key={porto.url}>
                      <Link href={porto.url}>{porto.name}</Link>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}

export default FetchedData
