'use client'

import React from 'react'
import { Box, Button, Typography } from '@mui/material'

interface DeclineRequestProps {
  fullName: string
  email: string
  handleBack: () => void // Add handleBack prop to allow going back
}

const DeclineRequest: React.FC<DeclineRequestProps> = ({
  fullName,
  email,
  handleBack
}) => {
  const handleSendEmail = () => {
    const subject = `Unable to Provide Recommendation at this Time for ${fullName}`
    const body = `Hi ${fullName},\n\nI'm currently unable to provide a recommendation. I apologize for the inconvenience.\n\nBest regards.`
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailtoLink
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '30px',
        mt: '30px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'Lato',
          color: '#202E5B'
        }}
      >
        No further action is required.
      </Typography>
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: '400',
          fontFamily: 'Lato',
          color: '#555',
          lineHeight: '1.5'
        }}
      >
        However, it would be helpful to {fullName} if you could send them a note and an
        explanation letting them know why you can&apos;t make a recommendation at this
        time.
      </Typography>
      <Button
        onClick={handleSendEmail}
        sx={{
          padding: '10px 24px',
          borderRadius: '100px',
          fontFamily: 'Roboto',
          textTransform: 'capitalize',
          fontSize: '16px',
          width: '100%',
          backgroundColor: '#003FE0',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#002bb5'
          }
        }}
      >
        Send Email to {fullName}
      </Button>
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: '300',
          fontFamily: 'Lato',
          color: '#777',
          marginTop: '20px'
        }}
      >
        Email subject will be pre-filled with &quot;Unable to Provide Recommendation at
        this Time for {fullName}&quot;
      </Typography>
      <Button
        onClick={handleBack}
        sx={{
          padding: '10px 24px',
          borderRadius: '100px',
          fontFamily: 'Roboto',
          textTransform: 'capitalize',
          fontSize: '16px',
          width: '100%',
          backgroundColor: '#FF6347',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#FF4500'
          }
        }}
      >
        Back
      </Button>
    </Box>
  )
}

export default DeclineRequest
