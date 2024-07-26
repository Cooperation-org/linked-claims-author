'use client'

import React from 'react'
import { Box, Button } from '@mui/material'
import { StyledButton, nextButtonStyle } from '../../../../components/Styles/appStyles'

interface ButtonsProps {
  activeStep: number
  handleBack: React.MouseEventHandler<HTMLButtonElement> | undefined
  handleNext: React.MouseEventHandler<HTMLButtonElement> | undefined
  handleSign: React.MouseEventHandler<HTMLButtonElement> | undefined
  maxSteps: number
  isValid: boolean
}

export function Buttons({
  activeStep,
  handleBack,
  handleNext,
  handleSign,
  maxSteps,
  isValid
}: Readonly<ButtonsProps>) {
  return (
    <Box
      sx={{
        width: { xs: '100%', md: '35%', lg: '35%' },
        height: '40px',
        display: 'flex',

        gap: '15px',
        justifyContent: activeStep == 1 ? 'center' : 'space-between'
      }}
    >
      {activeStep !== 0 && activeStep !== 1 && (
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
          sx={{
            ...nextButtonStyle,
            maxWidth: '355px'
          }}
          onClick={handleNext}
          color='primary'
          disabled={!isValid}
          variant='contained'
        >
          Next
        </Button>
      )}
      {activeStep === 6 && (
        <Button sx={nextButtonStyle} onClick={handleSign} color='primary'>
          Finish & Sign
        </Button>
      )}
      {activeStep === 5 && (
        <Button
          sx={nextButtonStyle}
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
          color='primary'
        >
          Preview
        </Button>
      )}
    </Box>
  )
}
