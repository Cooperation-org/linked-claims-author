'use client'

import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Typography, FormLabel, Button } from '@mui/material'
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFieldArrayAppend,
  UseFormSetValue
} from 'react-hook-form'
import {
  skipButtonBoxStyles,
  skipButtonStyles
} from '../../../../components/Styles/appStyles'
import TextEditor from '../TextEditor/Texteditor'
import { FormData } from '../../../../credentialForm/form/types/Types'
import LinkAdder from '../../../../components/LinkAdder'
import FileUploader from '../../../../components/FileUploader'

interface Step3Props {
  errors: FieldErrors<FormData>
  fields: { id: string; name: string; url: string }[]
  register: UseFormRegister<FormData>
  append: UseFieldArrayAppend<FormData, 'portfolio'>
  remove: (index: number) => void
  watch: UseFormWatch<FormData>
  setValue: UseFormSetValue<FormData>
  handleNext: () => void
  handleBack: () => void
  fullName: string
}

const Step3: React.FC<Step3Props> = ({
  fields,
  register,
  append,
  errors,
  remove,
  watch,
  setValue,
  handleNext,
  handleBack,
  fullName
}) => {
  const theme = useTheme()
  const displayName = fullName || ''

  const handleEditorChange = (field: string) => (value: string) => {
    setValue(field, value)
  }

  const handleNameChange = (index: number, value: string) => {
    setValue(`portfolio.${index}.name`, value)
  }

  const handleUrlChange = (index: number, value: string) => {
    setValue(`portfolio.${index}.url`, value)
  }

  const handleAddLink = () => {
    append({ name: '', url: '' })
  }

  const portfolioErrors = fields.reduce(
    (acc, _, index) => {
      if (errors?.portfolio?.[index]) {
        acc[index] = errors.portfolio[index]
      }
      return acc
    },
    {} as Record<number, any>
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Box>
        <FormLabel sx={{ fontWeight: 'bold' }} id='recommendation-text-label'>
          Recommendation Text <span style={{ color: 'red' }}>*</span>
        </FormLabel>
        <TextEditor
          value={watch('recommendationText') || ''}
          onChange={handleEditorChange('recommendationText')}
          placeholder={`e.g., ${displayName} managed a local garden for 2 years, organized weekly gardening workshops, led a community clean-up initiative.`}
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
          value={watch('qualifications') || ''}
          onChange={handleEditorChange('qualifications')}
          placeholder={`e.g., I have over 10 years of experience in the field and have worked closely with ${displayName}.`}
        />
        {errors.qualifications && (
          <Typography color='error'>{errors.qualifications.message}</Typography>
        )}
      </Box>

      <Box>
        <Typography sx={{ mb: '10px' }}>
          Adding supporting evidence of your qualifications.
        </Typography>
        <LinkAdder
          fields={fields}
          onAdd={handleAddLink}
          onRemove={remove}
          onNameChange={handleNameChange}
          onUrlChange={handleUrlChange}
          errors={portfolioErrors}
          maxLinks={5}
          nameLabel='Name'
          urlLabel='URL'
          namePlaceholder='(e.g., LinkedIn profile, github repo, etc.)'
          urlPlaceholder='https://'
        />
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
