'use client'

import React from 'react'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  TextField,
  Box
} from '@mui/material'
import {
  boxStyles,
  formLabelStyles,
  radioCheckedStyles,
  radioGroupStep1Styles,
  TextFieldStyles,
  textFieldInputProps
} from './boxStyles'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { FormData } from './Types'

interface Step1Props {
  register: UseFormRegister<FormData>
  watch: (field: string) => any
  setValue: (field: string, value: any) => void
  errors: FieldErrors<FormData>
}

export function Step1({ register, watch, setValue, errors }: Readonly<Step1Props>) {
  return (
    <>
      <FormLabel sx={formLabelStyles} id='form-type-label'>
        Is this for an individual or a business?
      </FormLabel>
      <RadioGroup
        sx={radioGroupStep1Styles}
        aria-labelledby='form-type-label'
        name='controlled-radio-buttons-group'
        value={watch('persons')}
        onChange={e => setValue('persons', e.target.value)}
      >
        <FormControlLabel
          sx={{
            ...boxStyles,
            width: {
              md: 'calc(50% - 15px)',
              xs: '100%'
            }
          }}
          value='Individual'
          control={<Radio sx={radioCheckedStyles} />}
          label='Individual'
        />
        <FormControlLabel
          sx={{
            ...boxStyles,
            width: {
              md: 'calc(50% - 15px)',
              xs: '100%'
            }
          }}
          value='Business'
          control={<Radio sx={radioCheckedStyles} />}
          label='Business'
        />
      </RadioGroup>
      <Box sx={{ mt: '20px' }}>
        <FormLabel sx={formLabelStyles} id='name-label'>
          Full Name or Business Name <span style={{ color: 'red' }}>*</span>
        </FormLabel>
        <TextField
          {...register('fullName', {
            required: 'Full name is required'
          })}
          placeholder='e.g., Maria Fernández or Kumar Enterprises'
          variant='outlined'
          sx={TextFieldStyles}
          aria-labelledby='name-label'
          inputProps={textFieldInputProps}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />
      </Box>
    </>
  )
}