'use client'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Box, Typography, useMediaQuery, Theme } from '@mui/material'
import fram from '../Assets/Frame 35278.png'
import vector from '../Assets/Vector 145.png'
import img3 from '../Assets/Tessa Persona large sceens.png'
import { SVGLargeScreen } from '../Assets/SVGs'

const FormComponent = () => {
  const theme = useTheme<Theme>()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'))

  const DynamicComponentWithNoSSR = dynamic(() => import('../components/form/Form'), {
    ssr: false
  })

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 153px)',
        display: !isLargeScreen ? 'flex' : 'block',
        flexDirection: 'column',
        justifyContent: 'space-between'
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
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100px',
            mt: '50px'
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
      <DynamicComponentWithNoSSR />
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
