'use client'

import React from 'react'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  TextField,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldVariants,
  Box
} from '@mui/material'
import { boxStyles } from './boxStyles'

interface Step1Props {
  t3BodyText: string
  register: (
    arg: string,
    arg1: { required: string }
  ) => React.JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined } & Omit<
      FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps,
      'variant'
    >
  watch: (arg: string) => any
  setValue: (arg1: string, arg2: string) => void
  palette: { t3CheckboxBorderActive: string }
}

export function Step1({ t3BodyText, register, watch, setValue, palette }: Step1Props) {
  return (
    <>
      <FormLabel
        sx={{
          color: '#202E5B',
          fontFamily: 'Lato',
          letterSpacing: '0.08px',
          mb: '7px',
          '&.Mui-focused': {
            color: '#000'
          }
        }}
        id='form-type-label'
      >
        Is this for an individual or a business?
      </FormLabel>
      <RadioGroup
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
            md: 'row'
          },
          gap: '15px',
          m: '0 auto',
          width: '100%',
          ml: '10px'
        }}
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
          control={
            <Radio
              sx={{
                '&.Mui-checked': {
                  color: palette.t3CheckboxBorderActive
                }
              }}
            />
          }
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
          control={
            <Radio
              sx={{
                '&.Mui-checked': {
                  color: palette.t3CheckboxBorderActive
                }
              }}
            />
          }
          label='Business'
        />
      </RadioGroup>
      <Box
        sx={{
          mt: '20px'
        }}
      >
        <FormLabel
          sx={{
            color: t3BodyText,
            fontFamily: 'Lato',
            fontSize: '16px',
            fontWeight: 600,
            '&.Mui-focused': {
              color: '#000'
            }
          }}
          id='name-label'
        >
          Full Name or Business Name{' '}
          <span
            style={{
              color: 'red'
            }}
          >
            *
          </span>
        </FormLabel>
        <TextField
          {...register('fullName', {
            required: 'Full name is required'
          })}
          placeholder='e.g., Maria Fernández or Kumar Enterprises'
          variant='outlined'
          sx={{
            bgcolor: '#FFF',
            width: '100%',
            mt: '3px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px'
            }
          }}
          aria-labelledby='name-label'
          inputProps={{
            'aria-label': 'weight',
            style: {
              color: 'black',
              fontSize: '15px',
              fontStyle: 'italic',
              fontWeight: 600,
              letterSpacing: '0.075px'
            }
          }}
        />
      </Box>
    </>
  )
}
