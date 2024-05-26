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
import TextEditor from '../Texteditor'

interface Step2Props {
  palette: { t3BodyText: string }
  register: (
    arg: string,
    arg1: { required: string }
  ) => React.JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined } & Omit<
      OutlinedTextFieldProps | StandardTextFieldProps | FilledTextFieldProps,
      'variant'
    >
  watch: (arg: string) => any
  handleTextEditorChange: (value: any) => void
}

export function Step2({ palette, register, watch, handleTextEditorChange }: Step2Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px'
      }}
    >
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
          id='name-label'
        >
          Credential Name{' '}
          <span
            style={{
              color: 'red'
            }}
          >
            *
          </span>
        </FormLabel>
        <TextField
          {...register('credentialName', {
            required: 'Credential name is required'
          })}
          placeholder='e.g., Community Gardening Coordinator'
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
      </Box>
      <TextEditor
        value={watch('credentialDescription')}
        onChange={handleTextEditorChange}
      />
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
          id='duration-label'
        >
          Duration{' '}
          <span
            style={{
              color: 'red'
            }}
          >
            *
          </span>
        </FormLabel>
        <TextField
          {...register('credentialDuration', {
            required: 'Duration is required'
          })}
          placeholder='1 Day'
          variant='outlined'
          sx={{
            bgcolor: '#FFF',
            width: '100%',
            mt: '3px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px'
            }
          }}
          aria-labelledby='duration-label'
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
      </Box>
    </Box>
  )
}
