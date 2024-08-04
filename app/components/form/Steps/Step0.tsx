'use client'

import React from 'react'
import { Radio, RadioGroup, FormControlLabel, Box } from '@mui/material'
import { boxStyles, radioCheckedStyles, radioGroupStyles } from '../../Styles/appStyles'
import { Dropbox, GoogleDrive, DigitalWallet } from '../../../Assets/SVGs'

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
      value={watch('storageOption') || 'Google Drive'}
      onChange={e => setValue('storageOption', e.target.value)}
      defaultValue='Google Drive'
    >
      <FormControlLabel
        value='Device'
        sx={boxStyles}
        control={<Radio sx={radioCheckedStyles} />}
        label='Save to My Device'
        disabled
      />
      <FormControlLabel
        value='Google Drive'
        sx={boxStyles}
        control={<Radio sx={radioCheckedStyles} />}
        label={
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <GoogleDrive /> Google Drive
          </Box>
        }
      />
      <FormControlLabel
        value='Digital Wallet'
        sx={boxStyles}
        control={<Radio sx={radioCheckedStyles} />}
        label={
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <DigitalWallet /> Your Digital Wallet (e.g. Corner Pocket)
          </Box>
        }
        disabled
      />
      <FormControlLabel
        value='Dropbox'
        sx={boxStyles}
        control={<Radio sx={radioCheckedStyles} />}
        label={
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Dropbox /> Dropbox
          </Box>
        }
        disabled
      />
    </RadioGroup>
  )
}
