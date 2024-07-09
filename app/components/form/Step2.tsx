'use client'

import React from 'react'
import { FormLabel, TextField, Box } from '@mui/material'
import {
  inputPropsStyles,
  TextFieldStyles,
  formLabelStyles,
  formLabelSpanStyles
} from './boxStyles'
import TextEditor from '../Texteditor'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { FormData } from './Types'

interface Step2Props {
  register: UseFormRegister<FormData>
  watch: (field: string) => any
  handleTextEditorChange: (value: any) => void
  errors: FieldErrors<FormData>
}

export function Step2({
  register,
  watch,
  handleTextEditorChange,
  errors
}: Readonly<Step2Props>) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Box>
        <FormLabel sx={formLabelStyles} id='name-label'>
          Skill Name <span style={formLabelSpanStyles}> *</span>
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
        <FormLabel sx={formLabelStyles} id='duration-label'>
          Duration
        </FormLabel>
        <TextField
          {...register('credentialDuration')}
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
