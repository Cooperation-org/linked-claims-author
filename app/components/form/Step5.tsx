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

interface Step5Props {
  palette: { t3BodyText: string; t3Purple: string }
  register: (
    arg: string
  ) => React.JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined } & Omit<
      FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps,
      'variant'
    >
  handleNext: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export function Step5({ palette, register, handleNext }: Step5Props) {
  return (
    <Box>
      <FormLabel
        sx={{
          color: palette.t3BodyText,
          fontFamily: 'Lato',
          fontSize: '13px',
          fontWeight: 600,
          '&.Mui-focused': {
            color: '#000'
          }
        }}
        id='image-url-label'
      >
        URL of an image you have permission to use (optional)
      </FormLabel>
      <TextField
        {...register('imageLink')}
        placeholder='https://'
        variant='outlined'
        sx={{
          bgcolor: '#FFF',
          width: '100%',
          mt: '3px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px'
          }
        }}
        aria-labelledby='image-url-label'
        inputProps={{
          'aria-label': 'weight',
          style: {
            color: 'black',
            fontSize: '15px',
            fontStyle: 'italic',
            fontWeight: 600,
            letterSpacing: '0.075px'
          }
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
        <button
          type='button'
          onClick={handleNext}
          style={{
            background: 'none',
            color: palette.t3Purple,
            border: 'none',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 400
          }}
        >
          Skip
        </button>
      </Box>
    </Box>
  )
}
