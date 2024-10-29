'use client'

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
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
  fullName: string
  email: string
  handleBack: () => void
}

const SuccessPage: React.FC<SuccessPageProps> = ({
  submittedFullName,
  fullName,
  email,
  handleBack
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const params = useParams()
  const id = params.id

  // Construct the link to the credential
  const link = `https://opencreds.net/view/${id}`

  const message = submittedFullName
    ? `Hi ${fullName},\n\nI’ve completed the recommendation you requested. You can view it by opening this URL:\n\n${link}\n\n- ${submittedFullName}`
    : 'Loading...'

  const handleCopy = () => {
    copyFormValuesToClipboard(message)
    setSnackbarOpen(true)
  }

  const mailtoLink = email
    ? `mailto:${email}?subject=Recommendation Complete&body=${encodeURIComponent(
        message
      )}`
    : '#'

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
          Now let {fullName} know that you’ve completed the recommendation.
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
          href={mailtoLink}
          target='_blank'
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
        onClose={() => setSnackbarOpen(false)}
        message='Text copied to clipboard.'
      />
    </>
  )
}

export default SuccessPage
