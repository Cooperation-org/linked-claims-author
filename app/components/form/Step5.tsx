'use client'

import React from 'react'
import { FormLabel, TextField, Box } from '@mui/material'
import {
  buttonLinkStyles,
  inputPropsStyles,
  TextFieldStyles,
  formLabelStyles,
  skipButtonBoxStyles
} from './boxStyles'
import { UseFormRegister } from 'react-hook-form'
import { FormData } from './Types'

interface Step5Props {
  register: UseFormRegister<FormData>
  handleNext: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export function Step5({ register, handleNext }: Readonly<Step5Props>) {
  return (
    <Box>
      <FormLabel sx={formLabelStyles} id='image-url-label'>
        URL of an image you have permission to use (optional)
      </FormLabel>
      <TextField
        {...register('imageLink')}
        placeholder='https://'
        variant='outlined'
        sx={TextFieldStyles}
        aria-labelledby='image-url-label'
        inputProps={{
          'aria-label': 'weight',
          style: inputPropsStyles
        }}
      />
      <Box sx={skipButtonBoxStyles}>
        <button type='button' onClick={handleNext} style={buttonLinkStyles}>
          Skip
        </button>
      </Box>
    </Box>
  )
}