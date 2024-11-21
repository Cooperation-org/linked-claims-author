'use client'
import { Box, Typography, Link } from '@mui/material'
import React from 'react'
import { Logo } from '../Assets/SVGs'
import { useTheme } from '@mui/material/styles'

const PrivacyPolicy = () => {
  const theme = useTheme()
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
      <Box
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          ml: { xs: '15px', md: '12.5vw' }
        }}
      >
        <Link href='/' aria-label='OpenCreds Home'>
          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 1 }}>
            <Logo />
          </Box>
        </Link>
        <Link href='/' aria-label='OpenCreds Home'>
          <Typography
            sx={{
              fontWeight: '700',
              fontSize: { xs: '18px', md: '24px' },
              color: theme.palette.t3DarkSlateBlue
            }}
          >
            OpenCreds
          </Typography>
        </Link>
      </Box>

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
        No personal information is collected.
        Any data or documents created by this application are kept solely in storage
        under the user&apos;s control, on their own Google Drives.
      </Typography>

      <Typography sx={{ fontWeight: 600, mt: 2 }}>
        Google User Data Usage and Protection
      </Typography>
      <Typography sx={{ fontWeight: 600, mt: 2 }}>
        Data Usage
      </Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        - Google Drive storage is accessed only to save user authored credentials as JSON-LD documents. No user data is stored, processed, or retained by the application.
        <br />
        - All data interactions occur directly between the user&apos browser and Google&apos;s services.
        <br />
        - The application cannot access the user&apos;s Google data without explicit user authorization.
      </Typography>

      <Typography sx={{ fontWeight: 600, mt: 2 }}>
        Data Sharing and Transfer
      </Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        - User data is never shared to any third party from Google Drive or the app itself.
        <br />
        - No user data stored on Google Drive is sold or otherwise monetized.
        <br />
        - The application does not retain any user data at the conclusion of the session.
      </Typography>

      <Typography sx={{ fontWeight: 600, mt: 2 }}>
        Data Protection
      </Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        - All data transmissions use encrypted HTTPS, secure socket layer connections.
        <br />
        - OAuth 2.0 security protocols are used for Google authentication.
        <br />
        - Access tokens are stored securely in the browser session.
        <br />
        - Strict access controls and security monitoring are followed.
        <br />
        - Security measures are regularly monitored and updated to protect against vulnerabilities.
      </Typography>

      <Typography sx={{ fontWeight: 600, mt: 2 }}>
        Additional Information
      </Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        This Privacy Policy may change from time to time. Any significant changes in the way
        personal information is handled will be clearly described in the Privacy Policy.
      </Typography>

      <Typography
        sx={{ fontSize: '14px', lineHeight: '1.6', mt: 4, color: 'text.secondary' }}
      >
        &copy; 2024, US Chamber of Commerce Foundation <br />
        <Link href='https://t3networkhub.org' target='_blank' rel='noopener noreferrer'>
          T3 Innovation Network
        </Link>{' '}
        | <Link href='/accessibility'>Accessibility</Link> |{' '}
        <Link href='/terms'>Terms of Service</Link> |{' '}
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
