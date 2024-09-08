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
import FetchedData from '../../viewCredential/FetchedData'

interface Evidence {
  name: string
  url: string
}

interface FormData {
  fullName: string
  vouchedFor: string
  credentialName: string
  credentialDuration: string
  evidenceLink: string
  portfolio: Evidence[]
}

interface SuccessPageProps {
  formData: FormData
  link: string
}

const SuccessPage: React.FC<SuccessPageProps> = ({ formData, link }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [fetchedFullName, setFetchedFullName] = useState<string | null>(null) // Fetch full name
  const [fetchedVouchedFor, setFetchedVouchedFor] = useState<string | null>(null) // Fetch vouched for

  // Message with fallback values using fetched names
  const message = `Hi ${fetchedVouchedFor || formData?.vouchedFor || 'Recipient'},

I’ve completed the recommendation you requested. You can view it by opening this URL:

${link}

- ${fetchedFullName || formData?.fullName || 'Your Name'}`

  const handleCopy = () => {
    copyFormValuesToClipboard(message)
    setSnackbarOpen(true)
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
        {/* Fetched Data */}
        <Box sx={{ display: 'none' }}>
          <FetchedData
            setFullName={setFetchedFullName}
            setVouchedFor={setFetchedVouchedFor} // Assuming there's a way to fetch this
          />
        </Box>

        {/* Header Text */}
        <Typography sx={{ fontSize: '16px', letterSpacing: '0.01em', textAlign: 'left' }}>
          Now let {fetchedVouchedFor || formData?.vouchedFor || 'the recipient'} know that
          you’ve completed a recommendation for{' '}
          {fetchedFullName || formData?.fullName || 'the sender'}.
        </Typography>

        {/* Badge */}
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
            {fetchedFullName || formData?.fullName || 'Name'} vouched for{' '}
            {fetchedVouchedFor || formData?.vouchedFor || 'Recipient'}.
          </Typography>
        </Box>

        {/* Message Section */}
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
            rows={4}
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
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#202e5b',
              cursor: 'pointer'
            }}
          >
            Copy this text
          </Typography>
        </Box>

        {/* Email and Claim Buttons */}
        <Button
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
        >
          Open email
        </Button>

        <Button
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

      {/* Snackbar for Copy Confirmation */}
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
