import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, Tooltip } from '@mui/material'
import { signIn, useSession } from 'next-auth/react'
import { SVGFolder, SVGSinfo } from '../../../Assets/SVGs'
import LoadingOverlay from '../../../components/Loading/LoadingOverlay'
import { useStepContext } from '../StepContext'

export function Step0() {
  const { data: session } = useSession()
  const { activeStep, handleNext, setActiveStep } = useStepContext()
  const [loading, setLoading] = useState(false)

  const connectToGoogleDrive = async () => {
    if (session?.accessToken) {
      setLoading(true)
      handleNext()
      return
    }

    try {
      // Initiate Google sign-in
      await signIn('google', {
        callbackUrl: `${window.location.origin}/credentialForm#step1`
      })

      setLoading(true)
      setTimeout(() => {
        setActiveStep(1)
      }, 500)
    } catch (error) {
      console.error('Error connecting to Google Drive:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session?.accessToken && activeStep === 0) {
      setActiveStep(1)
    }
  }, [session, activeStep, setActiveStep])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        textAlign: 'center',
        height: '60vh',
        mt: 4
      }}
    >
      {/* Google Drive Icon */}
      <Box
        sx={{
          width: 100,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <SVGFolder />
      </Box>

      {/* Main text */}
      <Typography
        sx={{
          fontSize: 24
        }}
      >
        First, login with Google Drive so you can save your data.
      </Typography>

      {/* Connect to Google Drive Button */}
      <Button variant='actionButton' color='primary' onClick={connectToGoogleDrive}>
        Login with Google Drive{' '}
        <Tooltip title='You must have a Google Drive account and be able to login. This is where your credentials will be saved.'>
          <Box sx={{ ml: 2, mt: '2px' }}>
            <SVGSinfo />
          </Box>
        </Tooltip>
      </Button>
      <Button
        variant='text'
        color='primary'
        onClick={() => setActiveStep(1)}
        sx={{
          fontSize: '14px',
          fontWeight: 600,
          textDecoration: 'underline',
          textTransform: 'none'
        }}
      >
        Continue without Saving
      </Button>
      <LoadingOverlay text='Connecting...' open={loading} />
    </Box>
  )
}
