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
  boxStyles,
  radioCheckedStyles,
  radioGroupStyles
} from '../../../../components/Styles/appStyles'

interface Step1Props {
  watch: UseFormWatch<FormData>
  setValue: UseFormSetValue<FormData>
  handleNext: () => void
}

const Step1: React.FC<Step1Props> = ({ watch, setValue, handleNext }) => {
  const storageOption = watch('storageOption')

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
      {/* <Typography variant='h6' gutterBottom>
        First, choose where to save your recommendation.
      </Typography>
      <Typography variant='body2' gutterBottom>
        Your recommendation will be stored in the location you select. This will ensure it
        can be linked to Alice’s credential once you’re finished:
      </Typography> */}
      <RadioGroup
        sx={radioGroupStyles}
        aria-labelledby='form-type-label'
        name='controlled-radio-buttons-group'
        value={storageOption}
        onChange={e => setValue('storageOption', e.target.value)}
      >
        <Card variant='outlined' sx={{ marginBottom: 2 }}>
          <CardContent>
            <FormControlLabel
              value='Google Drive'
              sx={boxStyles}
              control={<Radio sx={radioCheckedStyles} />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <GoogleDrive />
                  <Typography variant='body1' sx={{ marginLeft: 1 }}>
                    Google Drive
                  </Typography>
                </Box>
              }
            />
            <Typography variant='body2' sx={{ marginLeft: 4 }}>
              You must have a Google account and be able to login to use this option. This
              is where your credentials will be stored once you select Sign and Save.
            </Typography>
          </CardContent>
        </Card>
        <Card variant='outlined' sx={{ marginBottom: 2 }}>
          <CardContent>
            <FormControlLabel
              value='Digital Wallet'
              sx={boxStyles}
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
            <Typography variant='body2' sx={{ marginLeft: 4 }}>
              You must have a digital wallet account and be able to login to the wallet
              application to use this option. This is where your credentials will be
              stored once you select Sign and Save.{' '}
              <a href='#wallet-options'>See wallet options.</a>
            </Typography>
          </CardContent>
        </Card>
      </RadioGroup>
      <Box textAlign='center'>
        <button
          style={{
            backgroundColor: '#0052CC',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
          onClick={handleNext}
        >
          Next
        </button>
      </Box>
    </Box>
  )
}

export default Step1
