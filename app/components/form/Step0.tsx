'use client'

import React from 'react'
import { Radio, RadioGroup, FormControlLabel } from '@mui/material'
import { boxStyles } from './boxStyles'

interface StoringMethodRadiosProps {
  watch: (arg: string) => any
  setValue: (arg1: string, arg2: string) => void
  activeStep: number
  palette: { t3CheckboxBorderActive: string }
}

export function Step0({
  watch,
  setValue,
  palette
}: StoringMethodRadiosProps) {
  return (
    <RadioGroup
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        m: '0 auto',
        width: {
          xs: '100%',
          md: '50%'
        },
        pl: '10px',
        minWidth: '355px',
        alignItems: 'center'
      }}
      aria-labelledby='form-type-label'
      name='controlled-radio-buttons-group'
      value={watch('storageOption')}
      onChange={e => setValue('storageOption', e.target.value)}
    >
      <>
        <FormControlLabel
          value='Device'
          sx={boxStyles}
          control={
            <Radio
              sx={{
                '&.Mui-checked': {
                  color: palette.t3CheckboxBorderActive
                }
              }}
            />
          }
          label='Save to My Device'
        />
        <FormControlLabel
          value='Google Drive'
          sx={boxStyles}
          control={
            <Radio
              sx={{
                '&.Mui-checked': {
                  color: palette.t3CheckboxBorderActive
                }
              }}
            />
          }
          label='Google Drive'
        />
        <FormControlLabel
          value='Digital Wallet'
          sx={boxStyles}
          control={
            <Radio
              sx={{
                '&.Mui-checked': {
                  color: palette.t3CheckboxBorderActive
                }
              }}
            />
          }
          label='Your Digital Wallet (e.g. Corner Pocket)'
        />
        <FormControlLabel
          value='Dropbox'
          sx={boxStyles}
          control={
            <Radio
              sx={{
                '&.Mui-checked': {
                  color: palette.t3CheckboxBorderActive
                }
              }}
            />
          }
          label='Dropbox'
        />
      </>
    </RadioGroup>
  )
}
