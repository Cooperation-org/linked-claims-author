/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, MouseEvent } from 'react'
import {
  Typography,
  TextField,
  InputAdornment,
  Box,
  Button,
  Snackbar,
  Alert,
  ButtonGroup,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import EmailIcon from '@mui/icons-material/Email'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

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
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(menuAnchorEl)

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
      handleSendMailto()
    } else if (IconComponent === MessageCircleSVG) {
      handleSendSMS()
    } else if (IconComponent === InstagramSVG) {
      const instagramText = `Check out my new certification! ${link}`
      copyFormValuesToClipboard(instagramText)
      setSnackbarMessage('Text copied to clipboard. Ready to paste in Instagram!')
      setSnackbarOpen(true)
    }
  }

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }

  const handleSendMailto = () => {
    const subject = `Check out my new certification!`
    const body = `I just earned a new certification! You can view it here: ${link}`
    const mailToLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailToLink
    setSnackbarMessage('Mail client opened.')
    setSnackbarOpen(true)
    handleMenuClose()
  }

  const handleSendGmail = () => {
    const subject = `Check out my new certification!`
    const body = `I just earned a new certification! You can view it here: ${link}`

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    window.open(gmailLink, '_blank')

    navigator.clipboard
      .writeText(body)
      .then(() => {
        setSnackbarMessage('Email body copied to clipboard. Ready to paste in Gmail!')
        setSnackbarOpen(true)
      })
      .catch(err => {
        console.error('Failed to copy text:', err)
        setSnackbarMessage('Failed to copy text')
        setSnackbarOpen(true)
      })

    handleMenuClose()
  }

  const handleCopy = () => {
    const body = `Check out my new certification: ${link}`
    navigator.clipboard
      .writeText(body)
      .then(() => {
        setSnackbarMessage('Text copied to clipboard.')
        setSnackbarOpen(true)
      })
      .catch(err => {
        console.error('Failed to copy text:', err)
        setSnackbarMessage('Failed to copy text')
        setSnackbarOpen(true)
      })

    handleMenuClose()
  }

  const handleSendSMS = () => {
    const body = `Check out my new certification: ${link}`
    const smsUrl = `sms:?&body=${encodeURIComponent(body)}`

    window.location.href = smsUrl

    navigator.clipboard
      .writeText(body)
      .then(() => {
        setSnackbarMessage('Text copied to clipboard. Ready to paste in SMS!')
        setSnackbarOpen(true)
      })
      .catch(err => {
        console.error('Failed to copy text:', err)
        setSnackbarMessage('Failed to copy text')
        setSnackbarOpen(true)
      })
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
                readOnly: true,
                endAdornment: <InputAdornment position='start'></InputAdornment>,
                startAdornment: (
                  <InputAdornment position='start'>
                    <Box>
                      <ButtonGroup variant='contained' sx={{ boxShadow: 'none' }}>
                        <Button
                          onClick={() =>
                            copyFormValuesToClipboard(
                              `https://opencreds.net/view/${fileId}`
                            )
                          }
                          sx={{
                            padding: '5px 10px',
                            borderRadius: '10px 0 0 10px',
                            backgroundColor: '#003FE0',
                            color: '#fff',
                            '&:hover': {
                              backgroundColor: '#002bb5'
                            }
                          }}
                        >
                          <CopySVG />
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </InputAdornment>
                )
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

        <ButtonGroup variant='contained' sx={{ width: '100%', boxShadow: 'none', mt: 2 }}>
          <Button
            onClick={() => {
              window.location.href = `mailto:?subject=Check out my new certification!&body=I just earned a new certification! You can view it here: ${link}`
            }}
            sx={{
              borderRadius: '100px 0 0 100px',
              backgroundColor: '#003FE0',
              color: '#fff',
              textTransform: 'none',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              '&:hover': {
                backgroundColor: '#002bb5'
              },
              flexGrow: 1
            }}
          >
            Ask for a Recommendation
          </Button>
          <Button
            size='small'
            aria-controls={menuOpen ? 'email-menu-success' : undefined}
            aria-haspopup='true'
            aria-expanded={menuOpen ? 'true' : undefined}
            onClick={handleMenuClick}
            sx={{
              borderRadius: '0 100px 100px 0',
              backgroundColor: '#003FE0',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#002bb5'
              },
              minWidth: '40px'
            }}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>

        <Menu
          id='email-menu-success'
          anchorEl={menuAnchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <MenuItem onClick={handleSendGmail}>
            <ListItemIcon>
              <EmailIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Gmail</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleCopy}>
            <ListItemIcon>
              <ContentCopyIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
          </MenuItem>
        </Menu>

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
            boxShadow: '0px 0px 2px 2px #F7BC00',

            '&:hover': {
              backgroundColor: '#002bb5'
            },
            mt: 2
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
            lineHeight: '20px',
            mt: 1
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
      </Box>

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
    </>
  )
}

export default SuccessPage
