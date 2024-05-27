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
import {
  successPageContainerStyles,
  successPageBoxStyles,
  successPageImageStyles,
  successPageInnerBoxStyles,
  successPageTypographyStyles,
  successPageInfoBoxStyles,
  successPageIconContainerStyles,
  successPageIconTextStyles,
  successPageSocialContainerStyles,
  successPageSocialIconStyles,
  successPageButtonContainerStyles,
  successPageButtonStyles
} from './boxStyles'

interface SuccessPageProps {
  setActiveStep: (step: number) => void
}

export function SuccessPage({ setActiveStep }: Readonly<SuccessPageProps>) {
  return (
    <Box sx={successPageContainerStyles}>
      <Box sx={successPageBoxStyles}>
        <Image style={successPageImageStyles} src={image} alt='logo' />
        <Box sx={{ width: '100%' }}>
          <Box sx={successPageInnerBoxStyles}>
            <SVGGroup />
          </Box>
          <Typography sx={successPageTypographyStyles}>Basic Barista Training</Typography>
          <Box sx={successPageInfoBoxStyles}>
            <Box sx={successPageIconContainerStyles}>
              <SVGDate />
              <Typography sx={successPageIconTextStyles}>2 days</Typography>
            </Box>
            <Box sx={successPageIconContainerStyles}>
              <SVGTime />
              <Typography sx={successPageIconTextStyles}>3 min</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={successPageSocialContainerStyles}>
        {[twitter, linkedin, instagram, mail, messageCircle].map((icon, index) => (
          <Box key={index} sx={successPageSocialIconStyles}>
            <Image src={icon} alt={`${icon}Icon`} />
          </Box>
        ))}
      </Box>
      <Box sx={successPageButtonContainerStyles}>
        <Button
          variant='contained'
          onClick={() => setActiveStep(0)}
          sx={successPageButtonStyles}
        >
          Add Another
        </Button>
      </Box>
    </Box>
  )
}
