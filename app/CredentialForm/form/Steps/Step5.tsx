'use client'

import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material'
import {
  skipButtonBoxStyles,
  buttonLinkStyles
} from '../../../components/Styles/appStyles'

interface Step5Props {
  register: UseFormRegister<FormData>

  handleNext: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export function Step5({ handleNext, register, setValue, watch, errors }: any) {
  const file = watch('evidenceLink')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      // Validate file type if needed
      if (/^image\/(jpeg|png|gif)$/.test(file.type)) {
        setValue('evidenceLink', file) // Setting file in react-hook-form's state
      } else {
        alert('Please upload an image file (jpeg, png, gif)')
      }
    }
  }

  return (
    <Box>
      <FormLabel htmlFor='evidenceLink'>Upload an image (optional)</FormLabel>
      <TextField
        {...register('evidenceLink')}
        type='file'
        onChange={handleFileChange}
        inputProps={{ accept: 'image/jpeg, image/png, image/gif' }}
        error={Boolean(errors.evidenceLink)}
        helperText={errors.evidenceLink?.message || ''}
        fullWidth
      />

      {file && <Typography>Image ready to be uploaded: {file.name}</Typography>}
      <Box sx={skipButtonBoxStyles}>
        <button type='button' onClick={handleNext} style={buttonLinkStyles}>
          Skip
        </button>
      </Box>
    </Box>
  )
}

export default Step5
