'use client'
import React from 'react'
import { Typography } from '@mui/material'

export const textGuid = [
  '',
  'Let’s get started with your name and address.',
  'Thanks, Alice! Now let’s learn more about the skills you have.',
  'Now describe what you can demonstrate using this skill.',
  'Do you have any portfolio pieces you want to add?',
  'Would you like to add an image to your credential?',
  'Well done! Here’s what you’ve created:',
  'Success!'
]

export const note =
  'Please note, all fields marked with an asterisk are required and must be completed.'
export const successNote =
  'Congratulations on your achievement. Tell the world what you’ve accomplished!'

export function FormTextSteps(props: {
  t3BodyText: any
  activeStep: number
  _activeStep:
    | string
    | number
    | bigint
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | Promise<React.AwaitedReactNode>
    | null
    | undefined
}) {
  return (
    <Typography
      sx={{
        color: props.t3BodyText,
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        p: '0 50px'
      }}
    >
      {props.activeStep === 0 && (
        <>
          <span
            style={{
              display: 'block'
            }}
          >
            Hi, I’m Tessa!
          </span>
          <span>Where do you want to save your LinkedClaims?</span>
        </>
      )}
      {props._activeStep}
      {props.activeStep === 0 && (
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

export function SuccessText(props: { t3BodyText: any }) {
  return (
    <Typography
      sx={{
        color: props.t3BodyText,
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

export function NoteText(props: { t3BodyText: any }) {
  return (
    <Typography
      sx={{
        color: props.t3BodyText,
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