'use client'

import React from 'react'
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardContent
} from '@mui/material'
import { UseFormWatch, UseFormSetValue } from 'react-hook-form'
import { FormData } from '../../../../components/form/types/Types'
import { GoogleDrive, DigitalWallet } from '../../../../Assets/SVGs'
import {
  radioCheckedStyles,
  radioGroupStyles
} from '../../../../components/Styles/appStyles'
import { signIn } from 'next-auth/react'

interface Step1Props {
  watch: UseFormWatch<FormData>
  setValue: UseFormSetValue<FormData>
  handleNext: () => void
}

const Step1: React.FC<Step1Props> = ({ watch, setValue, handleNext }) => {
  const storageOption = watch('storageOption')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value
    setValue('storageOption', selectedValue)
    if (selectedValue === 'Google Drive') {
      signIn()
    }
    setValue('storageOption', e.target.value)
  }

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
      <RadioGroup
        sx={radioGroupStyles}
        aria-labelledby='form-type-label'
        name='controlled-radio-buttons-group'
        value={storageOption}
        onChange={handleChange}
      >
        <Card variant='outlined'>
          <CardContent>
            <FormControlLabel
              value='Google Drive'
              sx={{ width: '100%', bgcolor: '#FFF' }}
              control={<Radio sx={radioCheckedStyles} />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', pb: '5px' }}>
                  <GoogleDrive />
                  <Typography variant='body1' sx={{ marginLeft: 1 }}>
                    Google Drive
                  </Typography>
                </Box>
              }
            />
            <Typography variant='body2' sx={{ marginLeft: 4, textAlign: 'justify' }}>
              You must have a Google account and be able to login to use this option. This
              is where your credentials will be stored once you select Sign and Save.
            </Typography>
          </CardContent>
        </Card>
        <Card variant='outlined'>
          <CardContent>
            <FormControlLabel
              value='Digital Wallet'
              sx={{ width: '100%', bgcolor: '#FFF' }}
              control={<Radio sx={radioCheckedStyles} />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DigitalWallet />
                  <Typography variant='body1' sx={{ marginLeft: 1 }}>
                    Digital Wallet
                  </Typography>
                </Box>
              }
            />
            <Typography variant='body2' sx={{ marginLeft: 4, textAlign: 'justify' }}>
              You must have a digital wallet account and be able to login to the wallet
              application to use this option. This is where your{' '}
              <a
                style={{ color: '#0052CC', textDecoration: 'underline' }}
                href='#wallet-options'
              >
                credentials
              </a>{' '}
              will be stored once you select Sign and Save.{' '}
              <a
                style={{ color: '#0052CC', textDecoration: 'underline' }}
                href='#wallet-options'
              >
                See wallet options.
              </a>
            </Typography>
          </CardContent>
        </Card>
      </RadioGroup>
    </Box>
  )
}

export default Step1
