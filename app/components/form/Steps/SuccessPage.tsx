import React from 'react'
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
  // Function to generate LinkedIn URL
  const generateLinkedInUrl = () => {
    const baseLinkedInUrl = 'https://www.linkedin.com/profile/add'
    const params = new URLSearchParams({
      startTask: 'CERTIFICATION_NAME',
      name: formData?.credentialName || 'Certification Name',
      organizationId: '1337', // Replace with your actual organization ID
      issueYear: '2024',
      issueMonth: '8',
      expirationYear: '2025',
      expirationMonth: '8',
      certUrl: link,
      certId: '1234'
    })
    return `${baseLinkedInUrl}?${params.toString()}`
  }

  return (
    <>
      <Box sx={successPageContainerStyles}>
        <Box sx={successPageHeaderStyles}>
          <img
            style={{
              width: '100px',
              height: '100px',
              borderTopLeftRadius: '15px'
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
              <Button
                key={index}
                sx={successPageIconContainerStyles}
                onClick={() => {
                  if (IconComponent === LinkedinSVG) {
                    const linkedInUrl = generateLinkedInUrl()
                    window.open(linkedInUrl, '_blank', 'noopener noreferrer')
                  }
                }}
              >
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
            value={link || 'loading...'}
            InputProps={{
              startAdornment: <InputAdornment position='start'></InputAdornment>,
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
