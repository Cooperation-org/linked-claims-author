'use client'

import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { UseFormWatch, UseFormSetValue } from 'react-hook-form'
import { FormData } from '../../../../credentialForm/form/types/Types'
import { SVGFolder, SVGSinfo } from '../../../../Assets/SVGs'

import { signIn, useSession } from 'next-auth/react'

interface Step1Props {
  watch: UseFormWatch<FormData>
  setValue: UseFormSetValue<FormData>
  handleNext: () => void
}

const Step1: React.FC<Step1Props> = () => {
  const { data: session } = useSession()

  if (session?.accessToken) {
    window.location.hash = '#step1'
    return
  }

  const connectToGoogleDrive = async () => {
    if (session?.accessToken) {
      window.location.hash = '#step1'
      return
    }

    try {
      // Initiate Google sign-in
      await signIn('google', {
        callbackUrl: `${window.location.origin}/credentialForm#step1`
      })

      // After successful sign-in, update the hash to step1
      window.location.hash = '#step1'
    } catch (error) {
      console.error('Error connecting to Google Drive:', error)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        textAlign: 'center',
        mt: 4
      }}
    >
      {/* Google Drive Icon */}
      <Box
        sx={{
          width: 100,
          height: 100,
          backgroundColor: '#e0e0e0',
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
        First, connect to Google Drive so you can save your data.
      </Typography>

      {/* Connect to Google Drive Button */}
      <Button
        variant='contained'
        color='primary'
        onClick={connectToGoogleDrive}
        sx={{
          mt: 2,
          px: 4,
          py: 0.5,
          fontSize: '16px',
          borderRadius: 5,
          textTransform: 'none',
          backgroundColor: '#003FE0'
        }}
      >
        Connect to Google Drive{' '}
        <Box sx={{ ml: 2, mt: '2px' }}>
          <SVGSinfo />
        </Box>
      </Button>
      <Button
        variant='text'
        color='primary'
        onClick={() => (window.location.hash = '#step2')}
        sx={{
          fontSize: '14px',
          textDecoration: 'underline',
          textTransform: 'none'
        }}
      >
        Continue without Saving
      </Button>
    </Box>
  )
}

export default Step1
