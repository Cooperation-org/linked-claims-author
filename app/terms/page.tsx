'use client'
import { Box, Typography, Link } from '@mui/material'
import React from 'react'

const TermsOfService = () => {
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
        LinkedCreds Terms of Service
      </Typography>

      <Typography sx={{ fontWeight: 600 }}>Acceptance of Terms</Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        By accessing or using the LinkedCreds platform, you agree to comply with and be
        bound by these Terms of Service. If you do not agree with these terms, you should
        not use our services.
      </Typography>

      <Typography sx={{ fontWeight: 600 }}>Use of Services</Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        LinkedCreds provides a platform for creating, sharing, and verifying credentials.
        Users are responsible for ensuring that their use of the platform is in compliance
        with all applicable laws and regulations.
      </Typography>

      <Typography sx={{ fontWeight: 600 }}>User Conduct</Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        Users agree to use the platform in a manner that is lawful, ethical, and
        respectful. Prohibited activities include, but are not limited to, using the
        platform for fraudulent purposes, distributing harmful content, or infringing on
        the intellectual property rights of others.
      </Typography>

      <Typography sx={{ fontWeight: 600 }}>Intellectual Property</Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        All content, trademarks, and data provided on the LinkedCreds platform are the
        property of LinkedCreds or its licensors. Users may not reproduce, distribute, or
        create derivative works without prior written consent.
      </Typography>

      <Typography sx={{ fontWeight: 600 }}>Limitation of Liability</Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        LinkedCreds is not liable for any indirect, incidental, or consequential damages
        resulting from the use of or inability to use the platform. This includes, but is
        not limited to, loss of data, profits, or business opportunities.
      </Typography>

      <Typography sx={{ fontWeight: 600 }}>Termination of Services</Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        We reserve the right to suspend or terminate access to our services at our sole
        discretion, without prior notice, for conduct that we believe violates these Terms
        of Service or is harmful to other users, us, or third parties.
      </Typography>

      <Typography sx={{ fontWeight: 600 }}>Governing Law</Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        These Terms of Service are governed by and construed in accordance with the laws
        of [Your Country/State]. Any disputes arising from these terms will be subject to
        the exclusive jurisdiction of the courts of [Your Country/State].
      </Typography>

      <Typography sx={{ fontWeight: 600 }}>Changes to Terms</Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        LinkedCreds reserves the right to modify these Terms of Service at any time. We
        will notify users of significant changes by posting the new terms on our website.
        Continued use of the platform after changes are posted constitutes acceptance of
        the updated terms.
      </Typography>

      <Typography sx={{ fontWeight: 600 }}>Contact Information</Typography>
      <Typography sx={{ fontSize: '16px', lineHeight: '1.6' }}>
        If you have any questions or concerns about these Terms of Service, please contact
        us at <Link href='mailto:support@LinkedCreds.com'>support@LinkedCreds.com</Link>.
      </Typography>

      <Typography
        sx={{ fontSize: '14px', lineHeight: '1.6', mt: 4, color: 'text.secondary' }}
      >
        &copy; 2024, US Chamber of Commerce Foundation <br />
        <Link href='https://t3networkhub.org' target='_blank' rel='noopener noreferrer'>
          T3 Innovation Network
        </Link>{' '}
        | <Link href='/accessibility'>Accessibility</Link> |{' '}
        <Link href='/privacy'>Privacy Policy</Link>
      </Typography>
    </Box>
  )
}

export default TermsOfService
