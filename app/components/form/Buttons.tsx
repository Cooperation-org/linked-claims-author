'use client'

import React from 'react'
import { Box } from '@mui/material'
import { StyledButton } from './boxStyles'

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
          <StyledButton onClick={handleBack} color='secondary'>
            Back
          </StyledButton>
          <StyledButton type='submit' color='secondary'>
            Save & Exit
          </StyledButton>
        </>
      )}
      {activeStep !== 5 && activeStep !== 6 && (
        <StyledButton onClick={handleNext} color='primary' disabled={!isValid}>
          Next
        </StyledButton>
      )}
      {activeStep === 6 && (
        <StyledButton onClick={handleSign} color='primary'>
          Sign
        </StyledButton>
      )}
      {activeStep === 5 && (
        <StyledButton
          onClick={handlePreview}
          disabled={activeStep === maxSteps - 1}
          color='primary'
        >
          Preview
        </StyledButton>
      )}
    </Box>
  )
}
