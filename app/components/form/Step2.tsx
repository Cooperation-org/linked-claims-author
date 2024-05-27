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
import { inputPropsStyles, TextFieldStyles, formLableStyles } from './boxStyles'
import TextEditor from '../Texteditor'

interface Step2Props {
  register: (
    arg: string,
    arg1: { required: string }
  ) => React.JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined } & Omit<
      OutlinedTextFieldProps | StandardTextFieldProps | FilledTextFieldProps,
      'variant'
    >
  watch: (arg: string) => any
  handleTextEditorChange: (value: any) => void
  errors: any
}

export function Step2({ register, watch, handleTextEditorChange, errors }: Step2Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Box>
        <FormLabel sx={formLableStyles} id='name-label'>
          Skill Name <span style={{ color: 'red' }}> *</span>
        </FormLabel>
        <TextField
          {...register('credentialName', {
            required: 'Skill name is required'
          })}
          placeholder='e.g., Community Gardening Coordinator'
          variant='outlined'
          sx={TextFieldStyles}
          aria-labelledby='name-label'
          inputProps={{
            'aria-label': 'weight',
            style: inputPropsStyles
          }}
          error={!!errors.credentialName}
          helperText={errors.credentialName?.message}
        />
      </Box>
      <TextEditor
        value={watch('credentialDescription')}
        onChange={handleTextEditorChange}
      />
      <Box>
        <FormLabel sx={formLableStyles} id='duration-label'>
          Duration <span style={{ color: 'red' }}>*</span>
        </FormLabel>
        <TextField
          {...register('credentialDuration', {
            required: 'Duration is required'
          })}
          placeholder='1 Day'
          variant='outlined'
          sx={TextFieldStyles}
          aria-labelledby='duration-label'
          inputProps={{
            'aria-label': 'weight',
            style: inputPropsStyles
          }}
          error={!!errors.credentialDuration}
          helperText={errors.credentialDuration?.message}
        />
      </Box>
    </Box>
  )
}
