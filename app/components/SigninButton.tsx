'use client'
import React, { useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Box, Button, Typography } from '@mui/material'
import { DefaultSession } from 'next-auth'

interface ExtendedSession extends DefaultSession {
  accessToken?: string
  idToken?: string
}

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
  console.log('SigninButton data:', session)

  useEffect(() => {
    const extendedSession = session as ExtendedSession
    if (extendedSession?.accessToken) {
      localStorage.setItem('accessToken', extendedSession.accessToken)
    } else {
      localStorage.removeItem('accessToken')
    }
  }, [session])

  if (session && session.user) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: '20px' }}>
        <Typography>Hi, {session.user.name}</Typography>
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
