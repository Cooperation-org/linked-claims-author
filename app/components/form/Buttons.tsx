'use client'

import React from 'react'
import { Box, Button } from '@mui/material'
import { StyledButton, nextButtonStyle } from './boxStyles'

interface ButtonsProps {
  activeStep: number
  handleBack: React.MouseEventHandler<HTMLButtonElement> | undefined
  handleNext: React.MouseEventHandler<HTMLButtonElement> | undefined
  handleSign: React.MouseEventHandler<HTMLButtonElement> | undefined
  handlePreview: React.MouseEventHandler<HTMLButtonElement> | undefined
  maxSteps: number
  isValid: boolean
}

export function Buttons({
  activeStep,
  handleBack,
  handleNext,
  handleSign,
  handlePreview,
  maxSteps,
  isValid
}: Readonly<ButtonsProps>) {
  return (
    <Box
      sx={{
        height: '40px',
        display: 'flex',
        gap: '15px',
        justifyContent: activeStep !== 0 ? 'space-between' : 'center'
      }}
    >
      {activeStep !== 0 && (
        <>
          <Button sx={StyledButton} onClick={handleBack} color='secondary'>
            Back
          </Button>
          <Button sx={StyledButton} type='submit' color='secondary'>
            Save & Exit
          </Button>
        </>
      )}
      {activeStep !== 5 && activeStep !== 6 && (
        <Button
          sx={nextButtonStyle}
          onClick={handleNext}
          color='primary'
          disabled={!isValid}
          variant='contained'
        >
          Next
        </Button>
      )}
      {activeStep === 6 && (
        <Button sx={StyledButton} onClick={handleSign} color='primary'>
          Sign
        </Button>
      )}
      {activeStep === 5 && (
        <Button
          sx={nextButtonStyle}
          onClick={handlePreview}
          disabled={activeStep === maxSteps - 1}
          color='primary'
        >
          Preview
        </Button>
      )}
    </Box>
  )
}