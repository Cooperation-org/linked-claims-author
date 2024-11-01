'use client'

import React from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import { nextButtonStyle, StyledButton } from '../../../components/Styles/appStyles'

interface ButtonsProps {
  activeStep: number
  handleBack: React.MouseEventHandler<HTMLButtonElement> | undefined
  handleNext: React.MouseEventHandler<HTMLButtonElement> | undefined
  handleSign: React.MouseEventHandler<HTMLButtonElement> | undefined
  maxSteps: number
  isValid: boolean
  disabled0: boolean
  handleSaveSession: () => void
  loading: boolean
}

export function Buttons({
  activeStep,
  handleBack,
  handleNext,
  handleSign,
  isValid,
  handleSaveSession,
  loading
}: Readonly<ButtonsProps>) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '40px',
        display: 'flex',
        gap: '15px',
        justifyContent: 'center'
      }}
    >
      {activeStep !== 0 && (
        <Button
          sx={{ ...StyledButton, minWidth: '130px' }}
          onClick={handleSaveSession}
          color='secondary'
        >
          Save & Exit
        </Button>
      )}
      {activeStep === 3 && (
        <Button sx={StyledButton} onClick={handleNext} color='secondary'>
          Skip
        </Button>
      )}
      {activeStep !== 4 && activeStep !== 0 && (
        <Button
          sx={{
            ...nextButtonStyle,
            maxWidth: '355px'
          }}
          onClick={handleNext}
          color='primary'
          disabled={activeStep !== 0 && !isValid}
          variant='contained'
        >
          Next
        </Button>
      )}
      {activeStep === 4 && (
        <Button sx={nextButtonStyle} onClick={handleSign} color='primary'>
          Finish & Sign
        </Button>
      )}
      {activeStep === 5 && (
        <Button
          sx={nextButtonStyle}
          onClick={handleNext}
          disabled={loading} // Disable button during loading
          color='primary'
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} /> Uploading...
            </>
          ) : (
            'Preview'
          )}
        </Button>
      )}
    </Box>
  )
}
