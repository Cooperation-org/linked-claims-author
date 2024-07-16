'use client'

import { useState } from 'react'
import { Button, Container, TextField, Typography, Box } from '@mui/material'

const SendEmailPage = () => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    text: '',
    html: ''
  })

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    console.log(":  handleSubmit  emailData", emailData)
    e.preventDefault()

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      })

      const resJson = await res.json()
      console.log('handleSubmit res', resJson)
      if (res.ok) {
        alert('Email sent successfully!')
        setEmailData({
          to: '',
          subject: '',
          text: '',
          html: ''
        })
      } else {
        alert('Failed to send email.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error sending email.')
    }
  }

  return (
    <Container maxWidth='sm'>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Send Email
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Recipient's email"
            type='email'
            name='to'
            value={emailData.to}
            onChange={handleChange}
            fullWidth
            required
            margin='normal'
          />
          <TextField
            label='Subject'
            type='text'
            name='subject'
            value={emailData.subject}
            onChange={handleChange}
            fullWidth
            required
            margin='normal'
          />
          <TextField
            label='Email text'
            type='text'
            name='text'
            value={emailData.text}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={4}
            margin='normal'
          />
          <TextField
            label='Email HTML content'
            type='text'
            name='html'
            value={emailData.html}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin='normal'
          />
          <Box sx={{ mt: 2 }}>
            <Button type='submit' variant='contained' color='primary' fullWidth>
              Send Email
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

export default SendEmailPage
