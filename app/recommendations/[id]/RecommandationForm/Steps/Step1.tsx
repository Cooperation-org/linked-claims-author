'use client'

import React, { useEffect } from 'react'
import { Box, Typography, Button, Tooltip } from '@mui/material'
import { UseFormWatch, UseFormSetValue } from 'react-hook-form'
import { FormData } from '../../../../credentialForm/form/types/Types'
import { SVGFolder, SVGSinfo } from '../../../../Assets/SVGs'
import { getCookie } from '../../../../utils/cookie'
import { signInWithGoogle } from '../../../../firebase/auth'

interface Step1Props {
  watch: UseFormWatch<FormData>
  setValue: UseFormSetValue<FormData>
  handleNext: () => void
}

const Step1: React.FC<Step1Props> = ({ handleNext }) => {
  const accessToken = getCookie('accessToken')

  useEffect(() => {
    if (accessToken) {
      handleNext()
    }
  }, [accessToken, handleNext])

  const connectToGoogleDrive = async () => {
    if (accessToken) {
      handleNext()
      return
    }

    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Error connecting to Google Drive:', error)
    }
  }

  // Determine tooltip text based on authentication status
  const tooltipTitle = accessToken
    ? 'You are connected to Google Drive. This is where your recommendation will be saved.'
    : 'You must have a Google Drive account and be able to login. This is where your recommendation will be saved.'

  // Determine main text based on authentication status
  const mainText = accessToken
    ? 'You are already logged in. Proceeding to the next step...'
    : 'You must have a Google Drive account and be able to login. This is where your recommendation will be saved.'

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

      <Typography
        sx={{
          fontSize: 24
        }}
      >
        {mainText}
      </Typography>

      {!accessToken && (
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
            backgroundColor: '#003FE0',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Login with Google Drive
          <Tooltip title={tooltipTitle}>
            <Box sx={{ ml: 2, mt: '2px' }}>
              <SVGSinfo />
            </Box>
          </Tooltip>
        </Button>
      )}

      {!accessToken && (
        <Button
          variant='text'
          color='primary'
          onClick={() => handleNext()}
          sx={{
            fontSize: '14px',
            textDecoration: 'underline',
            textTransform: 'none'
          }}
        >
          Continue without Saving
        </Button>
      )}
    </Box>
  )
}

export default Step1
