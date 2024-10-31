'use client'

import React from 'react'
import { Box } from '@mui/material'
import { useStepContext } from '../StepContext'
import { usePathname } from 'next/navigation'
import { SVGCompleteStep } from '../../../Assets/SVGs'

export function StepTrackShape() {
  const pathname = usePathname()
  const TOTAL_STEPS = pathname?.includes('/recommendations') ? 7 : 4
  const { activeStep } = useStepContext()

  const renderStepBox = (step: number) => {
    let content
    let bgColor
    let textColor = 'black'

    if (step < activeStep - 1) {
      // **Completed Steps**
      content = <SVGCompleteStep />
    } else if (step === activeStep - 1) {
      content = step + 1
      bgColor = '#003FE0'
      textColor = 'white'
    } else {
      content = step + 1
      bgColor = '#d1d5db'
    }

    return (
      <Box
        key={step}
        sx={{
          width: '20px',
          height: '20px',
          bgcolor: bgColor,
          color: textColor,
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '13px',
          fontFamily: 'SF Pro Display',
          flexShrink: 0
        }}
      >
        {content}
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        alignItems: 'center' // Center align vertically
      }}
    >
      {Array.from({ length: TOTAL_STEPS }, (_, index) => renderStepBox(index))}
    </Box>
  )
}
