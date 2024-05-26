'use client'

import React from 'react'
import { Typography } from '@mui/material'

export const textGuid = [
  <> Hi, I’m Tessa! <br /> Where do you want to save your LinkedClaims?</>,
  'Let’s get started with your name and address.',
  <>Thanks, Alice! <br/> Now let’s learn more about the skills you have.</>,
  'Now describe what you can demonstrate using this skill.',
  'Do you have any portfolio pieces you want to add?',
  'Would you like to add an image to your credential?',
  <>Well done! <br/> Here’s what you’ve created:</>,
  'Success!'
]

export const note =
  'Please note, all fields marked with an asterisk are required and must be completed.'
export const successNote =
  'Congratulations on your achievement. Tell the world what you’ve accomplished!'

interface FormTextStepsProps {
  t3BodyText: string
  activeStep: number
  activeText: any
}

export function FormTextSteps({
  t3BodyText,
  activeStep,
  activeText
}: FormTextStepsProps) {
  return (
    <Typography
      sx={{
        color: t3BodyText,
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        p: '0 50px'
      }}
    >
      {activeText}
      {activeStep === 0 && (
        <span
          style={{
            color: 'red'
          }}
        >
          {' '}
          *
        </span>
      )}
    </Typography>
  )
}

interface TextProps {
  t3BodyText: string
}

export function SuccessText({ t3BodyText }: TextProps) {
  return (
    <Typography
      sx={{
        color: t3BodyText,
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontStyle: 'italic',
        fontWeight: 500,
        lineHeight: 'normal'
      }}
    >
      {successNote}
    </Typography>
  )
}

export function NoteText({ t3BodyText }: TextProps) {
  return (
    <Typography
      sx={{
        color: t3BodyText,
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontStyle: 'italic',
        fontWeight: 400,
        lineHeight: 'normal'
      }}
    >
      {note}
    </Typography>
  )
}
