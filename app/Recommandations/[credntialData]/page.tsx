'use client'

import { useState } from 'react'
import { Typography, Box, useMediaQuery, Theme } from '@mui/material'
import Image from 'next/image'
import { useTheme } from '@mui/material/styles'
import { StepTrackShape } from '../../components/form/fromTexts & stepTrack/StepTrackShape'
import { SVGLargeScreen } from '../../Assets/SVGs'
import img3 from '../../Assets/Images/Tessa Persona large sceens.png'
import fram from '../../Assets/Images/Frame 35278.png'
import vector from '../../Assets/Images/Vector 145.png'
import useGoogleDrive from '../../hooks/useGoogleDrive'
import Form from './RecommandationForm/Form'

const CredntialData = ({ params }: { params: { credntialData: any } }) => {
  const theme = useTheme<Theme>()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const [activStep, setactivStep] = useState(0)

  // get the path
  const fileParam = params.credntialData

  // decode the URL
  const decodedLink = decodeURIComponent(fileParam)
  const extractedFile = decodedLink ? decodedLink.split('=')[1] : ''

  const { fetchFile, fileData } = useGoogleDrive()
  const [viewingFile, setViewingFile] = useState(false)

  const handleViewFile = () => {
    const fileId = extractedFile.split('/d/')[1].split('/')[0]
    const resourceKey = ''
    fetchFile(fileId, resourceKey)
    setViewingFile(true)
  }

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 153px)',
        display: !isLargeScreen ? 'flex' : 'block',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'auto'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <StepTrackShape activeStep={0} />
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100px',
            mt: '30px'
          }}
        >
          <SVGLargeScreen />
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Image src={img3} alt='logo' style={{ width: '100px', height: '100px' }} />
          </Box>
        </Box>
      </Box>
      {activStep !== 0 && <Form setactivStep={setactivStep} />}
      {!isLargeScreen && (
        <Box
          sx={{
            mt: '30px',
            width: '100%',
            height: '114px',
            bgcolor: theme.palette.t3LightBlue,
            p: '28px 70px 28px 50px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <Box>
            <Image src={fram} alt='fram' />
          </Box>
          <Box>
            <Typography
              sx={{
                width: '200px',
                color: theme.palette.t3BodyText,
                fontFamily: 'Lato',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal'
              }}
            >
              Learn how this data is used & protected.
              <Image style={{ marginLeft: '10px' }} src={vector} alt='logo' />
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default CredntialData
