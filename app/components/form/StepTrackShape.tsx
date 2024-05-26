'use client'
import React from 'react'
import { Box } from '@mui/material'

export function StepTrackShape(props: {
  activeStep: number
  palette: { t3BodyText: any }
}) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gap: '5px',
        justifyContent: 'center'
      }}
    >
      {props.activeStep !== 0 && (
        <Box
          sx={{
            width: '7px',
            height: '5px',
            bgcolor: props.palette.t3BodyText,
            borderRadius: '3px'
          }}
        ></Box>
      )}
      <Box
        sx={{
          width:
            props.activeStep === 0 || props.activeStep === 1 || props.activeStep === 2
              ? '22px'
              : '7px',
          height: '5px',
          bgcolor: props.palette.t3BodyText,
          borderRadius: '3px'
        }}
      ></Box>
      <Box
        sx={{
          width:
            props.activeStep === 3 || props.activeStep === 4 || props.activeStep === 5
              ? '22px'
              : '7px',
          height: '5px',
          bgcolor: props.palette.t3BodyText,
          borderRadius: '3px'
        }}
      ></Box>
      <Box
        sx={{
          width: props.activeStep === 6 ? '22px' : '7px',
          height: '5px',
          bgcolor: props.palette.t3BodyText,
          borderRadius: '3px'
        }}
      ></Box>
    </Box>
  )
}
