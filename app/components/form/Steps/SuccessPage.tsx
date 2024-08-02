'use client'

import React from 'react' //{ useState }
// import Image from 'next/image'
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Divider
} from '@mui/material'
import { SVGDate } from '../../../Assets/SVGs'
import TwitterIcon from '../../../Assets/SVGs/twitter.svg'
import InstagramIcon from '../../../Assets/SVGs/instagram.svg'
import LinkedinIcon from '../../../Assets/SVGs/linkedin.svg'
import MailIcon from '../../../Assets/SVGs/mail.svg'
import MessageCircleIcon from '../../../Assets/SVGs/message-circle.svg'
import CopyIcon from '../../../Assets/SVGs/copy.svg'
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
  const imageUrl = formData?.evidenceLink ?? ''
  return (
    <>
      <Box sx={successPageContainerStyles}>
        <Box sx={successPageHeaderStyles}>
          {imageUrl && (
            <img
              style={{ width: '69px', height: '69px', objectFit: 'cover' }}
              src={imageUrl}
              alt='User Provided'
            />
          )}
          <Box sx={{ flex: 1 }}>
            <Typography sx={successPageTitleStyles}>
              {formData?.credentialName}
            </Typography>
            {formData?.credentialDuration && (
              <Box sx={successPageInfoStyles}>
                <SVGDate />
                <Typography sx={successPageDateStyles}>
                  {formData?.credentialDuration}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Divider sx={{ width: '100%' }} />

        <Box sx={successPageShareStyles}>
          <Typography sx={successPageShareTextStyles}>Share on:</Typography>
          <Box sx={successPageIconContainerStyles}>
            <TwitterIcon width={24} height={24} />
          </Box>
          <Box sx={successPageIconContainerStyles}>
            <InstagramIcon width={24} height={24} />
          </Box>
          <Box sx={successPageIconContainerStyles}>
            <LinkedinIcon width={24} height={24} />
          </Box>
          <Box sx={successPageIconContainerStyles}>
            <MailIcon width={24} height={24} />
          </Box>
          <Box sx={successPageIconContainerStyles}>
            <MessageCircleIcon width={24} height={24} />
          </Box>
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
                    <CopyIcon width={24} height={24} />
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
