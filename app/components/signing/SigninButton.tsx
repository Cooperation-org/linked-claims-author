'use client'
import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useGoogleSignIn } from './useGoogleSignIn'

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '100px',
  textTransform: 'capitalize',
  fontFamily: 'Roboto',
  fontWeight: '600',
  lineHeight: '20px',
  border: '1px solid  #4E4E4E',
  backgroundColor: '#003FE0',
  color: '#FFF',
  '&:hover': {
    backgroundColor: '#003FE0'
  }
}

const SigninButton = () => {
  const { session, handleSignIn, handleSignOut } = useGoogleSignIn()

  if (session?.user) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: '20px' }}>
        {/* <Typography>Hi, {session.user.name}</Typography> */}
        <Button sx={buttonStyle} onClick={handleSignOut}>
          Sign Out
        </Button>
      </Box>
    )
  }
  return (
    <Button sx={{ ...buttonStyle, mt: '20px' }} onClick={handleSignIn}>
      Sign In
    </Button>
  )
}

export default SigninButton
