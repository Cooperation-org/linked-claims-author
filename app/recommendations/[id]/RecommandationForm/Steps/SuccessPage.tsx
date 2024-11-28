'use client'

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  InputAdornment,
  CircularProgress
} from '@mui/material'
import { SVGBadge, CopySVG } from '../../../../Assets/SVGs'
import { copyFormValuesToClipboard } from '../../../../utils/formUtils'
import { FormData } from '../../../../credentialForm/form/types/Types'
import ComprehensiveClaimDetails from '../../../../view/[id]/ComprehensiveClaimDetails'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface SuccessPageProps {
  formData: FormData
  submittedFullName: string | null
  fullName: string
  email: string
  handleBack: () => void
  recId: string | null
}

const SuccessPage: React.FC<SuccessPageProps> = ({
  submittedFullName,
  fullName,
  email,
  handleBack,
  recId
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('Text copied to clipboard.')
  const [isProcessing, setIsProcessing] = useState(false)
  const params = useParams()
  const id = params.id

  // Construct the link to the credential
  const homUrl = window.location.origin
  const link = `${homUrl}/rec?vcId=${id}&recId=${recId}`

  const message = submittedFullName
    ? `Hi ${fullName},\n\nI've completed the recommendation you requested. You can view it by opening this URL:\n\n${link}\n\n- ${submittedFullName}`
    : 'Loading...'

  const handleCopy = () => {
    copyFormValuesToClipboard(message)
    setSnackbarMessage('Text copied to clipboard.')
    setSnackbarOpen(true)
  }

  const handleOpenMail = async () => {
    if (!email) return

    setIsProcessing(true)
    const subject = 'Recommendation Complete'

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`

    try {
      window.location.href = mailtoLink
      const fallbackTimeout = setTimeout(() => {
        try {
          window.open(gmailLink, '_blank')
          navigator.clipboard
            .writeText(message)
            .then(() => {
              setSnackbarMessage('Message copied to clipboard for Gmail')
              setSnackbarOpen(true)
            })
            .catch(err => {
              console.error('Clipboard error:', err)
              setSnackbarMessage('Failed to copy message to clipboard')
              setSnackbarOpen(true)
            })
        } catch (error) {
          console.error('Gmail fallback error:', error)
          setSnackbarMessage('Failed to open email client')
          setSnackbarOpen(true)
        }
      }, 2000)
      window.addEventListener(
        'blur',
        () => {
          clearTimeout(fallbackTimeout)
          setIsProcessing(false)
          setSnackbarMessage('Email client opened successfully')
          setSnackbarOpen(true)
        },
        { once: true }
      )
      setTimeout(() => {
        clearTimeout(fallbackTimeout)
        setIsProcessing(false)
        if (!document.hidden) {
          setSnackbarMessage(
            'Please try using the Gmail option or copy the message manually'
          )
          setSnackbarOpen(true)
        }
      }, 3000)
    } catch (error) {
      console.error('Email handling error:', error)
      setIsProcessing(false)
      setSnackbarMessage('Failed to open email client')
      setSnackbarOpen(true)
    }
  }

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
          Now let {fullName} know that you&apos;ve completed the recommendation.
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

        <Button
          onClick={handleOpenMail}
          variant='contained'
          sx={{
            width: '100%',
            backgroundColor: '#003FE0',
            borderRadius: '100px',
            textTransform: 'none',
            fontFamily: 'Roboto, sans-serif',
            boxShadow: '0px 0px 2px 2px #F7BC00',
            marginTop: '15px'
          }}
          disabled={!email || isProcessing}
        >
          {isProcessing ? <CircularProgress size={24} color='inherit' /> : 'Open email'}
        </Button>

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
            color: '#202e5b'
          }}
          variant='text'
        >
          Claim a Skill
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  )
}

export default SuccessPage
