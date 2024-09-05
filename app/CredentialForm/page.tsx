'use client'
import { useTheme } from '@mui/material/styles'
import React, { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { Box, Typography, useMediaQuery, Theme } from '@mui/material'
import fram from '../Assets/Images/Frame 35278.png'
import vector from '../Assets/Images/Vector 145.png'
import img3 from '../Assets/Images/Tessa Persona large sceens.png'
import { SVGLargeScreen } from '../Assets/SVGs'
import { StepTrackShape } from '../components/form/fromTexts & stepTrack/StepTrackShape'
import dynamic from 'next/dynamic'

const DynamicForm = dynamic(() => import('../components/form/Form'), {
  ssr: false,
  loading: () => <p></p>
})

const FormComponent = () => {
  const [activStep, setactivStep] = useState(0)
  const theme = useTheme<Theme>()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const formRef = useRef<HTMLDivElement>(null)

  const handleScrollToTop = useCallback(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 10)
    }
  }, [formRef])

  return (
    <Box
      ref={formRef}
      sx={{
        minHeight: 'calc(100vh - 190px)',
        display: !isLargeScreen ? 'flex' : 'block',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'auto'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <StepTrackShape activeStep={activStep} />
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100px',
            mt: '30px'
          }}
        >
          <SVGLargeScreen />
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Image src={img3} alt='logo' style={{ width: '100px', height: '100px' }} />
          </Box>
        </Box>
      </Box>
      <DynamicForm onStepChange={handleScrollToTop} setactivStep={setactivStep} />
      {!isLargeScreen && (
        <Box
          sx={{
            mt: '30px',
            width: '100%',
            height: '114px',
            bgcolor: theme.palette.t3LightBlue,
            p: '28px 70px 28px 50px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <Box>
            <Image src={fram} alt='fram' />
          </Box>
          <Box>
            <Typography
              sx={{
                width: '200px',
                color: theme.palette.t3BodyText,
                fontFamily: 'Lato',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal'
              }}
            >
              Learn how this data is used & protected.
              <Image style={{ marginLeft: '10px' }} src={vector} alt='logo' />
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default FormComponent
