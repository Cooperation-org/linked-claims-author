'use client'
import React from 'react'
import { Box, Button } from '@mui/material'
import { useSession, signIn, signOut } from 'next-auth/react'

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
  const { data: session } = useSession()

  if (session?.user) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: '20px' }}>
        <Button sx={buttonStyle} onClick={() => signOut()}>
          Sign Out
        </Button>
      </Box>
    )
  }
  return (
    <Button sx={{ ...buttonStyle, mt: '20px' }} onClick={() => signIn()}>
      Sign In
    </Button>
  )
}

export default SigninButton
