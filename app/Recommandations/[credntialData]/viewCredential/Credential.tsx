'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Box, Button, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  credentialBoxStyles,
  nextButtonStyle,
  commonTypographyStyles,
  evidenceListStyles
} from '../../../components/Styles/appStyles'
import { SVGBadge, SVGDate, SVGCheckMarks } from '../../../Assets/SVGs'
import useGoogleDrive from '../../../hooks/useGoogleDrive'
import CircularProgress from '@mui/material/CircularProgress'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { featuresRecommentations } from '../RecommandationForm/fromTexts & stepTrack/FormTextSteps'
import Link from 'next/link'

interface CredentialProps {
  handleNext: () => void
}
const Credential: React.FC<CredentialProps> = ({ handleNext }) => {
  const theme = useTheme()
  const [driveData, setDriveData] = useState<any>(null)
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
  }, [ gapiLoaded ])

  useEffect(() => {
    if (fileData) {
      const parsedData = JSON.parse(fileData)
      setDriveData(parsedData)
    }
  }, [fileData])

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Button onClick={handleNext} sx={{ ...nextButtonStyle, width: '100%' }}>
        Get Started
      </Button>
      <Typography
        sx={{
          flexShrink: 0,
          fontFamily: 'Lato',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: 'normal',
          m: '0 3px 0 15px'
        }}
      >
        Here’s what you may need before getting started:
      </Typography>
      <Box>
        {featuresRecommentations.map((feature: { id: any; name: any }) => (
          <Box
            key={feature.id}
            sx={{ display: 'flex', width: '100%', maxWidth: '321px', ml: '30px' }}
          >
            <SVGCheckMarks />
            <Typography
              sx={{
                color: theme.palette.t3BodyText,
                flexShrink: 0,
                fontFamily: 'Lato',
                fontSize: '18px',
                fontWeight: '400',
                lineHeight: 'normal',
                m: '0 5px 0 15px'
              }}
            >
              {feature.name}
            </Typography>
            <InfoOutlinedIcon sx={{ width: '15px', height: '15px', mt: '3px ' }} />
          </Box>
        ))}
      </Box>
      {driveData ? (
        <Box sx={{ border: '1px solid #003FE0', borderRadius: '10px', p: '15px' }}>
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
                  <li>{driveData?.credentialDescription.replace(/<\/?[^>]+>/gi, '')}</li>
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
