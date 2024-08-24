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

export const options = {
  GoogleDrive: 'Google Drive',
  Device: 'Device',
  DigitalWallet: 'Digital Wallet',
  Dropbox: 'Dropbox'
}

export function Step0({ watch, setValue }: Readonly<StoringMethodRadiosProps>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('storageOption', e.target.value)
  }

  return (
    <RadioGroup
      sx={radioGroupStyles}
      aria-labelledby='form-type-label'
      name='controlled-radio-buttons-group'
      value={watch('storageOption') || options.GoogleDrive}
      onChange={handleChange}
    >
      {/* Device Option */}
      <Tooltip title='Under Development' arrow>
        <FormControlLabel
          value={options.Device}
          sx={boxStyles}
          control={<Radio sx={radioCheckedStyles} />}
          label='Save to My Device'
          disabled
        />
      </Tooltip>

      {/* Google Drive Option */}
      <FormControlLabel
        value={options.GoogleDrive}
        sx={boxStyles}
        control={<Radio sx={radioCheckedStyles} />}
        label={
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <GoogleDrive /> Google Drive
          </Box>
        }
      />

      {/* Digital Wallet Option */}
      <FormControlLabel
        value={options.DigitalWallet}
        sx={boxStyles}
        control={<Radio sx={radioCheckedStyles} />}
        label={
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <DigitalWallet /> Your Digital Wallet (e.g. Corner Pocket)
          </Box>
        }
      />

      {/* Dropbox Option */}
      <Tooltip title='Under Development' arrow>
        <FormControlLabel
          value={options.Dropbox}
          sx={boxStyles}
          control={<Radio sx={radioCheckedStyles} />}
          label={
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Dropbox /> Dropbox
            </Box>
          }
          disabled
        />
      </Tooltip>
    </RadioGroup>
  )
}
