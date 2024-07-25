'use client'

import React from 'react'
import { Box, Typography, FormLabel, TextField, Button } from '@mui/material'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import TextEditor from '../../../../components/form/TextEditor/Texteditor'
import { FormData } from '../../../../components/form/types/Types'

interface Step2Props {
  register: UseFormRegister<FormData>
  watch: (field: string) => any
  handleTextEditorChange: (value: any) => void
  errors: FieldErrors<FormData>
  handleNext: () => void
  handleBack: () => void
}

const Step2: React.FC<Step2Props> = ({
  register,
  watch,
  handleTextEditorChange,
  errors,
  handleNext,
  handleBack
}) => {
  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
      <Box sx={{ mt: 3 }}>
        <FormLabel sx={{ fontWeight: 'bold' }} id='full-name-label'>
          Full Name <span style={{ color: 'red' }}>*</span>
        </FormLabel>
        <TextField
          {...register('fullName', {
            required: 'Full name is required'
          })}
          placeholder='Firstname Lastname'
          variant='outlined'
          fullWidth
          sx={{ mt: 1 }}
          aria-labelledby='full-name-label'
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <FormLabel sx={{ fontWeight: 'bold' }} id='qualifications-label'>
          Your Qualifications
        </FormLabel>
        <Typography variant='body2' gutterBottom>
          Please share how you are qualified to provide this recommendation. Sharing your
          qualifications will further increase the value of this recommendation.
        </Typography>
        <TextEditor
          value={watch('credentialDescription')}
          onChange={handleTextEditorChange}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button variant='outlined' onClick={handleBack}>
          Back
        </Button>
        <Button variant='contained' color='primary' onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Box>
  )
}

export default Step2
