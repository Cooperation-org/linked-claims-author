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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Box>
        <Typography sx={{ fontWeight: 'bold' }}>Would you recommend Alice?</Typography>
        <RadioGroup row value={recommend} onChange={e => setRecommend(e.target.value)}>
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
          placeholder='I worked with Alice for about two years managing her work at the community garden. She was an excellent worker, prompt, and friendly.'
        />
        {errors.explainAnswer && (
          <Typography color='error'>{errors.explainAnswer.message}</Typography>
        )}
      </Box>
      <Box>
        <FormLabel sx={{ fontWeight: 'bold' }} id='how-do-you-know-alice-label'>
          How do you know Alice? <span style={{ color: 'red' }}>*</span>
        </FormLabel>
        <TextEditor
          value={watch('howDoYouKnowAlice')}
          onChange={value => setValue('howDoYouKnowAlice', value ?? '')}
          placeholder='I was Alice’s manager for about two years, but I have known her in total for about 5 years.'
        />
        {errors.howDoYouKnowAlice && (
          <Typography color='error'>{errors.howDoYouKnowAlice.message}</Typography>
        )}
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 'bold' }}>Rate Alice’s Communication</Typography>
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
        <Typography sx={{ fontWeight: 'bold' }}>Rate Alice’s Dependability</Typography>
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
