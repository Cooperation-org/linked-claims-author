'use client'
import { Box, Typography, Link, Container, Paper } from '@mui/material'
import React from 'react'
import { Logo } from '../Assets/SVGs'
import { useTheme } from '@mui/material/styles'

const PrivacyPolicy = () => {
  const theme = useTheme()
  
  const sectionStyle = {
    backgroundColor: 'white',
    padding: { xs: '20px', md: '30px' },
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    margin: '10px 0',
    width: '100%'
  }

  const headingStyle = {
    color: theme.palette.t3DarkSlateBlue,
    borderBottom: `2px solid ${theme.palette.t3DarkSlateBlue}`,
    paddingBottom: '8px',
    marginBottom: '16px'
  }

  const listItemStyle = {
    marginBottom: '8px',
    paddingLeft: '20px',
    position: 'relative',
    '&::before': {
      content: '"•"',
      position: 'absolute',
      left: 0,
      color: theme.palette.t3DarkSlateBlue
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        maxWidth: '800px',
        margin: 'auto',
        backgroundColor: '#f5f5f7',
        padding: { xs: '20px', md: '40px' },
        borderRadius: '12px'
      }}>
        <Box sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          mb: 4
        }}>
          <Link href='/' aria-label='OpenCreds Home' sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo />
            <Typography variant="h5" sx={{
              fontWeight: 700,
              ml: 1,
              color: theme.palette.t3DarkSlateBlue
            }}>
              OpenCreds
            </Typography>
          </Link>
        </Box>

        <Paper elevation={0} sx={sectionStyle}>
          <Typography variant='h4' sx={{ ...headingStyle, textAlign: 'center' }}>
            Privacy Policy
          </Typography>

          <Typography sx={{ fontSize: '16px', lineHeight: '1.8', mb: 4 }}>
            OpenCreds is an open-source web application developed by the
            <Link href='https://www.t3networkhub.org/' target='_blank' rel='noopener noreferrer'> T3 Innovation Network</Link>
            , a network of leading organizations committed to open infrastructure for Learning and Employment Records compliant with W3C Verifiable Credential standard.
          </Typography>

          {['Google API Access & Permissions', 'Data Collection & Usage', 'Data Storage & Processing', 'Data Sharing & Protection'].map((section, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Typography variant='h6' sx={headingStyle}>
                {section}
              </Typography>
              <Box component="ul" sx={{ 
                listStyle: 'none', 
                padding: 0,
                margin: 0 
              }}>
                {section === 'Google API Access & Permissions' && (
                  <>
                    <Box component="li" sx={listItemStyle}>
                      Email Access (userinfo.email): Used solely for user identification and authentication
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      Profile Access (userinfo.profile): Required for basic profile verification and user authentication
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      Drive File Access (drive.file): Used to save and manage user-authored credentials
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      Read-only Drive Access (drive.readonly): Enables peer recommendations and credential sharing
                    </Box>
                  </>
                )}
                {section === 'Data Collection & Usage' && (
                  <>
                    <Box component="li" sx={listItemStyle}>
                      We collect your Google Account email and basic profile information for authentication purposes only
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      Profile data accessed includes: display name, profile picture, and user ID
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      All authentication data is temporary and not stored beyond your current session
                    </Box>
                  </>
                )}
                {section === 'Data Storage & Processing' && (
                  <>
                    <Box component="li" sx={listItemStyle}>
                      User-created credentials are stored exclusively in your Google Drive
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      No personal data is stored on our servers
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      Data interactions occur directly between your browser and Google&apos;s services
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      Read-only access is used solely for peer review and recommendations
                    </Box>
                  </>
                )}
                {section === 'Data Sharing & Protection' && (
                  <>
                    <Box component="li" sx={listItemStyle}>
                      Your data is never shared with third parties
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      All data transmissions use encrypted HTTPS connections
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      We implement OAuth 2.0 security protocols for authentication
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      Regular security audits and monitoring are conducted
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      Access tokens are securely stored in browser session only
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          ))}

          <Box sx={{ mt: 4 }}>
            <Typography variant='body2' sx={{ color: 'text.secondary', mb: 2 }}>
              This Privacy Policy may change from time to time. Any significant changes in data handling will be clearly communicated through policy updates.
            </Typography>
          </Box>

          <Box sx={{ mt: 4, borderTop: '1px solid #eee', pt: 4 }}>
            <Typography variant='body2' sx={{ color: 'text.secondary', textAlign: 'center' }}>
              &copy; 2024, US Chamber of Commerce Foundation
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
                <Link href='https://t3networkhub.org' target='_blank' rel='noopener noreferrer'>T3 Network</Link>
                <Link href='/accessibility'>Accessibility</Link>
                <Link href='/terms'>Terms</Link>
                <Link href='https://github.com/Cooperation-org' target='_blank' rel='noopener noreferrer'>Github</Link>
              </Box>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default PrivacyPolicy