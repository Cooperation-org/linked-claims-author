'use client'

import React, { useState } from 'react'
import {
  Box,
  Typography,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Rating
} from '@mui/material'
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue
} from 'react-hook-form'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import TextEditor from '../TextEditor/Texteditor'
import { FormData } from '../../../../components/form/types/Types'

interface Step4Props {
  register: UseFormRegister<FormData>
  watch: UseFormWatch<FormData>
  setValue: UseFormSetValue<FormData>
  errors: FieldErrors<FormData>
}

const Step4: React.FC<Step4Props> = ({ register, watch, setValue, errors }) => {
  const [recommend, setRecommend] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRecommend(value)
    setValue('isRecommend', value)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Box>
        <Typography sx={{ fontWeight: 'bold' }}>Would you recommend Golda?</Typography>
        <RadioGroup row value={recommend} onChange={handleChange}>
          <FormControlLabel
            value='yes'
            control={
              <Radio
                icon={<ThumbUpOutlinedIcon />}
                checkedIcon={<ThumbUpIcon color='primary' />}
              />
            }
            label='YES'
          />
          <FormControlLabel
            value='no'
            control={
              <Radio
                icon={<ThumbDownOutlinedIcon />}
                checkedIcon={<ThumbDownIcon color='primary' />}
              />
            }
            label='NO'
          />
        </RadioGroup>
      </Box>
      <Box>
        <FormLabel sx={{ fontWeight: 'bold' }} id='explain-answer-label'>
          Explain your answer:
        </FormLabel>
        <TextEditor
          value={watch('explainAnswer')}
          onChange={value => setValue('explainAnswer', value ?? '')}
          placeholder='I worked with Golda for about two years managing her work at the community garden. She was an excellent worker, prompt, and friendly.'
        />
        {errors.explainAnswer && (
          <Typography color='error'>{errors.explainAnswer.message}</Typography>
        )}
      </Box>

      <Box>
        <Typography sx={{ fontWeight: 'bold' }}>Rate Golda’s Communication</Typography>
        <Rating
          sx={{ fontSize: '37px' }}
          name='communicationRating'
          value={watch('communicationRating')}
          onChange={(event, newValue) => {
            setValue('communicationRating', newValue ?? 0)
          }}
        />
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 'bold' }}>Rate Golda’s Dependability</Typography>
        <Rating
          sx={{ fontSize: '37px' }}
          name='dependabilityRating'
          value={watch('dependabilityRating')}
          onChange={(event, newValue) => {
            setValue('dependabilityRating', newValue ?? 0)
          }}
        />
      </Box>
    </Box>
  )
}

export default Step4
