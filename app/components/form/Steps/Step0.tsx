'use client'

import React from 'react'
import { Radio, RadioGroup, FormControlLabel, Box, Tooltip } from '@mui/material'
import { boxStyles, radioCheckedStyles, radioGroupStyles } from '../../Styles/appStyles'
import { Dropbox, GoogleDrive, DigitalWallet } from '../../../Assets/SVGs'

interface StoringMethodRadiosProps {
  watch: (arg: string) => any
  setValue: (arg1: string, arg2: string) => void
  activeStep: number
}

export function Step0({ watch, setValue }: Readonly<StoringMethodRadiosProps>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'Google Drive') {
      setValue('storageOption', e.target.value)
    }
  }

  return (
    <RadioGroup
      sx={radioGroupStyles}
      aria-labelledby='form-type-label'
      name='controlled-radio-buttons-group'
      value={watch('storageOption') || 'Google Drive'}
      onChange={handleChange}
      defaultValue='Google Drive'
    >
      <Tooltip title='Under Development' arrow>
        <FormControlLabel
          value='Device'
          sx={boxStyles}
          control={<Radio sx={radioCheckedStyles} />}
          label='Save to My Device'
        />
      </Tooltip>
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
      <Tooltip title='Under Development' arrow>
        <FormControlLabel
          value='Digital Wallet'
          sx={boxStyles}
          control={<Radio sx={radioCheckedStyles} />}
          label={
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <DigitalWallet /> Your Digital Wallet (e.g. Corner Pocket)
            </Box>
          }
        />
      </Tooltip>
      <Tooltip title='Under Development' arrow>
        <FormControlLabel
          value='Dropbox'
          sx={boxStyles}
          control={<Radio sx={radioCheckedStyles} />}
          label={
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Dropbox /> Dropbox
            </Box>
          }
        />
      </Tooltip>
    </RadioGroup>
  )
}
