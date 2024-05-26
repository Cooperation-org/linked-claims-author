'use client'
import React from 'react'
import { Radio, RadioGroup, FormControlLabel } from '@mui/material'
import { boxStyles } from './boxStyles'

export function StoringMethodRadios(props: {
  watch: (arg0: string) => any
  setValue: (arg0: string, arg1: string) => void
  activeStep: number
  palette: { t3CheckboxBorderActive: any }
}) {
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
      value={props.watch('storageOption')}
      onChange={e => props.setValue('storageOption', e.target.value)}
    >
      {props.activeStep === 0 && (
        <FormControlLabel
          value='Device'
          sx={boxStyles}
          control={
            <Radio
              sx={{
                '&.Mui-checked': {
                  color: props.palette.t3CheckboxBorderActive
                }
              }}
            />
          }
          label='Save to My Device'
        />
      )}
      {props.activeStep === 0 && (
        <FormControlLabel
          value='Google Drive'
          sx={boxStyles}
          control={
            <Radio
              sx={{
                '&.Mui-checked': {
                  color: props.palette.t3CheckboxBorderActive
                }
              }}
            />
          }
          label='Google Drive'
        />
      )}
      {props.activeStep === 0 && (
        <FormControlLabel
          value='Digital Wallet'
          sx={boxStyles}
          control={
            <Radio
              sx={{
                '&.Mui-checked': {
                  color: props.palette.t3CheckboxBorderActive
                }
              }}
            />
          }
          label='Your Digital Wallet (e.g. Corner Pocket)'
        />
      )}
      {props.activeStep === 0 && (
        <FormControlLabel
          value='Dropbox'
          sx={boxStyles}
          control={
            <Radio
              sx={{
                '&.Mui-checked': {
                  color: props.palette.t3CheckboxBorderActive
                }
              }}
            />
          }
          label='Dropbox'
        />
      )}
    </RadioGroup>
  )
}
