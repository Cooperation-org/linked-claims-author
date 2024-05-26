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

export function Step5(props: {
  palette: { t3BodyText: any; t3Purple: any }
  register: (
    arg0: string
  ) => React.JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined } & Omit<
      FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps,
      'variant'
    >
  handleNext: React.MouseEventHandler<HTMLButtonElement> | undefined
}) {
  return (
    <Box>
      <FormLabel
        sx={{
          color: props.palette.t3BodyText,
          fontFamily: 'Lato',
          fontSize: '13px',
          fontWeight: 600,
          '&.Mui-focused': {
            color: '#000'
          }
        }}
        id='name-label'
      >
        URL of an image you have permission to use (optional)
      </FormLabel>
      <TextField
        {...props.register('imageLink')}
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
        aria-labelledby='name-label'
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
          onClick={props.handleNext}
          style={{
            background: 'none',
            color: props.palette.t3Purple,
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
