'use client'

import React, { useEffect } from 'react'
import { Radio, RadioGroup, FormControlLabel, Box, Tooltip } from '@mui/material'
import { boxStyles, radioCheckedStyles, radioGroupStyles } from '../../Styles/appStyles'
import { Dropbox, GoogleDrive, DigitalWallet } from '../../../Assets/SVGs'
import { getMetaMaskAddress } from '../../../utils/signCred'
import { set } from 'react-hook-form'

interface StoringMethodRadiosProps {
  watch: (arg: string) => any
  setValue: (arg1: string, arg2: string) => void
  activeStep: number
  setMetaMaskAddres: (address: string) => void
  setErrorMessage: (message: string) => void
  disabled0: boolean
  setDisabled0: (value: boolean) => void
}

export const options = {
  GoogleDrive: 'Google Drive',
  Device: 'Device',
  DigitalWallet: 'Digital Wallet',
  Dropbox: 'Dropbox'
}

export function Step0({
  watch,
  setValue,
  setMetaMaskAddres,
  setErrorMessage,
  disabled0,
  setDisabled0
}: Readonly<StoringMethodRadiosProps>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('')
    setDisabled0(false)
    setValue('storageOption', e.target.value)
  }

  const handleMetaMaskAddress = async () => {
    try {
      const address = await getMetaMaskAddress()
      if (address) {
        setMetaMaskAddres(address)
      }
    } catch (error: any) {
      setDisabled0(true)
      if (error.message === 'MetaMask address could not be retrieved') {
        setErrorMessage('Please make sure you have MetaMask installed and connected.')
        return
      }
      setValue('storageOption', options.GoogleDrive)
      console.error('MetaMask error:', error)
      setErrorMessage(
        'MetaMask address could not be retrieved, please use another option'
      )
    }
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
            <DigitalWallet /> Your Digital Wallet (With MetaMask)
          </Box>
        }
        onClick={handleMetaMaskAddress}
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
