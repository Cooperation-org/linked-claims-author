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

          {['Google User Data Collection and Usage', 'Data Storage and Processing', 'Data Sharing and Transfer', 'Data Protection Mechanisms'].map((section, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Typography variant='h6' sx={headingStyle}>
                {section}
              </Typography>
              <Box component="ul" sx={{ 
                listStyle: 'none', 
                padding: 0,
                margin: 0 
              }}>
                {section === 'Google User Data Collection and Usage' && (
                  <>
                    <Box component="li" sx={listItemStyle}>
                      Email Address: Your primary Google Account email is collected solely for user identification and authentication. This data is not stored beyond your current session.
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      Profile Information: We access basic profile data (display name, profile picture, user ID) for identity verification purposes only.
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      Drive Access: We use Google Drive for saving user-authored credentials and enabling peer recommendations.
                    </Box>
                  </>
                )}
                {section === 'Data Storage and Processing' && (
                  <>
                    <Box component="li" sx={listItemStyle}>
                      All user data remains under your control in your Google Drive
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      No personal data is stored on our servers
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      Data interactions occur directly between your browser and Google's services
                    </Box>
                  </>
                )}
                {section === 'Data Sharing and Transfer' && (
                  <>
                    <Box component="li" sx={listItemStyle}>
                      We never share your Google Drive data with third parties
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      Your data is not sold or monetized
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      No user data is retained after session completion
                    </Box>
                  </>
                )}
                {section === 'Data Protection Mechanisms' && (
                  <>
                    <Box component="li" sx={listItemStyle}>
                      Encrypted HTTPS data transmission
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      OAuth 2.0 authentication protocols
                    </Box>
                    <Box component="li" sx={listItemStyle}>
                      Regular security audits and monitoring
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          ))}

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