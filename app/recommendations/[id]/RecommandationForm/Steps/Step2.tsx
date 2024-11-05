'use client'

import React from 'react'
import { Box, FormLabel, TextField } from '@mui/material'
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form'
import TextEditor from '../TextEditor/Texteditor'
import { FormData } from '../../../../credentialForm/form/types/Types'
import {
  formLabelStyles,
  formLabelSpanStyles,
  inputPropsStyles,
  TextFieldStyles
} from '../../../../components/Styles/appStyles'

interface Step2Props {
  register: UseFormRegister<FormData>
  watch: (field: string) => any
  setValue: UseFormSetValue<FormData>
  errors: FieldErrors<FormData>
  fullName: string
}

const Step2: React.FC<Step2Props> = ({ register, watch, setValue, errors, fullName }) => {
  const displayName = fullName || ''

  const handleEditorChange = (field: string) => (value: string) => {
    setValue(field, value)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Box sx={{ width: '100%' }}>
        <FormLabel sx={formLabelStyles} id='full-name-label'>
          Full Name <span style={formLabelSpanStyles}> *</span>
        </FormLabel>
        <TextField
          {...register('fullName', {
            required: 'Full name is required'
          })}
          placeholder='Firstname Lastname'
          variant='outlined'
          sx={TextFieldStyles}
          aria-labelledby='full-name-label'
          inputProps={{
            'aria-label': 'Full Name',
            style: inputPropsStyles
          }}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />
      </Box>
      <Box>
        <FormLabel sx={formLabelStyles} id='how-know-label'>
          How do you know {displayName}? <span style={formLabelSpanStyles}> *</span>
        </FormLabel>
        <TextEditor
          value={watch('howKnow')}
          onChange={handleEditorChange('howKnow')}
          placeholder={`e.g., I am ${displayName}’s former supervisor. I’ve known ${displayName} for 5 years.`}
        />
        {errors.howKnow && <p style={{ color: 'red' }}>{errors.howKnow.message}</p>}
      </Box>
    </Box>
  )
}

export default Step2
