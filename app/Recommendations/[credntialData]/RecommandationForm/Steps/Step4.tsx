'use client'

import React from 'react'
import { Box, Typography, FormLabel } from '@mui/material'
import { FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form'
import TextEditor from '../TextEditor/Texteditor'
import { FormData } from '../../../../CredentialForm/form/types/Types'

interface Step4Props {
  watch: UseFormWatch<FormData>
  setValue: UseFormSetValue<FormData>
  errors: FieldErrors<FormData>
}

const Step4: React.FC<Step4Props> = ({ watch, setValue, errors }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Box>
        <FormLabel sx={{ fontWeight: 'bold' }} id='explain-answer-label'>
          Explain your answer:
        </FormLabel>
        <TextEditor
          value={watch('explainAnswer')}
          onChange={value => setValue('explainAnswer', value ?? '')}
          placeholder='I worked with Golda for about two years managing her work at the community garden. She was an excellent worker, prompt, and friendly.'
        />
        {errors.explainAnswer && (
          <Typography color='error'>{errors.explainAnswer.message}</Typography>
        )}
      </Box>
    </Box>
  )
}

export default Step4
