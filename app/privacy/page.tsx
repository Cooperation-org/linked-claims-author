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
        Personal Information We Collect
      </Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        To provide and improve our services, OpenCreds requests access to certain Google user data:
        <br />
        <br />
        <strong>1. Email Address (<Link href='https://www.googleapis.com/auth/userinfo.email' target='_blank' rel='noopener noreferrer'>.../auth/userinfo.email</Link>):</strong>
        <br />
        - <strong>Purpose:</strong> To identify and authenticate you within the application.
        <br />
        - <strong>Usage:</strong> Accesses your primary Google Account email address for login and session management.
        <br />
        - <strong>Storage:</strong> Your email address is used temporarily during your session and is not stored after you log out.
        <br />
        <br />
        <strong>2. Basic Profile Information (<Link href='https://www.googleapis.com/auth/userinfo.profile' target='_blank' rel='noopener noreferrer'>.../auth/userinfo.profile</Link>):</strong>
        <br />
        - <strong>Purpose:</strong> To verify your identity and personalize your experience.
        <br />
        - <strong>Usage:</strong> Accesses basic profile details such as your name and profile picture.
        <br />
        - <strong>Storage:</strong> This information is not stored beyond your current session.
        <br />
        <br />
        <strong>3. Google Drive Files (<Link href='https://www.googleapis.com/auth/drive.file' target='_blank' rel='noopener noreferrer'>.../auth/drive.file</Link> and <Link href='https://www.googleapis.com/auth/drive.readonly' target='_blank' rel='noopener noreferrer'>.../auth/drive.readonly</Link>):</strong>
        <br />
        - <strong>Purpose:</strong>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;- <Link href='https://www.googleapis.com/auth/drive.file' target='_blank' rel='noopener noreferrer'>.../auth/drive.file</Link>: To create and manage credentials you author within the app.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;- <Link href='https://www.googleapis.com/auth/drive.readonly' target='_blank' rel='noopener noreferrer'>.../auth/drive.readonly</Link>: To enable features like peer recommendations and credential sharing.
        <br />
        - <strong>Usage:</strong>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;- Saves credentials as JSON-LD documents to your Google Drive.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;- Reads existing credentials for peer review and collaboration.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;- Does not modify any files not created by OpenCreds.
        <br />
        - <strong>Storage:</strong> All files are stored on your Google Drive under your control.
      </Typography>

      <Typography sx={{ fontWeight: 600, mt: 2 }}>
        Data Sharing and Disclosure
      </Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        - <strong>No Third-Party Sharing:</strong> We do not share, sell, or disclose your personal information or Google user data to any third parties.
        <br />
        - <strong>User-Controlled Data:</strong> All data remains under your control on your Google Drive. Any sharing of credentials is initiated and managed by you.
      </Typography>

      <Typography sx={{ fontWeight: 600, mt: 2 }}>
        Data Protection Measures
      </Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        - <strong>Secure Connections:</strong> All data transmissions use encrypted HTTPS protocols.
        <br />
        - <strong>OAuth 2.0 Authentication:</strong> Securely handles Google authentication without accessing your password.
        <br />
        - <strong>Access Token Security:</strong> Tokens are securely stored during your session and expire after logout.
        <br />
        - <strong>Strict Access Controls:</strong> We implement industry-standard security practices to prevent unauthorized access.
        <br />
        - <strong>Regular Security Updates:</strong> Our security measures are regularly reviewed and updated to protect against new threats.
      </Typography>

      <Typography sx={{ fontWeight: 600, mt: 2 }}>
        Features Involving Peer Recommendations and Commenting
      </Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        - <strong>Purpose:</strong> To enhance collaboration by allowing users to recommend and comment on credentials.
        <br />
        - <strong>Data Usage:</strong> Accesses credentials you choose to share for the purpose of displaying recommendations and comments.
        <br />
        - <strong>User Control:</strong> You have full control over which credentials are shared and with whom.
      </Typography>

      <Typography sx={{ fontWeight: 600, mt: 2 }}>
        Your Choices
      </Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        - <strong>Revoking Access:</strong> You can revoke OpenCreds&apos; access to your Google data at any time via your Google Account settings.
        <br />
        - <strong>Data Management:</strong> You can manage or delete the credentials stored on your Google Drive at any time.
      </Typography>

      <Typography sx={{ fontWeight: 600, mt: 2 }}>
        Changes to This Privacy Policy
      </Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        We may update this Privacy Policy periodically. Significant changes will be communicated to you and will be posted here with an updated effective date.
      </Typography>

      <Typography sx={{ fontWeight: 600, mt: 2 }}>
        Contact Us
      </Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        If you have any questions or concerns about this Privacy Policy, please contact us at <Link href='mailto:contact@opencreds.org'>contact@opencreds.org</Link>.
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
