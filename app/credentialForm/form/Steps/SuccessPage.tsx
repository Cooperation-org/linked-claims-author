/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react'
import {
  Typography,
  TextField,
  InputAdornment,
  Box,
  Button,
  Snackbar,
  Alert
} from '@mui/material'
import {
  SVGDate,
  TwitterSVG,
  InstagramSVG,
  LinkedinSVG,
  MailSVG,
  MessageCircleSVG,
  CopySVG,
  ArrowRightSVG
} from '../../../Assets/SVGs'

import { FormData } from '../../../credentialForm/form/types/Types'
import { copyFormValuesToClipboard } from '../../../utils/formUtils'
import { useTheme } from '@mui/material/styles'
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
import { options } from './Step0'
import { useStepContext } from '../StepContext'

interface SuccessPageProps {
  setActiveStep: (step: number) => void
  formData: FormData | null
  reset: () => void
  link: string
  setLink: (link: string) => void
  setFileId: (link: string) => void
  storageOption: string
  fileId: string
}

const SuccessPage: React.FC<SuccessPageProps> = ({
  formData,
  reset,
  link,
  setLink,
  setFileId,
  fileId,
  storageOption
}) => {
  const { setActiveStep } = useStepContext()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const theme = useTheme()
  const refLink = link ? RegExp(/\/d\/(.+?)\//).exec(link)?.[1] : ''

  // Function to generate LinkedIn URL
  const generateLinkedInUrl = () => {
    const baseLinkedInUrl = 'https://www.linkedin.com/profile/add'
    const params = new URLSearchParams({
      startTask: 'CERTIFICATION_NAME',
      name: formData?.credentialName ?? 'Certification Name',
      organizationName: 'LinkedTrust',
      issueYear: '2024',
      issueMonth: '8',
      expirationYear: '2025',
      expirationMonth: '8',
      certUrl: `https://opencreds.net/view/${fileId}`
    })
    return `${baseLinkedInUrl}?${params.toString()}`
  }

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
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
      handleSendMail()
    } else if (IconComponent === MessageCircleSVG) {
      handleSendSMS()
    } else if (IconComponent === InstagramSVG) {
      const instagramText = `Check out my new certification! ${link}`
      copyFormValuesToClipboard(instagramText)
      setSnackbarMessage('Text copied to clipboard. Ready to paste in Instagram!')
      setSnackbarOpen(true)
    }
  }

  const handleSendMail = () => {
    const subject = `Check out my new certification!`
    const body = `I just earned a new certification! You can view it here: ${link}`
    const mailToLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailToLink

    const timeout = setTimeout(() => {
      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`

      window.open(gmailLink, '_blank')

      navigator.clipboard
        .writeText(body)
        .then(() => {
          setSnackbarMessage('Text copied to clipboard. Ready to paste in Gmail!')
          setSnackbarOpen(true)
        })
        .catch(err => {
          console.error('Failed to copy text: ', err)
          setSnackbarMessage('Failed to copy text')
          setSnackbarOpen(true)
        })
    }, 2000)

    window.addEventListener('blur', () => clearTimeout(timeout), { once: true })
  }

  const handleSendSMS = () => {
    const body = `Check out my new certification: ${link}`
    const smsUrl = `sms:?&body=${encodeURIComponent(body)}`

    window.location.href = smsUrl

    const timeout = setTimeout(() => {
      navigator.clipboard
        .writeText(body)
        .then(() => {
          setSnackbarMessage('Text copied to clipboard. Ready to paste in SMS!')
          setSnackbarOpen(true)
        })
        .catch(err => {
          console.error('Failed to copy text: ', err)
          setSnackbarMessage('Failed to copy text')
          setSnackbarOpen(true)
        })
    }, 2000)

    window.addEventListener('blur', () => clearTimeout(timeout), { once: true })
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
            {formData?.evidenceLink ? (
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
                  src={formData.evidenceLink}
                  alt='Certification Evidence'
                />
              </Box>
            ) : (
              <Box
                sx={{
                  width: '15px',
                  height: '100px'
                }}
              />
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

          <Box sx={successPageCopyLinkStyles}>
            <TextField
              sx={{
                ...successPageTextFieldStyles,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px'
                }
              }}
              value={
                fileId
                  ? `https://opencreds.net/view/${fileId}`
                  : 'wait as your credentials are being processed...'
              }
              InputProps={{
                endAdornment: <InputAdornment position='start'></InputAdornment>,
                startAdornment: (
                  <InputAdornment position='start'>
                    <Box>
                      <Button
                        onClick={() =>
                          copyFormValuesToClipboard(
                            `https://opencreds.net/view/${fileId}`
                          )
                        }
                      >
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
        <Box sx={{ position: 'relative', textAlign: 'center' }}>
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 500,
              color: '#003FE0',
              position: 'relative'
            }}
          >
            Make your credential stand out <br /> with verified references!
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              left: '-40px',
              bottom: '-55px',
              width: '50px',
              height: 'auto'
            }}
          >
            <ArrowRightSVG />
          </Box>
        </Box>
        <Button
          onClick={() => {
            setActiveStep(0)
            reset()
          }}
          variant='contained'
          href={`/askforrecommendation/${refLink}`}
          sx={{
            borderRadius: '100px',
            backgroundColor: '#003FE0',
            textTransform: 'none',
            fontFamily: 'Roboto, sans-serif',
            boxShadow: '0px 0px 2px 2px #F7BC00'
          }}
          disabled={!link}
        >
          Ask for a Recommendation
        </Button>
        <Button
          sx={{
            color: theme.palette.t3TitleText,
            textTransform: 'capitalize',
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
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity='success' sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  )
}

export default SuccessPage
