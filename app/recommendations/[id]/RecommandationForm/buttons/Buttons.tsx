'use client'

import React from 'react'
import { Box, Button } from '@mui/material'

interface ButtonsProps {
  activeStep: number
  handleBack: React.MouseEventHandler<HTMLButtonElement> | undefined
  handleNext: React.MouseEventHandler<HTMLButtonElement> | undefined
  handleSign: React.MouseEventHandler<HTMLButtonElement> | undefined
  maxSteps: number
  isValid: boolean
  isLoading?: boolean
  tooltipText?: string
}

export function Buttons({
  activeStep,
  handleNext,
  handleSign,
  isValid,
  isLoading = false
}: Readonly<ButtonsProps>) {
  return (
    <Box
      sx={{
        width: { xs: '100%', md: '40%', lg: '40%' },
        height: '40px',
        display: 'flex',
        gap: '15px',
        justifyContent: 'center'
      }}
    >
      {activeStep === 2 && (
        <Button variant='finishButton' type='submit' color='secondary'>
          Save & Exit
        </Button>
      )}

      {activeStep === 3 && handleSign && (
        <Button
          onClick={handleSign}
          color='primary'
          disabled={!isValid || isLoading}
          variant='nextButton'
        >
          Finish & Sign
        </Button>
      )}
      {activeStep === 2 && (
        <Button
          variant='nextButton'
          onClick={handleNext}
          disabled={!isValid || isLoading}
          color='primary'
        >
          Preview
        </Button>
      )}
    </Box>
  )
}
export default Buttons
