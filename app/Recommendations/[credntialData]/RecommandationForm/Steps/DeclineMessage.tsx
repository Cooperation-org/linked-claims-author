'use client'

import React from 'react'
import { Box, Button, Typography } from '@mui/material'

const DeclineMessage = ({
  setactivStep,
  fullName,
  recipientEmail,
  userName
}: {
  setactivStep: any
  fullName: string
  recipientEmail: string
  userName: string
}) => {
  const handleSendEmailClick = () => {
    const subject = `Regarding Your Recommendation Request, ${fullName}`
    const body = `Hi ${fullName},\n\nThank you for considering me for a recommendation. Unfortunately, I am unable to provide one at this time. I wanted to let you know as soon as possible so you can seek another reference.\n\nBest regards,\n${userName}`

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailtoLink
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        padding: '0 15px 30px',
        mt: '30px'
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Lato',
          fontSize: '18px',
          fontWeight: '400',
          lineHeight: 'normal',
          textAlign: 'center',
          m: '0 3px 0 15px'
        }}
      >
        No further action is required. However, it would be helpful to {fullName} if you
        could send a note and an explanation letting them know why you can&apos;t make a
        recommendation at this time.
      </Typography>
      <Button onClick={handleSendEmailClick} sx={{ width: '100%' }}>
        Send Email
      </Button>
    </Box>
  )
}

export default DeclineMessage
