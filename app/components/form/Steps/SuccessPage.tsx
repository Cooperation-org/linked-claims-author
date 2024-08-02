'use client'

import React, { useState } from 'react'
import Image from 'next/image'

import {
  Typography,
  TextField,
  InputAdornment,
  Divider,
  Box,
  Button
} from '@mui/material'
import {
  SVGDate,
  TwitterSVG,
  InstagramSVG,
  LinkedinSVG,
  MailSVG,
  MessageCircleSVG
} from '../../../Assets/SVGs'
import image from '../../../Assets/Images/nathan-dumlao-zUNs99PGDg0-unsplash 1.png'
import copy from '../../../Assets/SVGs/copy.svg'
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
} from '../../Styles/appStyles'
import { FormData } from '../types/Types'
import { copyFormValuesToClipboard } from '../../../utils/formUtils'
interface SuccessPageProps {
  setActiveStep: (step: number) => void
  formData: FormData | null
  reset: () => void
  link: string
}
const SuccessPage: React.FC<SuccessPageProps> = ({
  setActiveStep,
  formData,
  reset,
  link
}) => {
  return (
    <>
      <Box sx={successPageContainerStyles}>
        <Box sx={successPageHeaderStyles}>
          <img
            style={{
              width: '100px',
              height: '100px',
              borderTopLeftRadius: '15px',
            }}
            src={formData?.evidenceLink || 'not Valid image'}
            alt='logo'
          />
          <Box sx={{ flex: 1 }}>
            <Typography sx={successPageTitleStyles}>
              {formData?.credentialName}
            </Typography>
            <Box sx={successPageInfoStyles}>
              <SVGDate />
              <Typography sx={successPageDateStyles}>
                {formData?.credentialDuration}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ width: '100%' }} />

        <Box sx={successPageShareStyles}>
          <Typography sx={successPageShareTextStyles}>Share on:</Typography>
          {[TwitterSVG, LinkedinSVG, InstagramSVG, MailSVG, MessageCircleSVG].map(
            (IconComponent, index) => (
              <Button key={index} sx={successPageIconContainerStyles}>
                <IconComponent />
              </Button>
            )
          )}
        </Box>

        <Divider sx={{ width: '100%' }} />

        <Box sx={successPageCopyLinkStyles}>
          <Typography sx={successPageCopyLinkTextStyles}>Copy link:</Typography>
          <TextField
            sx={successPageTextFieldStyles}
            value={link}
            InputProps={{
              startAdornment: <InputAdornment position='start'>http://</InputAdornment>,
              endAdornment: (
                <InputAdornment position='end'>
                  <Button onClick={() => copyFormValuesToClipboard(link)}>
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
