'use client'

import React from 'react'
import { FormLabel, TextField, Box, Typography } from '@mui/material'
import {
  formLabelStyles,
  TextFieldStyles,
  textFieldInputProps
} from '../../../components/Styles/appStyles'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { FormData } from '../types/Types'
import { useSession } from 'next-auth/react'
import { SVGSProfileName } from '../../../Assets/SVGs'
import { StepTrackShape } from '../fromTexts & stepTrack/StepTrackShape'

interface Step1Props {
  register: UseFormRegister<FormData>
  watch: (field: string) => any
  setValue: (field: string, value: any) => void
  errors: FieldErrors<FormData>
}

export function Step1({ register, errors }: Readonly<Step1Props>) {
  const { data: session } = useSession()

  return (
    <Box
      sx={{
        mt: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px'
      }}
    >
      <SVGSProfileName />
      <Typography sx={{ fontFamily: 'Lato', fontSize: '24px', fontWeight: 400 }}>
        Hi, {session?.user?.name ?? 'Alice'}
      </Typography>
      <StepTrackShape />
      <Box>
        <FormLabel sx={formLabelStyles} id='name-label'>
          Please confirm your first and last name:
        </FormLabel>
        <TextField
          {...register('fullName', {
            required: 'Full name is required'
          })}
          placeholder={
            session?.user?.name ?? 'e.g., Maria Fernández or Kumar Enterprises'
          }
          variant='outlined'
          sx={TextFieldStyles}
          aria-labelledby='name-label'
          inputProps={textFieldInputProps}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />
      </Box>
    </Box>
  )
}
