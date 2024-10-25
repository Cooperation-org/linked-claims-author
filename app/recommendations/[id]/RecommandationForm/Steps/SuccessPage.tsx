'use client'

import React, { useState, useEffect, useCallback, MouseEvent } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  InputAdornment,
  ButtonGroup,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { SVGBadge, CopySVG } from '../../../../Assets/SVGs'
import { copyFormValuesToClipboard } from '../../../../utils/formUtils'
import { FormData } from '../../../../credentialForm/form/types/Types'
import ComprehensiveClaimDetails from '../../../../test/[id]/ComprehensiveClaimDetails'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import EmailIcon from '@mui/icons-material/Email'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

interface SuccessPageProps {
  formData: FormData
  submittedFullName: string | null
  handleBack: () => void
  link: string
}

const SuccessPage: React.FC<SuccessPageProps> = ({ submittedFullName }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [fetchedFullName, setFetchedFullName] = useState<string | null>(submittedFullName)
  const [fullName, setFullName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const params = useParams()
  const id = params.id

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(menuAnchorEl)

  useEffect(() => {
    if (submittedFullName) {
      setFetchedFullName(submittedFullName)
    }
  }, [submittedFullName])

  // Construct the Google Drive link using the file ID
  const link = `https://opencreds.net/view/${id}`

  const message = fetchedFullName
    ? `Hi ${fullName},\n\nI’ve completed the recommendation you requested. You can view it by opening this URL:\n\n${link}\n\n- ${submittedFullName}`
    : 'Loading...'

  const handleCopy = () => {
    copyFormValuesToClipboard(message)
    setSnackbarMessage('Text copied to clipboard.')
    setSnackbarOpen(true)
  }

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }

  const handleSendMailto = () => {
    if (!email) {
      setSnackbarMessage('Email is not available.')
      setSnackbarOpen(true)
      return
    }

    const subject = 'Recommendation Complete'
    const body = message
    const mailToLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailToLink
    setSnackbarMessage('Mail client opened.')
    setSnackbarOpen(true)
    handleMenuClose()
  }

  const handleSendGmail = () => {
    if (!email) {
      setSnackbarMessage('Email is not available.')
      setSnackbarOpen(true)
      return
    }

    const subject = 'Recommendation Complete'
    const body = message
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.open(gmailLink, '_blank')

    navigator.clipboard
      .writeText(body)
      .then(() => {
        setSnackbarMessage('Text copied to clipboard. Ready to paste in Gmail!')
        setSnackbarOpen(true)
      })
      .catch(err => {
        console.error('Failed to copy text:', err)
        setSnackbarMessage('Failed to copy text')
        setSnackbarOpen(true)
      })

    handleMenuClose()
  }

  const handleCopyBody = () => {
    copyFormValuesToClipboard(message)
    setSnackbarMessage('Text copied to clipboard.')
    setSnackbarOpen(true)
    handleMenuClose()
  }

  const handleSendEmail = () => {
    handleSendMailto()
  }

  const handleOpenMail = useCallback(() => {
    handleSendMailto()
  }, [handleSendMailto])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          width: '100%',
          borderRadius: '20px',
          gap: '30px'
        }}
      >
        <Box sx={{ display: 'none' }}>
          <ComprehensiveClaimDetails />
        </Box>

        <Typography sx={{ fontSize: '16px', letterSpacing: '0.01em', textAlign: 'left' }}>
          Now let {fullName ?? 'loading...'} know that you’ve completed the
          recommendation.
        </Typography>

        <Box
          sx={{
            alignSelf: 'stretch',
            borderRadius: '10px',
            backgroundColor: '#fff',
            border: '1px solid #003fe0',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '9px 12px',
            gap: '5px',
            maxWidth: '100%'
          }}
        >
          <Box
            sx={{
              height: '24px',
              width: '24px',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
              zIndex: 1
            }}
          >
            <SVGBadge />
          </Box>
          <Typography sx={{ position: 'relative', letterSpacing: '0.06px', zIndex: 1 }}>
            {submittedFullName} vouched for {fullName}.
          </Typography>
        </Box>

        <Box
          sx={{
            alignSelf: 'stretch',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            maxWidth: '100%'
          }}
        >
          <TextField
            fullWidth
            multiline
            rows={10}
            value={message}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position='end'>
                  <Button onClick={handleCopy}>
                    <CopySVG />
                  </Button>
                </InputAdornment>
              )
            }}
            sx={{ marginBottom: '10px', borderRadius: '10px' }}
          />
        </Box>

        <ButtonGroup variant='contained' sx={{ width: '100%', boxShadow: 'none' }}>
          <Button
            onClick={handleSendEmail}
            sx={{
              padding: '10px 24px',
              borderRadius: '100px 0 0 100px',
              fontFamily: 'Roboto',
              textTransform: 'capitalize',
              fontSize: '16px',
              backgroundColor: '#003FE0',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#002bb5'
              },
              flexGrow: 1
            }}
            disabled={!email}
          >
            Open Email
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
          <MenuItem onClick={handleCopyBody}>
            <ListItemIcon>
              <ContentCopyIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
          </MenuItem>
        </Menu>

        <Box
          sx={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'space-between',
            width: '100%',
            p: '0 10px'
          }}
        ></Box>

        <Button
          component={Link}
          href='/credentialForm'
          sx={{
            textTransform: 'capitalize',
            m: '20px 0',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '20px',
            color: '#202e5b',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline'
            }
          }}
          variant='text'
        >
          Claim a Skill
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
