'use client'

import { useTheme } from '@mui/material/styles'
import React, { useState } from 'react'
import { FormLabel, TextField, Box, Theme, Typography, Button } from '@mui/material'
import {
  formLabelStyles,
  TextFieldStyles,
  buttonLinkStyles,
  portfolioTypographyStyles,
  addAnotherBoxStyles,
  addAnotherIconStyles,
  skipButtonBoxStyles,
  formBoxStyles,
  formBoxStylesUrl
} from '../../../components/Styles/appStyles'
import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'
import { UseFormRegister, FieldErrors, UseFieldArrayAppend } from 'react-hook-form'
import { FormData } from '../types/Types'
import { handleUrlValidation } from '../../../utils/urlValidation'

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
  const [urlError, setUrlError] = useState<string | null>(null)

  const handleUrlChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    handleUrlValidation(event, setUrlError)
  }
  return (
    <Box>
      {fields.map((field, index) => (
        <React.Fragment key={field.id}>
          <Box sx={formBoxStyles}>
            <Typography sx={portfolioTypographyStyles}>
              Evidence #{index + 1}
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
              {...register(`portfolio.${index}.name`)}
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
              {...register(`portfolio.${index}.url`)}
              defaultValue={field.url}
              placeholder='https://www.example.com'
              variant='outlined'
              sx={TextFieldStyles}
              aria-labelledby={`url-label-${index}`}
              error={!!errors?.portfolio?.[index]?.url}
              onChange={handleUrlChange}
              helperText={urlError}
            />
          </Box>
          <Box
            sx={{
              bgcolor: theme.palette.t3LightGray,
              width: '100%',
              height: '1px',
              m: '30px 0'
            }}
            width={'100%'}
            height={'1px'}
          ></Box>
        </React.Fragment>
      ))}
      {fields.length < 5 && (
        <Box sx={addAnotherBoxStyles}>
          <Button
            type='button'
            onClick={() => append({ name: '', url: '' })}
            sx={{
              textTransform: 'none',
              width: '100%',
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              '& .MuiButton-endIcon': {
                marginRight: '0'
              },
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline'
              }
            }}
            endIcon={
              <Box sx={addAnotherIconStyles}>
                <AddIcon />
              </Box>
            }
          >
            Add another
          </Button>
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