'use client'

import React from 'react'
import Image from 'next/image'
import { Box, Button, Typography } from '@mui/material'
import { SVGGroup, SVGDate, SVGTime } from '../../Assets/SVGs'
import image from '../../Assets/nathan-dumlao-zUNs99PGDg0-unsplash 1.png'
import twitter from '../../Assets/twitter.svg'
import instagram from '../../Assets/instagram.svg'
import linkedin from '../../Assets/linkedin.svg'
import mail from '../../Assets/mail.png'
import messageCircle from '../../Assets/message-circle.png'

interface SuccessPageProps {
  palette: {
    t3LightGray: string
    t3BodyText: string
    t3PlaceholderText: string
    t3ButtonBlue: string
  }
  setActiveStep: (step: number) => void
}

export function SuccessPage({ palette, setActiveStep }: SuccessPageProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100px',
          display: 'flex',
          gap: '15px',
          bgcolor: palette.t3LightGray,
          borderRadius: '20px'
        }}
      >
        <Image
          style={{
            width: '100px',
            height: '100px'
          }}
          src={image}
          alt='logo'
        />
        <Box sx={{ width: '100%' }}>
          <Box sx={{ textAlign: 'right', pr: '15px', mt: '5px' }}>
            <SVGGroup />
          </Box>
          <Typography
            sx={{
              color: palette.t3BodyText,
              textAlign: 'left',
              fontFamily: 'Inter',
              fontSize: '15px',
              fontWeight: 700,
              textTransform: 'capitalize'
            }}
          >
            Basic Barista Training
          </Typography>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              gap: '15px',
              mt: '5px'
            }}
          >
            <Box sx={{ display: 'flex', gap: '3px' }}>
              <SVGDate />
              <Typography
                sx={{
                  color: palette.t3PlaceholderText,
                  textAlign: 'center',
                  fontFamily: 'Poppins',
                  fontSize: '13px',
                  fontWeight: 400,
                  lineHeight: '150%'
                }}
              >
                2 days
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '3px' }}>
              <SVGTime />
              <Typography
                sx={{
                  color: palette.t3PlaceholderText,
                  textAlign: 'center',
                  fontFamily: 'Poppins',
                  fontSize: '13px',
                  fontWeight: 400,
                  lineHeight: '150%'
                }}
              >
                3 min
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '9px'
        }}
      >
        {[twitter, linkedin, instagram, mail, messageCircle].map((icon, index) => (
          <Box
            key={index}
            sx={{
              bgcolor: palette.t3LightGray,
              borderRadius: '20px',
              height: '40px',
              width: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image src={icon} alt={`${icon}Icon`} />
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          width: '100%',
          justifyContent: 'center',
          display: 'flex'
        }}
      >
        <Button
          variant='contained'
          onClick={() => setActiveStep(0)}
          sx={{
            padding: '10px 24px',
            borderRadius: '100px',
            bgcolor: palette.t3ButtonBlue,
            textTransform: 'capitalize',
            fontFamily: 'Roboto',
            lineHeight: '20px',
            '&:hover': {
              bgcolor: palette.t3ButtonBlue
            }
          }}
        >
          Add Another
        </Button>
      </Box>
    </Box>
  )
}
