'use client'

import React, { useState } from 'react'
import { Box, Tooltip, Snackbar, Alert } from '@mui/material'
import { useStepContext } from '../StepContext'
import { useSession } from 'next-auth/react'
import { SVGCompleteStep } from '../../../Assets/SVGs'

export function StepTrackShape() {
  const { activeStep, setActiveStep } = useStepContext()
  const { data: session } = useSession()
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const TOTAL_STEPS = pathname.includes('/recommendations') ? 7 : 4

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const renderStepBox = (step: number) => {
    let content
    let bgColor
    let textColor = 'black'

    if (step < activeStep) {
      // **Completed Steps**
      content = <SVGCompleteStep />
    } else if (step === activeStep) {
      content = step + 1
      bgColor = '#003FE0'
      textColor = 'white'
    } else {
      content = step + 1
      bgColor = '#d1d5db'
    }
    const handleStepClick = () => {
      if (!session?.accessToken) {
        setOpenSnackbar(true)
        return
      }

      if (step <= activeStep) {
        setActiveStep(step)
      } else {
        setOpenSnackbar(true)
      }
    }

    const isClickable = session?.accessToken && step <= activeStep

    return (
      <Tooltip title={`Step ${step + 1}`} key={step}>
        <Box
          onClick={isClickable ? handleStepClick : undefined}
          sx={{
            width: '30px',
            height: '30px',
            bgcolor: bgColor,
            color: textColor,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '13px',
            fontFamily: 'SF Pro Display',
            flexShrink: 0,
            cursor: isClickable ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.3s, color 0.3s',
            '&:hover': {
              backgroundColor: isClickable ? '#002bb3' : bgColor
            }
          }}
        >
          {content}
        </Box>
      </Tooltip>
    )
  }

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {Array.from({ length: TOTAL_STEPS }, (_, index) => renderStepBox(index))}
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity='warning' sx={{ width: '100%' }}>
          {session?.accessToken
            ? 'You cannot navigate to future steps.'
            : 'Please sign in to navigate between steps.'}
        </Alert>
      </Snackbar>
    </>
  )
}

export default StepTrackShape
