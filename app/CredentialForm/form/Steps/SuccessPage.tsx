'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
  Typography,
  TextField,
  InputAdornment,
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
  MessageCircleSVG,
  CopySVG
} from '../../../Assets/SVGs'
import copy from '../../../Assets/SVGs/copy.svg'

import { FormData } from '../types/Types'
import { copyFormValuesToClipboard } from '../../../utils/formUtils'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import {
  successPageContainerStyles,
  successPageShareStyles,
  successPageIconContainerStyles,
  successPageHeaderStyles,
  successPageTitleStyles,
  successPageInfoStyles,
  successPageDateStyles,
  successPageCopyLinkStyles,
  successPageTextFieldStyles
} from '../../../components/Styles/appStyles'

interface SuccessPageProps {
  setActiveStep: (step: number) => void
  formData: FormData | null
  reset: () => void
  link: string
  setLink: (link: string) => void
}

const SuccessPage: React.FC<SuccessPageProps> = ({
  setActiveStep,
  formData,
  reset,
  link,
  setLink
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const theme = useTheme()
  const encodedLink = encodeURIComponent(link)

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
        <Box sx={successPageShareStyles}>
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
        <Box sx={{ width: '100%' }}>
          <Box sx={successPageHeaderStyles}>
            <Box
              sx={{
                borderRadius: '20px 0px 0px 20px',
                width: '100px',
                height: '100px'
              }}
            >
              <img
                style={{
                  borderRadius: '20px 0px 0px 20px',
                  width: '100px',
                  height: '100px'
                }}
                src={formData?.evidenceLink || 'not Valid image'}
                alt='logo'
              />
            </Box>
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

          <Box sx={successPageCopyLinkStyles}>
            <TextField
              sx={{
                ...successPageTextFieldStyles,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px'
                }
              }}
              value={link || 'loading...'}
              InputProps={{
                endAdornment: <InputAdornment position='start'></InputAdornment>,
                startAdornment: (
                  <InputAdornment position='start'>
                    <Box>
                      <Button onClick={() => copyFormValuesToClipboard(link)}>
                        <CopySVG />
                      </Button>
                    </Box>
                  </InputAdornment>
                ),
                readOnly: true
              }}
            />
          </Box>
        </Box>
        <Link href={`/AskForRecommendation/${encodedLink}`}>
          <Button
            variant='contained'
            sx={{
              borderRadius: '100px',
              backgroundColor: '#003FE0',
              textTransform: 'none',
              fontFamily: 'Roboto, sans-serif',
              boxShadow: '0px 0px 2px 2px #F7BC00'
            }}
          >
            <Typography>Ask for a Recommendation</Typography>
          </Button>
        </Link>
      </Box>
      <Button
        sx={{
          color: theme.palette.t3TitleText,
          textTransform: 'capitalize',
          m: '20px 0',
          fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '20px'
        }}
        variant='text'
        onClick={() => {
          setActiveStep(0)
          setLink('')
          reset()
        }}
      >
        Claim Another Skill
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