'use client'

import React, { useState, MouseEvent } from 'react'
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  ButtonGroup,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import EmailIcon from '@mui/icons-material/Email' // Placeholder for Gmail icon
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

interface DeclineRequestProps {
  fullName: string
  email: string
  handleBack: () => void
}

const DeclineRequest: React.FC<DeclineRequestProps> = ({
  fullName,
  email,
  handleBack
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(menuAnchorEl)

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
    const subject = `Unable to Provide Recommendation at this Time for ${fullName}`
    const body = `Hi ${fullName},\n\nI'm currently unable to provide a recommendation. I apologize for the inconvenience.\n\nBest regards.`

    const mailToLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailToLink
    setSnackbarMessage('Mail client opened.')
    setSnackbarOpen(true)
  }

  const handleSendGmail = () => {
    const subject = `Unable to Provide Recommendation at this Time for ${fullName}`
    const body = `Hi ${fullName},\n\nI'm currently unable to provide a recommendation. I apologize for the inconvenience.\n\nBest regards.`

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.open(gmailLink, '_blank')

    navigator.clipboard
      .writeText(body)
      .then(() => {
        setSnackbarMessage('Email body copied to clipboard. Ready to paste in Gmail!')
        setSnackbarOpen(true)
      })
      .catch(err => {
        console.error('Failed to copy text: ', err)
        setSnackbarMessage('Failed to copy text')
        setSnackbarOpen(true)
      })

    handleMenuClose()
  }

  const handleCopy = () => {
    const body = `Hi ${fullName},\n\nI'm currently unable to provide a recommendation. I apologize for the inconvenience.\n\nBest regards.`
    navigator.clipboard
      .writeText(body)
      .then(() => {
        setSnackbarMessage('Email body copied to clipboard.')
        setSnackbarOpen(true)
      })
      .catch(err => {
        console.error('Failed to copy text: ', err)
        setSnackbarMessage('Failed to copy text')
        setSnackbarOpen(true)
      })

    handleMenuClose()
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '30px',
        mt: '30px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '8px'
      }}
    >
      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'Lato',
          color: '#202E5B'
        }}
      >
        No further action is required.
      </Typography>
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: '400',
          fontFamily: 'Lato',
          color: '#555',
          lineHeight: '1.5'
        }}
      >
        However, it would be helpful to {fullName} if you could send them a note and an
        explanation letting them know why you can&apos;t make a recommendation at this
        time.
      </Typography>
      <ButtonGroup variant='contained' sx={{ width: '100%', boxShadow: 'none' }}>
        <Button
          onClick={handleSendMailto}
          sx={{
            padding: '10px 24px',
            borderRadius: '100px 0 0 100px',
            fontFamily: 'Roboto',
            textTransform: 'capitalize',
            fontSize: '16px',
            width: '100%',
            backgroundColor: '#003FE0',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#002bb5'
            },
            flexGrow: 1
          }}
        >
          Send Email to {fullName}
        </Button>
        <Button
          size='small'
          aria-controls={menuOpen ? 'email-menu' : undefined}
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
        id='email-menu'
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
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: '300',
          fontFamily: 'Lato',
          color: '#777',
          marginTop: '20px'
        }}
      >
        Email subject will be pre-filled with &quot;Unable to Provide Recommendation at
        this Time for {fullName}&quot;
      </Typography>
      <Button
        onClick={handleBack}
        sx={{
          padding: '10px 24px',
          borderRadius: '100px',
          fontFamily: 'Roboto',
          textTransform: 'capitalize',
          fontSize: '16px',
          width: '100%',
          backgroundColor: '#FF6347',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#FF4500'
          }
        }}
      >
        Back
      </Button>

      {/* Snackbar for success or error messages */}
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
  )
}

export default DeclineRequest
