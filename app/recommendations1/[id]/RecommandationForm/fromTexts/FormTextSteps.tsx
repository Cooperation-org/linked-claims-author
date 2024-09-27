'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'

export const textGuid = (fullName: string) => [
  <>
    Hi, I’m Tessa! <br /> Where do you want to save your LinkedClaims?
  </>,
  <>
    First, choose where to save your recommendation.{' '}
    <span style={{ color: 'red' }}>*</span>
  </>,
  <>Now tell us more about you and how you know {fullName}. </>,
  <>
    Thanks, Carol! <br /> Now share your recommendation and how you know {fullName}.
  </>,
  <>
    Thanks, Carol! <br /> Now share your recommendation and how you know {fullName}.{' '}
    <br /> Do you have evidence to share?
  </>,
  <>
    Well done! <br /> Here’s what you’ve created:
  </>,
  <>Your recommendation has been saved to Google Drive!</>,
  'Success!'
]

export const note =
  'Please note, all fields marked with an asterisk are required and must be completed.'
export const storageOptionNote =
  'Your recommendation will be stored in the location you select. This will ensure it can be linked to the individual’s credential once you’re finished:'
export const successNote =
  'Congratulations on your achievement. Tell the world what you’ve accomplished!'

export const CredentialViewText = (fullName: string) =>
  `Hi, I’m Tessa! I’ll help you with ${fullName}’s recommendation.`

export const StorageText =
  'Your recommendation will be stored in the location you select. This will ensure it can be linked to the individual’s credential once you’re finished:'

export const featuresRecommentations = (fullName: string) => [
  { id: 1, name: `How you know ${fullName}` },
  { id: 2, name: 'Proof of your qualifications' },
  { id: 3, name: `Comment on ${fullName}’s skills` },
  { id: 4, name: `Any additional evidence, if available` }
]

interface FormTextStepsProps {
  activeStep: number
  activeText: any
}

export function FormTextSteps({ activeStep, activeText }: Readonly<FormTextStepsProps>) {
  return (
    <Box sx={{ ml: '20px', textAlign: 'center' }}>
      <Typography variant='formTextStep'>
        {activeText}
        {activeStep === 0 && <span style={{ color: 'red' }}>*</span>}
      </Typography>
    </Box>
  )
}

export function SuccessText() {
  return <Typography variant='successText'>{successNote}</Typography>
}

export function NoteText() {
  return <Typography variant='noteText'>{note}</Typography>
}
export function StorageOptionNote() {
  return <Typography variant='noteText'>{storageOptionNote}</Typography>
}
