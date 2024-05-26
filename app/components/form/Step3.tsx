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

export function Step3(props: {
  palette: { t3BodyText: any }
  register: (
    arg0: string,
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
  characterLimit: any
}) {
  return (
    <Box position='relative' width='100%'>
      <FormLabel
        sx={{
          color: props.palette.t3BodyText,
          fontFamily: 'Lato',
          fontSize: '16px',
          fontWeight: 600,
          '&.Mui-focused': {
            color: '#000'
          }
        }}
        id='name-label'
      >
        Description (publicly visible){' '}
        <span
          style={{
            color: 'red'
          }}
        >
          {' '}
          *
        </span>
      </FormLabel>
      <CustomTextField
        {...props.register('description', {
          required: 'Description is required'
        })}
        style={{
          width: '100%',
          marginBottom: '3px'
        }}
        multiline
        rows={11}
        variant='outlined'
        value={props.inputValue}
        onChange={props.handleInputChange}
        FormHelperTextProps={{
          className: 'MuiFormHelperText-root'
        }}
        inputProps={{
          maxLength: props.characterLimit
        }}
      />
      <Box
        sx={{
          display: 'flex',
          gap: '5px'
        }}
      >
        <SVGSparkles />
        <FormLabel
          sx={{
            color: props.palette.t3BodyText,
            fontFamily: 'Lato',
            fontSize: '13px',
            textDecorationLine: 'underline',
            lineHeight: '24px',
            letterSpacing: '0.065px',
            fontWeight: 400,
            '&.Mui-focused': {
              color: '#000'
            }
          }}
          id='name-label'
        >
          Use AI to generate a description.
        </FormLabel>
      </Box>
    </Box>
  )
}
