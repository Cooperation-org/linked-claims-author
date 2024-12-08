'use client'

import React, { useState } from 'react'
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material'
import { SVGBadge } from '../../../../Assets/SVGs'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
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
  recId
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const params = useParams()
  const id = params.id

  const homUrl = window.location.origin
  const link = `${homUrl}/rec?vcId=${id}&recId=${recId}`
  const subject = 'Recommendation Complete'
  const message = submittedFullName
    ? `Hi ${fullName},\n\nI've completed the recommendation you requested. You can view it by opening this URL:\n\n${link}\n\n- ${submittedFullName}`
    : 'Loading...'

  const showNotification = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      showNotification(`${type} copied to clipboard!`, 'success')
    } catch (err) {
      showNotification('Failed to copy text', 'error')
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
        width: '100%',
        maxWidth: '800px',
        mx: 'auto',
        p: '20px'
      }}
    >
      <Box sx={{ display: 'none' }}>
        <ComprehensiveClaimDetails />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          p: '12px',
          borderRadius: '10px',
          backgroundColor: '#fff',
          border: '1px solid #003fe0',
          width: '100%'
        }}
      >
        <Box sx={{ height: '24px', width: '24px' }}>
          <SVGBadge />
        </Box>
        <Typography sx={{ letterSpacing: '0.06px' }}>
          {submittedFullName} vouched for {fullName}.
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          p: 3,
          width: '100%'
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Lato',
            fontSize: '16px',
            mb: 3,
            fontWeight: 600,
            color: '#202E5B'
          }}
        >
          Follow these steps to notify {fullName}:
        </Typography>

        <ol
          style={{
            marginBottom: '20px',
            paddingLeft: '20px',
            color: '#202E5B',
            fontFamily: 'Lato'
          }}
        >
          <li style={{ marginBottom: '8px' }}>
            Copy the email address by clicking the copy icon
          </li>
          <li style={{ marginBottom: '8px' }}>
            Copy the subject by clicking the copy icon
          </li>
          <li style={{ marginBottom: '8px' }}>
            Copy the message by clicking the copy icon
          </li>
          <li style={{ marginBottom: '8px' }}>Open your preferred email application</li>
          <li>Paste the content and send the email</li>
        </ol>

        {/* Email Box */}
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#666',
              mb: 1
            }}
          >
            Email Address:
          </Typography>
          <Box
            sx={{
              backgroundColor: 'white',
              p: 2,
              borderRadius: '4px',
              position: 'relative',
              border: '1px solid #e0e0e0'
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Lato',
                color: '#333',
                fontSize: '14px',
                pr: 4
              }}
            >
              {email}
            </Typography>
            <Box
              onClick={() => copyToClipboard(email, 'Email address')}
              sx={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <ContentCopyIcon sx={{ color: '#666' }} />
            </Box>
          </Box>
        </Box>

        {/* Subject Box */}
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#666',
              mb: 1
            }}
          >
            Subject:
          </Typography>
          <Box
            sx={{
              backgroundColor: 'white',
              p: 2,
              borderRadius: '4px',
              position: 'relative',
              border: '1px solid #e0e0e0'
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Lato',
                color: '#333',
                fontSize: '14px',
                pr: 4
              }}
            >
              {subject}
            </Typography>
            <Box
              onClick={() => copyToClipboard(subject, 'Subject')}
              sx={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <ContentCopyIcon sx={{ color: '#666' }} />
            </Box>
          </Box>
        </Box>

        {/* Message Box */}
        <Box>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#666',
              mb: 1
            }}
          >
            Message:
          </Typography>
          <Box
            sx={{
              backgroundColor: 'white',
              p: 2,
              borderRadius: '4px',
              position: 'relative',
              border: '1px solid #e0e0e0'
            }}
          >
            <Typography
              sx={{
                // whiteSpace: 'pre-wrap',
                fontFamily: 'Lato',
                color: '#333',
                fontSize: '14px',
                pr: 4,
                overflowWrap: 'break-word'
              }}
            >
              {message}
            </Typography>
            <Box
              onClick={() => copyToClipboard(message, 'Message')}
              sx={{
                position: 'absolute',
                right: '12px',
                top: '12px',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <ContentCopyIcon sx={{ color: '#666' }} />
            </Box>
          </Box>
        </Box>
      </Box>

      <Button
        component={Link}
        href='/credentialForm'
        sx={{
          textTransform: 'capitalize',
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default SuccessPage
