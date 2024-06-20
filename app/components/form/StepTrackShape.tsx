'use client'

import React from 'react'
import { Box } from '@mui/material'

interface StepTrackShapeProps {
  activeStep: number
}

export function StepTrackShape({ activeStep }: Readonly<StepTrackShapeProps>) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gap: '5px',
        justifyContent: 'center'
      }}
    >
      {activeStep !== 0 && (
        <Box
          sx={{
            width: '7px',
            height: '5px',
            bgcolor: 't3BodyText',
            borderRadius: '3px'
          }}
        />
      )}
      <Box
        sx={{
          width:
            activeStep === 0 || activeStep === 1 || activeStep === 2 ? '22px' : '7px',
          height: '5px',
          bgcolor: 't3BodyText',
          borderRadius: '3px'
        }}
      />
      <Box
        sx={{
          width:
            activeStep === 3 || activeStep === 4 || activeStep === 5 ? '22px' : '7px',
          height: '5px',
          bgcolor: 't3BodyText',
          borderRadius: '3px'
        }}
      />
      <Box
        sx={{
          width: activeStep === 6 ? '22px' : '7px',
          height: '5px',
          bgcolor: 't3BodyText',
          borderRadius: '3px'
        }}
      />
    </Box>
  )
}
