'use client'

import React from 'react'
import { Typography } from '@mui/material'

export const textGuid = [
  <>
    Hi, I’m Tessa! <br /> Where do you want to save your LinkedClaims?
  </>,
  'First, choose where to save your recommendation.',
  <>Now tell us more about you and how you know Alice. </>,
  <>
    Thanks, Carol! <br /> Now share your recommendation and how you know Alice.',
  </>,
  <>
    Thanks, Carol! <br /> Now share your recommendation and how you know Alice. <br /> Do
    you have evidence to share?
  </>,
  'Would you like to add an image to your skill?',
  <>
    Well done! <br /> Here’s what you’ve created:
  </>,
  'Success!'
]

export const note =
  'Please note, all fields marked with an asterisk are required and must be completed.'
export const successNote =
  'Congratulations on your achievement. Tell the world what you’ve accomplished!'

export const CredentialViewText =
  'Hi, I’m Tessa! I’ll help you with Alice’s recommendation.'

export const featuresRecommentations = [
  { id: 1, name: 'How you know Alice' },
  { id: 2, name: 'Proof of your qualifications' },
  { id: 3, name: 'Evidence of Alice’s skills' }
]

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
