'use client'

import React from 'react'
import { FormLabel, Box } from '@mui/material'
import { SVGSparkles } from '../../../Assets/SVGs'
import {
  CustomTextField,
  formLabelStyles,
  UseAIStyles,
  customTextFieldStyles,
  aiBoxStyles
} from '../../../components/Styles/appStyles'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { FormData } from '../types/Types'

interface Step3Props {
  errors: FieldErrors<FormData>
  watch: (arg: string) => any
  register: UseFormRegister<FormData>
  characterLimit: number
}

export function Step3({ register, characterLimit, errors, watch }: Readonly<Step3Props>) {
  return (
    <Box position='relative' width='100%'>
      <FormLabel sx={formLabelStyles} id='description-label'>
        Description (publicly visible)
      </FormLabel>
      <CustomTextField
        {...register('description')}
        sx={customTextFieldStyles}
        multiline
        rows={11}
        variant='outlined'
        FormHelperTextProps={{
          className: 'MuiFormHelperText-root'
        }}
        inputProps={{ maxLength: characterLimit }}
        error={!!errors.description}
        helperText={
          errors.description?.message
            ? `${errors.description.message}`
            : `${watch('description').length}/${characterLimit} characters`
        }
      />
      <Box sx={aiBoxStyles}>
        <SVGSparkles />
        <FormLabel sx={UseAIStyles} id='ai-description-label'>
          Use AI to generate a description.
        </FormLabel>
      </Box>
    </Box>
  )
}
