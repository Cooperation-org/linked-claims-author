'use client'
import React from 'react'
import { FormLabel } from '@mui/material'

export function BusinessLabel() {
  return (
    <FormLabel
      sx={{
        color: 'var(--T3-Body-Text, #202E5B)',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 'normal',
        letterSpacing: '0.08px',
        mb: '7px',
        '&.Mui-focused': {
          color: '#000'
        }
      }}
      id='form-type-label'
    >
      Is this for an individual or a business?
    </FormLabel>
  )
}
