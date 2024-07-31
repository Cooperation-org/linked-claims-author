'use client'

import { GoogleDriveStorage } from 'trust_storage'
// import { signIn } from 'next-auth/react'  // will use later

export const createFolderAndUploadFile = async (
  data: any,
  accessToken: string,
  setLink: (link: string) => void
) => {
  try {
    const storage = new GoogleDriveStorage(accessToken)
    const folderName = 'USER_UNIQUE_KEY'
    const folderId = await storage.createFolder(folderName)

    const fileData = {
      fileName: 'test.json',
      mimeType: 'application/json',
      body: new Blob([JSON.stringify(data)], {
        type: 'application/json'
      })
    }
    const fileId = await storage.save(fileData, folderId)
    console.log('File uploaded successfully with ID:', fileId)

    const fileLink = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`
    setLink(fileLink)
    console.log('File uploaded successfully with link:', fileLink)
  } catch (error) {
    console.error('Error:', error)
  }
}

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

export const handleStepChange = (step: number, setActiveStep: (step: number) => void) => {
  setActiveStep(step)
}

export const handleNext = (activeStep: number, setActiveStep: (step: number) => void) => {
  handleStepChange(activeStep + 1, setActiveStep)
}

export const handleSign = (
  activeStep: number,
  setActiveStep: (step: number) => void,
  handleFormSubmit: () => void
) => {
  handleStepChange(activeStep + 1, setActiveStep)
  handleFormSubmit()
}

export const handleBack = (activeStep: number, setActiveStep: (step: number) => void) => {
  handleStepChange(activeStep - 1, setActiveStep)
}
