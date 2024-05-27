'use client'

import React from 'react'
import {
  FormLabel,
  Box,
  Theme,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldVariants
} from '@mui/material'
import { SVGSparkles } from '../../Assets/SVGs'
import { CustomTextField } from './boxStyles'
import { MUIStyledCommonProps } from '@mui/system'
import { formLableStyles, UseAIStyles } from './boxStyles'

interface Step3Props {
  errors: any
  register: (
    arg: string,
    arg1: { required: string }
  ) => React.JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined } & Omit<
      FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps,
      'variant'
    > &
    MUIStyledCommonProps<Theme>
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
}: Step3Props) {
  return (
    <Box position='relative' width='100%'>
      <FormLabel sx={formLableStyles} id='description-label'>
        Description (publicly visible) <span style={{ color: 'red' }}>*</span>
      </FormLabel>
      <CustomTextField
        {...register('description', {
          required: 'Description is required'
        })}
        style={{ width: '100%', marginBottom: '3px' }}
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
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <SVGSparkles />
        <FormLabel sx={UseAIStyles} id='ai-description-label'>
          Use AI to generate a description.
        </FormLabel>
      </Box>
    </Box>
  )
}
