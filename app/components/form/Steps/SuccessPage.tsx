import React, { useState } from 'react'
import Image from 'next/image'
import {
  Typography,
  TextField,
  InputAdornment,
  Divider,
  Box,
  Button,
  Snackbar
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
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  // Function to generate LinkedIn URL
  const generateLinkedInUrl = () => {
    const baseLinkedInUrl = 'https://www.linkedin.com/profile/add'
    const params = new URLSearchParams({
      startTask: 'CERTIFICATION_NAME',
      name: formData?.credentialName ?? 'Certification Name',
      organizationName: 'LinkedTrust', // Updated to use organization name
      issueYear: '2024',
      issueMonth: '8',
      expirationYear: '2025',
      expirationMonth: '8',
      certUrl: link
    })
    return `${baseLinkedInUrl}?${params.toString()}`
  }

  const handleShare = (IconComponent: any) => {
    if (IconComponent === LinkedinSVG) {
      const linkedInUrl = generateLinkedInUrl()
      window.open(linkedInUrl, '_blank', 'noopener noreferrer')
    } else if (IconComponent === TwitterSVG) {
      const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        link
      )}&text=Check out my new certification!`
      window.open(twitterUrl, '_blank', 'noopener noreferrer')
    } else if (IconComponent === MailSVG) {
      const mailUrl = `mailto:?subject=Check%20out%20my%20new%20certification&body=You%20can%20view%20my%20certification%20here:%20${encodeURIComponent(
        link
      )}`
      window.location.href = mailUrl
    } else if (IconComponent === MessageCircleSVG) {
      const smsUrl = `sms:?&body=Check%20out%20my%20new%20certification:%20${encodeURIComponent(
        link
      )}`
      window.location.href = smsUrl
    } else if (IconComponent === InstagramSVG) {
      const instagramText = `Check out my new certification! ${link}`
      copyFormValuesToClipboard(instagramText)
      setSnackbarOpen(true)
    }
  }

  return (
    <>
      <Box sx={successPageContainerStyles}>
        <Box sx={successPageHeaderStyles}>
          {formData?.evidenceLink ? (
            <img
              style={{
                width: '100px',
                height: '100px',
                borderTopLeftRadius: '15px'
              }}
              src={formData.evidenceLink}
              alt='Certification Evidence'
            />
          ) : (
            <Box sx={{ width: '100px', height: '100px' }} />
          )}
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
                onClick={() => handleShare(IconComponent)}
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message='Text copied to clipboard. Ready to paste in Instagram!'
      />
    </>
  )
}

export default SuccessPage
