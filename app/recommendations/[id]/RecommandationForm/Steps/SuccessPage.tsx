'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  InputAdornment
} from '@mui/material'
import { SVGBadge, CopySVG } from '../../../../Assets/SVGs'
import { copyFormValuesToClipboard } from '../../../../utils/formUtils'
import { FormData } from '../../../../credentialForm/form/types/Types'
import ComprehensiveClaimDetails from '../../../../test/[id]/ComprehensiveClaimDetails'
import { useParams } from 'next/navigation'
import Link from 'next/link'

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

  const handleOpenMail = useCallback(() => {
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

    const timeout = setTimeout(() => {
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
          console.error('Failed to copy text: ', err)
          setSnackbarMessage('Failed to copy text')
          setSnackbarOpen(true)
        })
    }, 500)

    window.addEventListener('blur', () => clearTimeout(timeout), { once: true })
  }, [email, message])

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
          disabled={!email}
        >
          Open email
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
