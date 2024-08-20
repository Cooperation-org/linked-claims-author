'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'

export const textGuid = [
  <>
    Hi, I’m Tessa! <br /> Where do you want to save your LinkedClaims?
  </>,
  'Let’s get started with your name and address.',
  <>
    Thanks, Alice! <br /> Now let’s learn more about the skills you have.
  </>,
  'Now describe what you can demonstrate using this skill.',
  'Do you have any portfolio pieces you want to add?',
  'Would you like to add an image to your skill?',
  <>
    Well done! <br /> Here’s what you’ve created:
  </>,
  'Success!'
]

export const note =
  'Please note, all fields marked with an asterisk are required and must be completed.'
export const successNote = (
  <Typography variant='h6'>
    <Box
      component='span'
      sx={{ backgroundColor: '#ffe592', borderRadius: '6px', padding: '0 6px' }}
    >
      Congratulations on your
      <br />
    </Box>{' '}
    <Box
      component='span'
      sx={{ backgroundColor: '#ffe592', borderRadius: '6px', padding: '0 6px' }}
    >
      achievement. Tell the world what
      <br />
    </Box>
    <Box
      component='span'
      sx={{ backgroundColor: '#ffe592', borderRadius: '6px', padding: '0 6px' }}
    >
      you’ve accomplished!
    </Box>
  </Typography>
)

export const CredentialViewText =
  'Hi, I’m Tessa! I’ll help you with Alice’s recommendation.'

interface FormTextStepsProps {
  activeStep: number
  activeText: any
}

export function FormTextSteps({ activeStep, activeText }: Readonly<FormTextStepsProps>) {
  return (
    <Typography variant='formTextStep'>
      {activeText}
      {activeStep === 0 && <span style={{ color: 'red' }}>*</span>}
    </Typography>
  )
}

interface TextProps {
  t3BodyText: string
}

export function SuccessText() {
  return <Typography variant='successText'>{successNote}</Typography>
}

export function NoteText() {
  return <Typography variant='noteText'>{note}</Typography>
}
