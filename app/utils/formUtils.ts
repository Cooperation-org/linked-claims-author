'use client'

import { GoogleDriveStorage } from '@cooperation/vc-storage'
// import { signIn } from 'next-auth/react'  // will use later

export const copyFormValuesToClipboard = (codeToCopy: string) => {
  navigator.clipboard
    .writeText(codeToCopy)
    .then(() => {
      console.log('Form values copied to clipboard')
    })
    .catch(err => {
      console.error('Unable to copy form values to clipboard: ', err)
    })
}

export const handleSign = (
  activeStep: number,
  setActiveStep: (step: number) => void,
  handleFormSubmit: () => void
) => {
  setActiveStep(activeStep + 1)
  handleFormSubmit()
}
