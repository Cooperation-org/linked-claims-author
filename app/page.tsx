'use client'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { SVGCheckMarks } from './Assets/SVGs'
import OverlappingCards from './components/OverLappingCards/OverLappingCards'

import Link from 'next/link'

const features = [
  { id: 1, name: 'Capture any skill or experience' },
  { id: 2, name: 'Add portfolio pieces and evidence' },
  { id: 3, name: 'Request references from others' },
  { id: 4, name: 'Share with employers & on LinkedIn' }
]

const Page = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        alignItems: 'center',
        pt: '54px',
        paddingBottom: '40px'
      }}
    >
      {/* Header Component */}
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '92.308vw', md: '712px' },
          pb: '10px',
          ml: '10px',
          mb: '25px'
        }}
      >
        <Typography
          sx={{
            color: '#000',
            fontFamily: 'Poppins',
            fontSize: { xs: '24px', md: '50px' },
            fontWeight: 700,
            lineHeight: '110%',
            textAlign: 'left',
            width: { xs: '360px', md: '720px' }
          }}
        >
          Capture your life
          <br /> highlights, add proof <br /> & unlock new opportunities.{' '}
        </Typography>
      </Box>

      {/* OverlappingCards Component */}
      <OverlappingCards />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: '10px'
        }}
      >
        <Link href='/credentialForm'>
          <Button
            sx={{
              width: '360px',
              height: '40px',
              fontFamily: 'Lato',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '20px',
              borderRadius: '100px',
              backgroundColor: theme.palette.t3ButtonBlue,
              color: 'white',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: theme.palette.t3ButtonBlue
              }
            }}
          >
            Get Started
          </Button>
        </Link>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '321px', md: 'auto' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: '15px',
          mb: '20px'
        }}
      >
        {features.map(feature => (
          <Box
            key={feature.id}
            sx={{
              display: 'flex',
              gap: '15px',
              width: '100%',
              maxWidth: '321px'
            }}
          >
            <SVGCheckMarks />
            <Typography
              sx={{
                color: theme.palette.t3BodyText,
                flexShrink: 0,
                fontFamily: 'Lato',
                fontSize: '18px',
                fontWeight: '400',
                lineHeight: 'normal'
              }}
            >
              {feature.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Page
