'use client'

import React from 'react'
import { FormLabel, Box } from '@mui/material'
import { SVGSparkles } from '../../Assets/SVGs'
import {
  CustomTextField,
  formLabelStyles,
  UseAIStyles,
  formLabelSpanStyles,
  customTextFieldStyles,
  aiBoxStyles
} from './boxStyles'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { FormData } from './Types'

interface Step3Props {
  errors: FieldErrors<FormData>
  register: UseFormRegister<FormData>
  inputValue: unknown
  handleInputChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined
  characterLimit: number
}

export function Step3({
  register,
  inputValue,
  handleInputChange,
  characterLimit,
  errors
}: Readonly<Step3Props>) {
  return (
    <Box position='relative' width='100%'>
      <FormLabel sx={formLabelStyles} id='description-label'>
        Description (publicly visible) <span style={formLabelSpanStyles}>*</span>
      </FormLabel>
      <CustomTextField
        {...register('description', {
          required: 'Description is required'
        })}
        sx={customTextFieldStyles}
        multiline
        rows={11}
        variant='outlined'
        value={inputValue}
        onChange={handleInputChange}
        FormHelperTextProps={{
          className: 'MuiFormHelperText-root'
        }}
        inputProps={{ maxLength: characterLimit }}
        error={!!errors.description}
        helperText={errors.description?.message}
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
