'use client'

import { useTheme } from '@mui/material/styles'
import React from 'react'
import { FormLabel, TextField, Box, Theme, Typography, Button } from '@mui/material'
import {
  formLabelStyles,
  TextFieldStyles,
  buttonLinkStyles,
  portfolioTypographyStyles,
  addAnotherButtonStyles,
  addAnotherBoxStyles,
  skipButtonBoxStyles,
  formBoxStyles,
  formBoxStylesUrl
} from './boxStyles'
import ClearIcon from '@mui/icons-material/Clear'
import { UseFormRegister, FieldErrors, UseFieldArrayAppend } from 'react-hook-form'
import { FormData } from './Types'

interface Step4Props {
  errors: FieldErrors<FormData>
  fields: { id: string; name: string; url: string }[]
  register: UseFormRegister<FormData>
  append: UseFieldArrayAppend<FormData, 'portfolio'>
  handleNext: React.MouseEventHandler<HTMLButtonElement> | undefined
  remove: (index: number) => void
}

export function Step4({
  fields,
  register,
  append,
  handleNext,
  errors,
  remove
}: Readonly<Step4Props>) {
  const theme = useTheme<Theme>()
  return (
    <Box>
      {fields.map((field, index) => (
        <React.Fragment key={field.id}>
          <Box sx={formBoxStyles}>
            <Typography sx={portfolioTypographyStyles}>
              Portfolio Item {index + 1}
              {index > 0 && (
                <ClearIcon
                  type='button'
                  onClick={() => remove(index)}
                  sx={{ mt: '5px', cursor: 'pointer' }}
                />
              )}
            </Typography>
            <FormLabel sx={formLabelStyles} id={`name-label-${index}`}>
              Name
            </FormLabel>
            <TextField
              {...register(`portfolio.${index}.name`, {
                required: 'Name is required'
              })}
              defaultValue={field.name}
              placeholder='Picture of the Community Garden'
              variant='outlined'
              sx={TextFieldStyles}
              aria-labelledby={`name-label-${index}`}
              error={!!errors?.portfolio?.[index]?.name}
              helperText={errors?.portfolio?.[index]?.name?.message}
            />
          </Box>
          <Box sx={formBoxStylesUrl}>
            <FormLabel sx={formLabelStyles} id={`url-label-${index}`}>
              URL
            </FormLabel>
            <TextField
              {...register(`portfolio.${index}.url`, {
                required: 'URL is required'
              })}
              defaultValue={field.url}
              placeholder='https://www.example.com'
              variant='outlined'
              sx={TextFieldStyles}
              aria-labelledby={`url-label-${index}`}
              error={!!errors?.portfolio?.[index]?.url}
              helperText={errors?.portfolio?.[index]?.url?.message}
            />
          </Box>
        </React.Fragment>
      ))}
      {fields.length < 5 && (
        <Box sx={addAnotherBoxStyles}>
          <button
            type='button'
            onClick={() => append({ name: '', url: '' })}
            style={addAnotherButtonStyles(theme)}
          >
            Add another
          </button>
        </Box>
      )}
      <Box sx={skipButtonBoxStyles}>
        <button type='button' onClick={handleNext} style={buttonLinkStyles}>
          Skip
        </button>
      </Box>
    </Box>
  )
}
