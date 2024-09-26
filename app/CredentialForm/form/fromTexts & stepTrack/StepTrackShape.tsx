'use client'

import React from 'react'
import { Box } from '@mui/material'
import { useStepContext } from '../StepContext'

const TOTAL_STEPS = 8

export function StepTrackShape() {
  const { activeStep } = useStepContext()
  const renderStepBox = (step: number) => (
    <Box
      key={step}
      sx={{
        width: activeStep === step ? '22px' : '7px',
        height: '5px',
        bgcolor:
          activeStep === step ? '#003fe0' : activeStep > step ? '#14b8a6' : '#d1d5db',
        borderRadius: '3px',
        mt: '20px'
      }}
    />
  )

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gap: '5px',
        justifyContent: 'center'
      }}
    >
      {Array.from({ length: TOTAL_STEPS }, (_, index) => renderStepBox(index))}
    </Box>
  )
}
