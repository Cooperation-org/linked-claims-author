'use client'

import React from 'react'
import Image from 'next/image'
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Divider
} from '@mui/material'
import { SVGDate } from '../../Assets/SVGs'
import image from '../../Assets/nathan-dumlao-zUNs99PGDg0-unsplash 1.png'
import twitter from '../../Assets/twitter.svg'
import instagram from '../../Assets/instagram.svg'
import linkedin from '../../Assets/linkedin.svg'
import mail from '../../Assets/mail.svg'
import messageCircle from '../../Assets/message-circle.svg'
import copy from '../../Assets/copy.svg'
import {
  successPageContainerStyles,
  successPageHeaderStyles,
  successPageTitleStyles,
  successPageInfoStyles,
  successPageDateStyles,
  successPageShareStyles,
  successPageShareTextStyles,
  successPageIconContainerStyles,
  successPageCopyLinkStyles,
  successPageCopyLinkTextStyles,
  successPageTextFieldStyles,
  successPageButtonStyles
} from './boxStyles'
import { FormData } from './Types'

interface SuccessPageProps {
  setActiveStep: (step: number) => void
  formData: FormData
  reset: () => void
}

const SuccessPage: React.FC<SuccessPageProps> = ({ setActiveStep, formData, reset }) => {
  return (
    <>
      <Box sx={successPageContainerStyles}>
        <Box sx={successPageHeaderStyles}>
          <Image style={{ width: '69px', height: '69px' }} src={image} alt='logo' />
          <Box sx={{ flex: 1 }}>
            <Typography sx={successPageTitleStyles}>{formData.credentialName}</Typography>
            <Box sx={successPageInfoStyles}>
              <SVGDate />
              <Typography sx={successPageDateStyles}>
                {formData.credentialDuration}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ width: '100%' }} />

        <Box sx={successPageShareStyles}>
          <Typography sx={successPageShareTextStyles}>Share on:</Typography>
          {[twitter, linkedin, instagram, mail, messageCircle].map((icon, index) => (
            <Box key={index} sx={successPageIconContainerStyles}>
              <Image src={icon} alt={`${icon}Icon`} />
            </Box>
          ))}
        </Box>

        <Divider sx={{ width: '100%' }} />

        <Box sx={successPageCopyLinkStyles}>
          <Typography sx={successPageCopyLinkTextStyles}>Copy link:</Typography>
          <TextField
            sx={successPageTextFieldStyles}
            value='https://www.linkedclaims.com/file/f0g7iKqcLqxEscHmeZgDmp/Linked-Credentials?type=design&node-id=1-3&mode=design&t=2dmf296EWsNQ7ZFL-0'
            InputProps={{
              startAdornment: <InputAdornment position='start'>http://</InputAdornment>,
              endAdornment: (
                <InputAdornment position='end'>
                  <Button>
                    <Image src={copy} alt='copyIcon' />
                  </Button>
                </InputAdornment>
              ),
              readOnly: true
            }}
          />
        </Box>
      </Box>
      <Button
        variant='contained'
        onClick={() => {
          setActiveStep(0)
          reset()
        }}
        sx={successPageButtonStyles}
      >
        Add Another
      </Button>
    </>
  )
}

export default SuccessPage
