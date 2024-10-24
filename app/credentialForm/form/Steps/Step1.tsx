'use client'

import React from 'react'
import { FormLabel, TextField, Box } from '@mui/material'
import {
  formLabelStyles,
  TextFieldStyles,
  textFieldInputProps
} from '../../../components/Styles/appStyles'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { FormData } from '../types/Types'
import { useSession } from 'next-auth/react'

interface Step1Props {
  register: UseFormRegister<FormData>
  watch: (field: string) => any
  setValue: (field: string, value: any) => void
  errors: FieldErrors<FormData>
}

export function Step1({ register, errors }: Readonly<Step1Props>) {
  const { data: session } = useSession()

  return (
    <Box sx={{ mt: '20px' }}>
      <FormLabel sx={formLabelStyles} id='name-label'>
        Full Name <span style={{ color: 'red' }}>*</span>
      </FormLabel>
      <TextField
        {...register('fullName', {
          required: 'Full name is required'
        })}
        placeholder={session?.user?.name ?? 'e.g., Maria Fernández or Kumar Enterprises'}
        variant='outlined'
        sx={TextFieldStyles}
        aria-labelledby='name-label'
        inputProps={textFieldInputProps}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
      />
    </Box>
  )
}
