'use client'

import React from 'react'
import { Box, Typography, FormLabel, Button } from '@mui/material'
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue
} from 'react-hook-form'
import TextEditor from '../../../../components/form/TextEditor/Texteditor'
import { FormData } from '../../../../components/form/types/Types'

interface Step3Props {
  register: UseFormRegister<FormData>
  watch: UseFormWatch<FormData>
  setValue: UseFormSetValue<FormData>
  errors: FieldErrors<FormData>
  handleNext: () => void
  handleBack: () => void
}

const Step3: React.FC<Step3Props> = ({
  register,
  watch,
  setValue,
  errors,
  handleNext,
  handleBack
}) => {
  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
      <Typography variant='h6' gutterBottom>
        Thanks, Carol! Now share your recommendation and how you know Alice.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <FormLabel sx={{ fontWeight: 'bold' }} id='recommendation-text-label'>
          Recommendation Text <span style={{ color: 'red' }}>*</span>
        </FormLabel>
        <TextEditor
          value={watch('recommendationText')}
          onChange={value => setValue('recommendationText', value ?? '')}
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
        />
        {errors.howDoYouKnowAlice && (
          <Typography color='error'>{errors.howDoYouKnowAlice.message}</Typography>
        )}
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

export default Step3
