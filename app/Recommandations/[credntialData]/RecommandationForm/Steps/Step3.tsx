'use client'

import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Typography, FormLabel, TextField, Button } from '@mui/material'
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFieldArrayAppend,
  UseFormSetValue
} from 'react-hook-form'
import {
  formLabelStyles,
  TextFieldStyles,
  portfolioTypographyStyles,
  addAnotherBoxStyles,
  skipButtonBoxStyles,
  formBoxStyles,
  formBoxStylesUrl,
  addAnotherButtonStyles,
  addAnotherIconStyles,
  skipButtonStyles
} from '../../../../components/Styles/appStyles'
import TextEditor from '../TextEditor/Texteditor'
import { FormData } from '../../../../components/form/types/Types'
import ClearIcon from '@mui/icons-material/Clear'
import AddIcon from '@mui/icons-material/Add'

import { handleUrlValidation } from '../../../../utils/urlValidation'

interface Step3Props {
  errors: FieldErrors<FormData>
  fields: { id: string; name: string; url: string }[]
  register: UseFormRegister<FormData>
  append: UseFieldArrayAppend<FormData, 'portfolio'>
  remove: (index: number) => void
  watch: UseFormWatch<FormData>
  setValue: UseFormSetValue<FormData>
  handleTextEditorChange: (field: string, value: any) => void
  handleNext: () => void
  handleBack: () => void
}

const Step3: React.FC<Step3Props> = ({
  fields,
  register,
  append,
  errors,
  remove,
  watch,
  setValue,
  handleTextEditorChange,
  handleNext,
  handleBack
}) => {
  const theme = useTheme()
  const [urlError, setUrlError] = useState<string | null>(null)

  const handleUrlChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    handleUrlValidation(event, setUrlError)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Box>
        <FormLabel sx={{ fontWeight: 'bold' }} id='recommendation-text-label'>
          Recommendation Text <span style={{ color: 'red' }}>*</span>
        </FormLabel>
        <TextEditor
          value={watch('recommendationText')}
          onChange={value => handleTextEditorChange('RecommendationText', value ?? '')}
          placeholder='e.g., Alice managed a local garden for 2 years, Organized weekly gardening workshops, Led a community clean-up initiative'
        />
        {errors.recommendationText && (
          <Typography color='error'>{errors.recommendationText.message}</Typography>
        )}
      </Box>
      <Box>
        <FormLabel sx={{ fontWeight: 'bold' }} id='qualifications-label'>
          Your Qualifications
        </FormLabel>
        <Typography sx={{ marginBottom: '10px' }}>
          Please share how you are qualified to provide this recommendation. Sharing your
          qualifications will further increase the value of this recommendation.
        </Typography>
        <TextEditor
          value={watch('qualifications')}
          onChange={value => handleTextEditorChange('qualifications', value ?? '')}
          placeholder='e.g., I managed Alice at a local garden for 2 years where she coordinated weekly gardening workshops and lead a community clean-up initiative.'
        />
        {errors.qualifications && (
          <Typography color='error'>{errors.qualifications.message}</Typography>
        )}
      </Box>
      <Box>
        <Typography sx={{ mb: '10px' }}>
          Adding supporting evidence of your qualifications.
        </Typography>
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
                placeholder='(e.g., LinkedIn profile, github repo, etc.)'
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
                placeholder='https://'
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
                bgcolor: theme.palette.t3LightGray
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
              sx={addAnotherButtonStyles(theme)}
              endIcon={
                <Box >
                  <AddIcon />
                </Box>
              }
            >
              Add another
            </Button>
          </Box>
        )}
      </Box>
      <Box sx={skipButtonBoxStyles}>
        <Button type='button' onClick={handleNext} sx={skipButtonStyles(theme)}>
          Skip
        </Button>
      </Box>
    </Box>
  )
}

export default Step3
