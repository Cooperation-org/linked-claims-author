'use client'

import React from 'react'
import { Box, FormLabel, TextField } from '@mui/material'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import TextEditor from '../TextEditor/Texteditor'
import { FormData } from '../../../../components/form/types/Types'
import {
  formLabelStyles,
  formLabelSpanStyles,
  inputPropsStyles,
  TextFieldStyles
} from '../../../../components/Styles/appStyles'

interface Step2Props {
  register: UseFormRegister<FormData>
  watch: (field: string) => any
  handleTextEditorChange: (value: any) => void
  errors: FieldErrors<FormData>
}

const Step2: React.FC<Step2Props> = ({
  register,
  watch,
  handleTextEditorChange,
  errors
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Box>
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
        <FormLabel sx={formLabelStyles} id='qualifications-label'>
          How do you know Alice? <span style={formLabelSpanStyles}> *</span>
        </FormLabel>
        <TextEditor
          value={watch('RecommenderDescription')}
          onChange={handleTextEditorChange}
          placeholder='e.g., I am Alice’s former supervisor. I’ve known her for 5 years.'
        />
      </Box>
    </Box>
  )
}

export default Step2
