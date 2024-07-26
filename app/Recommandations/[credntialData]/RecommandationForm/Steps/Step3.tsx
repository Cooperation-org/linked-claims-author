'use client'

import React from 'react'
import { Box, Typography, FormLabel } from '@mui/material'
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue
} from 'react-hook-form'
import TextEditor from '../TextEditor/Texteditor'
import { FormData } from '../../../../components/form/types/Types'

interface Step3Props {
  register: UseFormRegister<FormData>
  watch: UseFormWatch<FormData>
  setValue: UseFormSetValue<FormData>
  errors: FieldErrors<FormData>
}

const Step3: React.FC<Step3Props> = ({ register, watch, setValue, errors }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Box sx={{ mt: 3 }}>
        <FormLabel sx={{ fontWeight: 'bold' }} id='recommendation-text-label'>
          Recommendation Text <span style={{ color: 'red' }}>*</span>
        </FormLabel>
        <TextEditor
          value={watch('recommendationText')}
          onChange={value => setValue('recommendationText', value ?? '')}
          placeholder='e.g., Alice managed a local garden for 2 years, Organized weekly gardening workshops, Led a community clean-up initiative'
        />
        {errors.recommendationText && (
          <Typography color='error'>{errors.recommendationText.message}</Typography>
        )}
      </Box>
      <Box sx={{ mt: 3 }}>
        <FormLabel sx={{ fontWeight: 'bold' }} id='how-do-you-know-alice-label'>
          How do you know Alice? <span style={{ color: 'red' }}>*</span>
        </FormLabel>
        <TextEditor
          value={watch('howDoYouKnowAlice')}
          onChange={value => setValue('howDoYouKnowAlice', value ?? '')}
          placeholder='I was Alice’s manager for about two years, but I have known her in total for about 5 years.'
        />
        {errors.howDoYouKnowAlice && (
          <Typography color='error'>{errors.howDoYouKnowAlice.message}</Typography>
        )}
      </Box>
    </Box>
  )
}

export default Step3
