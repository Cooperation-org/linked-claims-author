'use client'
import React, { useEffect, useState } from 'react'
import { Radio, RadioGroup, FormControlLabel, Box, Tooltip } from '@mui/material'
import { boxStyles, radioCheckedStyles, radioGroupStyles } from '../../Styles/appStyles'
import { Dropbox, GoogleDrive, DigitalWallet } from '../../../Assets/SVGs'
import { useMetaMask } from '../../../hooks/useMetaMask'

interface StoringMethodRadiosProps {
  watch: (arg: string) => any
  setValue: (arg1: string, arg2: string) => void
  activeStep: number
  setMetaMaskAddres: (address: string) => void
  setErrorMessage: (message: string) => void
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
  setDisabled0
}: Readonly<StoringMethodRadiosProps>) {
  const { address, error, loading, getMetaMaskAddress, reset } = useMetaMask()
  const [selectedOption, setSelectedOption] = useState<string>(
    watch('storageOption') || options.GoogleDrive
  )

  useEffect(() => {
    if (address) {
      setMetaMaskAddres(address)
      setDisabled0(false)
    } else if (loading) {
      setDisabled0(true)
    } else if (selectedOption === options.DigitalWallet && !address) {
      setDisabled0(true)
    }
  }, [address, selectedOption, setMetaMaskAddres, setDisabled0, loading])

  useEffect(() => {
    if (error) {
      setErrorMessage(error)
      setDisabled0(true)
      reset()
    }
  }, [error, setErrorMessage, setDisabled0, reset])

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSelectedOption(value)
    setErrorMessage('')
    if (value === options.DigitalWallet) {
      await getMetaMaskAddress()
    } else {
      setDisabled0(false) // Enable the Next button for non-Digital Wallet options
    }
    setValue('storageOption', value)
  }

  return (
    <RadioGroup
      sx={radioGroupStyles}
      aria-labelledby='form-type-label'
      name='controlled-radio-buttons-group'
      value={selectedOption}
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
