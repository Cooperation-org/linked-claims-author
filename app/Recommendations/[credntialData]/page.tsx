'use client'

import React from 'react'
import { Typography, Box, useMediaQuery, Theme } from '@mui/material'
import Image from 'next/image'
import { useTheme } from '@mui/material/styles'
import { SVGLargeScreen } from '../../Assets/SVGs'
import img3 from '../../Assets/Images/Tessa Persona large sceens.png'
import fram from '../../Assets/Images/Frame 35278.png'
import vector from '../../Assets/Images/Vector 145.png'
import { FormTextSteps, textGuid } from './RecommandationForm/fromTexts/FormTextSteps'
import { useState } from 'react'
import Credential from './viewCredential/Credential'
import TabsComponent from '../../components/Tabs/Tabs'
import { StepTrackShape } from '../../CredentialForm/form/fromTexts & stepTrack/StepTrackShape'
import { useStepContext } from '../../CredentialForm/form/StepContext'

const CredntialData = ({ params }: { params: { credntialData: any } }) => {
  const { activeStep, setActiveStep } = useStepContext()
  const theme = useTheme<Theme>()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const [fullName, setFullName] = useState('Golda')

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 190px)',
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
          overflow: 'hidden',
          mb: '20px'
        }}
      >
        <StepTrackShape />
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
      <Box sx={{ height: '100%' }}>
        {activeStep === 0 && (
          <Credential setactivStep={setActiveStep} setFullName={setFullName} />
        )}
        {activeStep !== 0 && (
          <>
            <FormTextSteps
              activeStep={activeStep}
              activeText={textGuid(fullName)[activeStep]}
            />
            <TabsComponent setFullName={setFullName} fullName={fullName} />
          </>
        )}
      </Box>
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
            gap: '12px',
            bottom: 0
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
