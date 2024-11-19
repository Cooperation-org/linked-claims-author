'use client'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import { Box, Button, Typography, Alert } from '@mui/material'
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
        pt: '60px'
      }}
    >
      {/* Header Component */}
      <Box
        sx={{
          alignItems: { xs: 'center', md: 'start' },
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '92.308vw', md: '712px' },
          pb: '10px',
          justifyContent: 'start'
        }}
      >
        <Typography
          sx={{
            color: '#000',
            fontFamily: 'Poppins',
            fontSize: 'clamp(24px, 2vw + 1rem, 40px)',
            fontWeight: 700,
            lineHeight: '110%',
            textAlign: 'left',
            minWidth: '320px',
            maxWidth: '720px'
          }}
        >
          Capture your life
          <br /> highlights, add proof <br /> & unlock new opportunities.
        </Typography>
      </Box>
      {/* Get Started Button */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'flex-start',
          mb: '57px',
          width: '690px'
        }}
      >
        <Link href='/credentialForm'>
          <Button
            sx={{
              minWidth: { xs: '320px', md: '173px' },
              width: { xs: '92.308vw', md: '10.01vw' },
              maxWidth: '360px',
              height: '52px',
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
          flexDirection: { xs: 'column', md: 'row' },
          gap: '57px',
          alignItems: { xs: 'center', md: 'flex-start' },
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            mr: '10px',
            gap: '20px',
            maxWidth: '320px',
            mb: { xs: '10px', md: '140px' }
          }}
        >
          {features.map(feature => (
            <Box key={feature.id}>
              <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <SVGCheckMarks />
                <Typography
                  sx={{
                    color: theme.palette.t3BodyText,
                    fontFamily: 'Lato',
                    fontSize: '18px',
                    fontWeight: '400',
                    lineHeight: 'normal'
                  }}
                >
                  {feature.name}
                </Typography>
              </Box>
              {feature.id === 4 && (
                <Alert 
                  severity="info" 
                  sx={{ 
                    mt: 1,
                    ml: 4,
                    backgroundColor: 'transparent',
                    border: 'none',
                    '& .MuiAlert-icon': {
                      color: theme.palette.t3BodyText,
                    },
                    '& .MuiAlert-message': {
                      color: theme.palette.t3BodyText,
                      fontFamily: 'Lato',
                      fontSize: '14px',
                    },
                  }}
                >
During testing when you connect to Google Drive to establish the storage location for your credentials, you will get a warning message from Google, &quot;Google hasn&#39;t verified this app&quot;. Just look down and to the left and you&#39;ll see Advanced in smaller type. Click that and at the bottom the text that appears is &quot;Go to opencreds.net (unsafe)&quot; Click the link and proceed.  We are awaiting final Google Review of the code which we expect soon.
                </Alert>
              )}
            </Box>
          ))}
        </Box>

        {/* OverlappingCards Component */}
        <OverlappingCards />
      </Box>

      {/* Get Started Button */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          alignItems: 'center',
          mt: '10px'
        }}
      >
        <Link href='/credentialForm'>
          <Button
            sx={{
              minWidth: { xs: '320px', md: '173px' },
              width: { xs: '92.308vw', md: '10.01vw' },
              maxWidth: '360px',
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
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          width: { xs: '320px', md: 'auto' },
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '15px',
          mb: '20px'
        }}
      >
        {features.map(feature => (
          <Box key={feature.id}>
            <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
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
            {feature.id === 4 && (
              <Alert 
                severity="info" 
                sx={{ 
                  mt: 1,
                  ml: 4,
                  backgroundColor: 'transparent',
                  border: 'none',
                  '& .MuiAlert-icon': {
                    color: theme.palette.t3BodyText,
                  },
                  '& .MuiAlert-message': {
                    color: theme.palette.t3BodyText,
                    fontFamily: 'Lato',
                    fontSize: '14px',
                  },
                }}
              >
              During testing when you connect to Google Drive to establish the storage location for your credentials, you will get a warning message from Google, &quot;Google hasn&#39;t verified this app&quot;.  Just look down and to the left and you&#39;ll see Advanced in smaller type.  Click that and at the bottom the text that appears is &quot;Go to <u>opencreds.net</u> (unsafe)&quot;.  Click the link and proceed.  We are awaiting final Google Review of the code which we expect soon.
              </Alert>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Page
