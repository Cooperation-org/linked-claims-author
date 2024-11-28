'use client'

import React, { useState } from 'react'
import { Box, Button, Typography, Snackbar, Alert } from '@mui/material'

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
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSendEmail = () => {
    const subject = `Unable to Provide Recommendation at this Time for ${fullName}`
    const body = `Hi ${fullName},\n\nI'm currently unable to provide a recommendation. I apologize for the inconvenience.\n\nBest regards.`

    const showNotification = (message: string, severity: 'success' | 'error') => {
      setSnackbarMessage(message)
      setSnackbarSeverity(severity)
      setSnackbarOpen(true)
    }

    setIsProcessing(true)

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    try {
      window.location.href = mailtoLink
      const fallbackTimeout = setTimeout(() => {
        try {
          window.open(gmailLink, '_blank')
          navigator.clipboard
            .writeText(`${subject}\n\n${body}`)
            .then(() => {
              showNotification('Message copied to clipboard for Gmail', 'success')
            })
            .catch(err => {
              console.error('Clipboard error:', err)
              showNotification('Failed to copy message to clipboard', 'error')
            })
        } catch (error) {
          console.error('Gmail fallback error:', error)
          showNotification('Failed to open email client', 'error')
        }
      }, 2000)
      window.addEventListener(
        'blur',
        () => {
          clearTimeout(fallbackTimeout)
          setIsProcessing(false)
          showNotification('Email client opened successfully', 'success')
        },
        { once: true }
      )
      setTimeout(() => {
        clearTimeout(fallbackTimeout)
        setIsProcessing(false)
        if (!document.hidden) {
          showNotification(
            'Please try using the Gmail option or copy the message manually',
            'error'
          )
        }
      }, 3000)
    } catch (error) {
      console.error('Email handling error:', error)
      setIsProcessing(false)
      showNotification('Failed to open email client', 'error')
    }
  }

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    setSnackbarOpen(false)
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
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
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
      <Button
        onClick={handleSendEmail}
        disabled={isProcessing}
        sx={{
          padding: '10px 24px',
          borderRadius: '100px',
          fontFamily: 'Roboto',
          textTransform: 'capitalize',
          fontSize: '16px',
          width: '100%',
          backgroundColor: '#003FE0',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#002bb5'
          }
        }}
      >
        Send Email to {fullName}
      </Button>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default DeclineRequest
