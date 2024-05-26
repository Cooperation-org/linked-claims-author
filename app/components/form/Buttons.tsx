'use client'
import React from 'react'
import { Box } from '@mui/material'
import { StyledButton } from './boxStyles'

export function Buttons(props: {
  activeStep: number
  handleBack: React.MouseEventHandler<HTMLButtonElement> | undefined
  handleNext: React.MouseEventHandler<HTMLButtonElement> | undefined
  handleSign: React.MouseEventHandler<HTMLButtonElement> | undefined
  handlePreview: React.MouseEventHandler<HTMLButtonElement> | undefined
  maxSteps: number
}) {
  return (
    <Box
      sx={{
        height: '40px',
        display: 'flex',
        gap: '15px',
        justifyContent: props.activeStep !== 0 ? 'space-between' : 'center'
      }}
    >
      {props.activeStep !== 0 && (
        <StyledButton onClick={props.handleBack} color='secondary'>
          back
        </StyledButton>
      )}
      {props.activeStep !== 0 && (
        <StyledButton type='submit' color='secondary'>
          save & Exit
        </StyledButton>
      )}
      {props.activeStep !== 5 && props.activeStep !== 6 && (
        <StyledButton onClick={props.handleNext} color='primary'>
          Next
        </StyledButton>
      )}
      {props.activeStep === 6 && (
        <StyledButton onClick={props.handleSign} color='primary'>
          Sign
        </StyledButton>
      )}
      {props.activeStep === 5 && (
        <StyledButton
          onClick={props.handlePreview}
          disabled={props.activeStep === props.maxSteps - 1}
          color='primary'
        >
          Preview
        </StyledButton>
      )}
    </Box>
  )
}
