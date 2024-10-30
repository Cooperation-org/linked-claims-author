'use client'
import { Box, Typography, Link } from '@mui/material'
import React from 'react'

const PrivacyPolicy = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        gap: '20px',
        textAlign: 'left',
        maxWidth: '800px',
        margin: 'auto'
      }}
    >
      <Typography variant='h4' sx={{ fontWeight: 700, mb: 2 }}>
        OpenCreds Privacy Policy
      </Typography>

      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        OpenCreds is an open-source web application developed by the
        <Link
          href='https://www.t3networkhub.org/'
          target='_blank'
          rel='noopener noreferrer'
        >
          {' '}
          T3 Innovation Network
        </Link>
        , a network of leading organizations and companies committed to an open
        infrastructure for Learning and Employment Records compliant with the W3C
        Verifiable Credential standard.
      </Typography>

      <Typography sx={{ fontWeight: 600, mt: 2 }}>
        What Personal Information We Collect
      </Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        We do not collect any personal information. Any data or documents created by this
        application are kept solely in storage under the user's control, such as their own
        Google Drives.
      </Typography>

      <Typography sx={{ fontWeight: 600, mt: 2 }}>Additional Information</Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        We may change this Privacy Policy from time to time. If we make any significant
        changes in the way we treat your personal information, we will make this clear on
        our website or by contacting you directly.
      </Typography>

      <Typography sx={{ fontSize: '16px', lineHeight: '1.6', mt: 2 }}>
        The controller for your personal information is the Learner Credential Wallet
        project at MIT. We can be contacted at{' '}
        <Link href='mailto:support@opencreds.net'>support@opencreds.net</Link>.
      </Typography>

      <Typography
        sx={{ fontSize: '14px', lineHeight: '1.6', mt: 4, color: 'text.secondary' }}
      >
        &copy; 2024, US Chamber of Commerce Foundation <br />
        <Link href='https://t3networkhub.org' target='_blank' rel='noopener noreferrer'>
          T3 Innovation Network
        </Link>{' '}
        | <Link href='/accessibility'>Accessibility</Link> |{' '}
        <Link
          href='https://github.com/Cooperation-org'
          target='_blank'
          rel='noopener noreferrer'
        >
          View on Github
        </Link>
      </Typography>
    </Box>
  )
}

export default PrivacyPolicy
