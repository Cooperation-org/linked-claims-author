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

export function Step2(props: {
  palette: { t3BodyText: any }
  register: (
    arg0: string,
    arg1: { required: string }
  ) => React.JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined } & Omit<
      OutlinedTextFieldProps | StandardTextFieldProps | FilledTextFieldProps,
      'variant'
    >
  watch: (arg0: string) => any
  handleTextEditorChange: (value: any) => void
}) {
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
            color: props.palette.t3BodyText,
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
            {' '}
            *
          </span>
        </FormLabel>
        <TextField
          {...props.register('credentialName', {
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
        value={props.watch('credentialDescription')}
        onChange={props.handleTextEditorChange}
      />
      <Box>
        <FormLabel
          sx={{
            color: props.palette.t3BodyText,
            fontFamily: 'Lato',
            fontSize: '16px',
            fontWeight: 600,
            '&.Mui-focused': {
              color: '#000'
            }
          }}
          id='name-label'
        >
          Duration{' '}
          <span
            style={{
              color: 'red'
            }}
          >
            {' '}
            *
          </span>
        </FormLabel>
        <TextField
          {...props.register('credentialDuration', {
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
    </Box>
  )
}
