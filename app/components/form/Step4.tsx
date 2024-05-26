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

interface Step4Props {
  fields: { id: string; name: string; url: string }[]
  palette: { t3BodyText: string; t3ButtonBlue: string; t3Purple: string }
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

export function Step4({ fields, palette, register, append, handleNext }: Step4Props) {
  return (
    <Box>
      {fields.map((field, index) => (
        <React.Fragment key={field.id}>
          <Box
            sx={{
              mb: '15px'
            }}
          >
            <FormLabel
              sx={{
                color: palette.t3BodyText,
                fontFamily: 'Lato',
                fontSize: '16px',
                fontWeight: 600,
                '&.Mui-focused': {
                  color: '#000'
                }
              }}
              id={`name-label-${index}`}
            >
              Name
            </FormLabel>
            <TextField
              {...register(`portfolio.${index}.name`, {
                required: 'Name is required'
              })}
              defaultValue={field.name}
              placeholder='Picture of the Community Garden'
              variant='outlined'
              sx={{
                bgcolor: '#FFF',
                width: '100%',
                mt: '3px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px'
                }
              }}
              aria-labelledby={`name-label-${index}`}
            />
          </Box>
          <Box>
            <FormLabel
              sx={{
                color: palette.t3BodyText,
                fontFamily: 'Lato',
                fontSize: '16px',
                fontWeight: 600,
                '&.Mui-focused': {
                  color: '#000'
                }
              }}
              id={`url-label-${index}`}
            >
              URL
            </FormLabel>
            <TextField
              {...register(`portfolio.${index}.url`, {
                required: 'URL is required'
              })}
              defaultValue={field.url}
              placeholder='https://www.example.com'
              variant='outlined'
              sx={{
                bgcolor: '#FFF',
                width: '100%',
                mt: '3px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px'
                }
              }}
              aria-labelledby={`url-label-${index}`}
            />
          </Box>
        </React.Fragment>
      ))}
      {fields.length < 5 && (
        <Box
          sx={{
            width: '100%',
            justifyContent: 'flex-end',
            display: 'flex'
          }}
        >
          <button
            type='button'
            onClick={() =>
              append({
                name: '',
                url: ''
              })
            }
            style={{
              background: 'none',
              color: palette.t3ButtonBlue,
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
