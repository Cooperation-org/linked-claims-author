'use client'

import React, { useState, useEffect } from 'react'
import { Typography, Box, useMediaQuery, Theme, CircularProgress } from '@mui/material'
import Image from 'next/image'
import { useTheme } from '@mui/material/styles'
import { SVGLargeScreen } from '../../Assets/SVGs'
// @ts-ignore
import img3 from '../../Assets/Images/Tessa Persona large sceens.png'
// @ts-ignore
import fram from '../../Assets/Images/Frame 35278.png'
// @ts-ignore
import vector from '../../Assets/Images/Vector 145.png'
import { FormTextSteps, textGuid } from './RecommandationForm/fromTexts/FormTextSteps'
import Credential from './viewCredential/Credential'
import TabsComponent from '../../components/Tabs/Tabs'
import { StepTrackShape } from '../../credentialForm/form/fromTexts & stepTrack/StepTrackShape'
import { useStepContext } from '../../credentialForm/form/StepContext'
import useGoogleDrive from '../../hooks/useGoogleDrive'
import { useParams } from 'next/navigation'

const CredentialData = () => {
  const { activeStep, setActiveStep } = useStepContext()
  const theme = useTheme<Theme>()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { getContent, fetchFileMetadata, ownerEmail } = useGoogleDrive()
  const params = useParams()
  const id =
    typeof params?.id === 'string'
      ? params.id
      : Array.isArray(params?.id)
        ? params.id[0]
        : undefined

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setErrorMessage('Error: Missing credential data.')
        setLoading(false)
        return
      }

      try {
        const content = await getContent(id)
        // console.log('Fetched Content:', content)
        const credentialSubject = content?.credentialSubject
        if (credentialSubject?.name) {
          setFullName(credentialSubject.name)
        } else {
          setFullName('User')
        }

        await fetchFileMetadata(id)
        if (ownerEmail) {
          setEmail(ownerEmail)
        } else {
          setEmail('user@example.com')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setErrorMessage('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, getContent, fetchFileMetadata, ownerEmail])

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (errorMessage) {
    return (
      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant='h6' color='error'>
          {errorMessage}
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: {
          xs: 'calc(100vh - 190px)',
          md: 'calc(100vh - 381px)'
        },
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
            <Image
              src={img3}
              priority
              alt='logo'
              style={{ width: '100px', height: '100px' }}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: '100%' }}>
        {activeStep === 0 && (
          <Credential setactivStep={setActiveStep} fullName={fullName} email={email} />
        )}
        {activeStep !== 0 && (
          <>
            <FormTextSteps
              activeStep={activeStep}
              activeText={textGuid(fullName)[activeStep]}
            />
            <TabsComponent setFullName={setFullName} fullName={fullName} email={email} />
          </>
        )}
      </Box>
    </Box>
  )
}

export default CredentialData
