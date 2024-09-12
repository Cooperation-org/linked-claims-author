'use client'
import React, { useState, useEffect } from 'react'
import { Snackbar, Alert } from '@mui/material'

// Define the props interface
interface SnackMessageProps {
  message: string
}

// Functional component with typed props
const SnackMessage: React.FC<SnackMessageProps> = ({ message }) => {
  const [open, setOpen] = useState<boolean>(false)

  // Open the Snackbar if there is a new message
  useEffect(() => {
    if (message) {
      setOpen(true)
    }
  }, [message])

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity='info' sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackMessage
