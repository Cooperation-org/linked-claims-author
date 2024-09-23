'use client'

import React from 'react'
import { FormLabel, Autocomplete, TextField, Box } from '@mui/material'
import {
  inputPropsStyles,
  TextFieldStyles,
  formLabelStyles,
  formLabelSpanStyles
} from '../../../components/Styles/appStyles'
import TextEditor from '../TextEditor/Texteditor'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { FormData } from '../types/Types'

interface Step2Props {
  register: UseFormRegister<FormData>
  watch: (field: string) => any
  handleTextEditorChange: (value: any) => void
  errors: FieldErrors<FormData>
}

// Example list of skills for auto-search
const skillsList = [
  'Software Developer',
  'Project Manager',
  'Data Analyst',
  'Marketing Coordinator',
  'Community Gardening Coordinator',
  'UX/UI Designer',
  'Product Manager',
  'Financial Analyst'
]

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

        {/* Autocomplete Component for Skill Name with Auto-Search */}
        <Autocomplete
          freeSolo
          options={skillsList}
          renderInput={params => (
            <TextField
              {...params}
              {...register('credentialName', {
                required: 'Skill name is required'
              })}
              placeholder='e.g., Community Gardening Coordinator'
              variant='outlined'
              sx={TextFieldStyles}
              aria-labelledby='name-label'
              inputProps={{
                ...params.inputProps,
                'aria-label': 'weight',
                style: inputPropsStyles
              }}
              error={!!errors.credentialName}
              helperText={errors.credentialName?.message}
            />
          )}
        />
      </Box>

      <TextEditor
        value={watch('credentialDescription')}
        onChange={handleTextEditorChange}
      />

      <Box>
        <FormLabel sx={formLabelStyles} id='duration-label'>
          Time it took to acquire this skill
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
