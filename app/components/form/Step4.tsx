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
import { formLableStyles, TextFieldStyles, buttonStyles } from './boxStyles'

interface Step4Props {
  fields: { id: string; name: string; url: string }[]
  register: (
    arg: string,
    arg1: { required: string }
  ) => React.JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined } & Omit<
      FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps,
      'variant'
    >
  append: (arg: { name: string; url: string }) => void
  handleNext: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export function Step4({ fields, register, append, handleNext }: Step4Props) {
  return (
    <Box>
      {fields.map((field, index) => (
        <React.Fragment key={field.id}>
          <Box sx={{ mb: '15px' }}>
            <FormLabel sx={formLableStyles} id={`name-label-${index}`}>
              Name
            </FormLabel>
            <TextField
              {...register(`portfolio.${index}.name`, {
                required: 'Name is required'
              })}
              defaultValue={field.name}
              placeholder='Picture of the Community Garden'
              variant='outlined'
              sx={TextFieldStyles}
              aria-labelledby={`name-label-${index}`}
            />
          </Box>
          <Box>
            <FormLabel sx={formLableStyles} id={`url-label-${index}`}>
              URL
            </FormLabel>
            <TextField
              {...register(`portfolio.${index}.url`, {
                required: 'URL is required'
              })}
              defaultValue={field.url}
              placeholder='https://www.example.com'
              variant='outlined'
              sx={TextFieldStyles}
              aria-labelledby={`url-label-${index}`}
            />
          </Box>
        </React.Fragment>
      ))}
      {fields.length < 5 && (
        <Box sx={{ width: '100%', justifyContent: 'flex-end', display: 'flex' }}>
          <button
            type='button'
            onClick={() => append({ name: '', url: '' })}
            style={{
              background: 'none',
              color: 't3ButtonBlue',
              border: 'none',
              padding: 0,
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 400,
              letterSpacing: '0.075px',
              textAlign: 'right',
              lineHeight: '16px',
              marginTop: '7px'
            }}
          >
            Add another
          </button>
        </Box>
      )}
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
