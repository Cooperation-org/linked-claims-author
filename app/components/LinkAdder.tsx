import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Typography, FormLabel, TextField, Button } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import AddIcon from '@mui/icons-material/Add'
import {
  formLabelStyles,
  TextFieldStyles,
  portfolioTypographyStyles,
  addAnotherBoxStyles,
  formBoxStyles,
  formBoxStylesUrl,
  addAnotherButtonStyles,
  addAnotherIconStyles
} from './Styles/appStyles'
import { handleUrlValidation } from '../utils/urlValidation'

interface LinkItem {
  id: string
  name: string
  url: string
}

interface LinkAdderProps {
  fields: LinkItem[]
  onAdd: () => void
  onRemove: (index: number) => void
  onNameChange: (index: number, value: string) => void
  onUrlChange: (index: number, value: string) => void
  maxLinks?: number
  errors?: Record<number, { name?: { message?: string }; url?: { message?: string } }>
  nameLabel?: string
  urlLabel?: string
  namePlaceholder?: string
  urlPlaceholder?: string
}

const LinkAdder: React.FC<LinkAdderProps> = ({
  fields,
  onAdd,
  onRemove,
  onNameChange,
  onUrlChange,
  maxLinks = 5,
  errors = {},
  nameLabel = 'Name',
  urlLabel = 'URL',
  namePlaceholder = '(e.g., LinkedIn profile, github repo, etc.)',
  urlPlaceholder = 'https://'
}) => {
  const theme = useTheme()
  const [urlErrors, setUrlErrors] = useState<string[]>([])

  const handleUrlValidationChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    handleUrlValidation(event, setUrlErrors, index, urlErrors)
    onUrlChange(index, event.target.value)
  }

  return (
    <>
      {fields.map((field, index) => (
        <React.Fragment key={field.id}>
          <Box sx={formBoxStyles}>
            <Typography sx={portfolioTypographyStyles}>
              Evidence #{index + 1}
              {index > 0 && (
                <ClearIcon
                  type='button'
                  onClick={() => onRemove(index)}
                  sx={{ mt: '5px', cursor: 'pointer' }}
                />
              )}
            </Typography>
            <FormLabel sx={formLabelStyles} id={`name-label-${index}`}>
              {nameLabel}
            </FormLabel>
            <TextField
              value={field.name}
              onChange={e => onNameChange(index, e.target.value)}
              placeholder={namePlaceholder}
              variant='outlined'
              sx={TextFieldStyles}
              aria-labelledby={`name-label-${index}`}
              error={!!errors[index]?.name}
              helperText={errors[index]?.name?.message}
            />
          </Box>
          <Box sx={formBoxStylesUrl}>
            <FormLabel sx={formLabelStyles} id={`url-label-${index}`}>
              {urlLabel}
            </FormLabel>
            <TextField
              value={field.url}
              onChange={e => handleUrlValidationChange(e, index)}
              placeholder={urlPlaceholder}
              variant='outlined'
              sx={TextFieldStyles}
              aria-labelledby={`url-label-${index}`}
              error={!!errors[index]?.url}
              helperText={urlErrors[index]}
            />
          </Box>
          <Box
            sx={{ bgcolor: theme.palette.t3LightGray }}
            width={'100%'}
            height={'1px'}
          />
        </React.Fragment>
      ))}
      {fields.length < maxLinks && (
        <Box sx={addAnotherBoxStyles}>
          <Button
            type='button'
            onClick={onAdd}
            sx={addAnotherButtonStyles(theme)}
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
    </>
  )
}

export default LinkAdder
