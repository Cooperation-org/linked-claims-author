'use client'

import React from 'react'
import {
  FormLabel,
  TextField,
  Box,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldVariants
} from '@mui/material'
import {
  buttonStyles,
  inputPropsStyles,
  TextFieldStyles,
  formLableStyles
} from './boxStyles'

interface Step5Props {
  register: (
    arg: string
  ) => React.JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined } & Omit<
      FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps,
      'variant'
    >
  handleNext: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export function Step5({ register, handleNext }: Step5Props) {
  return (
    <Box>
      <FormLabel sx={formLableStyles} id='image-url-label'>
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
      <Box
        sx={{
          width: '100%',
          justifyContent: 'center',
          display: 'flex',
          marginTop: '40px'
        }}
      >
        <button type='button' onClick={handleNext} style={buttonStyles}>
          Skip
        </button>
      </Box>
    </Box>
  )
}
