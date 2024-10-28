'use client'

import React, { useState, useEffect } from 'react'
import { FormLabel, Autocomplete, TextField, Box } from '@mui/material'
import {
  inputPropsStyles,
  TextFieldStyles,
  formLabelStyles,
  formLabelSpanStyles
} from '../../../components/Styles/appStyles'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { FormData } from '../types/Types'
import TextEditor from '../TextEditor/Texteditor'

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
  const [skillsList, setSkillsList] = useState<string[]>([])

  useEffect(() => {
    fetch('/skills.json')
      .then(response => response.json())
      .then(data => setSkillsList(data))
      .catch(error => console.error('Error loading skills:', error))
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Box>
        <FormLabel sx={formLabelStyles} id='name-label'>
          Skill Name <span style={formLabelSpanStyles}> *</span>
        </FormLabel>

        <Autocomplete
          freeSolo
          options={skillsList}
          filterOptions={(options, { inputValue }) =>
            options
              .filter(option => option.toLowerCase().includes(inputValue.toLowerCase()))
              .slice(0, 10)
          }
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
                'aria-label': 'Skill Name',
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
            'aria-label': 'Time Duration',
            style: inputPropsStyles
          }}
          error={!!errors.credentialDuration}
          helperText={errors.credentialDuration?.message}
        />
      </Box>
    </Box>
  )
}
