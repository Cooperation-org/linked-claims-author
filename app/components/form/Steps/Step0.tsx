'use client'

import React from 'react'
import { Radio, RadioGroup, FormControlLabel } from '@mui/material'
import { boxStyles, radioCheckedStyles, radioGroupStyles } from '../../Styles/appStyles'

interface StoringMethodRadiosProps {
  watch: (arg: string) => any
  setValue: (arg1: string, arg2: string) => void
  activeStep: number
}

export function Step0({ watch, setValue }: Readonly<StoringMethodRadiosProps>) {
  return (
    <RadioGroup
      sx={radioGroupStyles}
      aria-labelledby='form-type-label'
      name='controlled-radio-buttons-group'
      value={watch('storageOption')}
      onChange={e => setValue('storageOption', e.target.value)}
    >
      <>
        <FormControlLabel
          value='Device'
          sx={boxStyles}
          control={<Radio sx={radioCheckedStyles} />}
          label='Save to My Device'
        />
        <FormControlLabel
          value='Google Drive'
          sx={boxStyles}
          control={<Radio sx={radioCheckedStyles} />}
          label='Google Drive'
        />
        <FormControlLabel
          value='Digital Wallet'
          sx={boxStyles}
          control={<Radio sx={radioCheckedStyles} />}
          label='Your Digital Wallet (e.g. Corner Pocket)'
        />
        <FormControlLabel
          value='Dropbox'
          sx={boxStyles}
          control={<Radio sx={radioCheckedStyles} />}
          label='Dropbox'
        />
      </>
    </RadioGroup>
  )
}
