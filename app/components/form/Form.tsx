'use client'

import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { FormControl, Box } from '@mui/material'
import { FormData } from './types/Types'
import { textGuid, NoteText, SuccessText, FormTextSteps } from './fromTexts & stepTrack/FormTextSteps'
import { Step0 } from './Steps/Step0'
import { Buttons } from './buttons/Buttons'
import { Step1 } from './Steps/Step1'
import { Step2 } from './Steps/Step2'
import { Step3 } from './Steps/Step3'
import { Step4 } from './Steps/Step4'
import { Step5 } from './Steps/Step5'
import DataComponent from './Steps/dataPreview'
import SuccessPage from './Steps/SuccessPage'
import { useSession } from 'next-auth/react'
import { GoogleDriveStorage } from 'trust_storage'

const Form = ({ onStepChange, setactivStep }: any) => {
  const [activeStep, setActiveStep] = useState(0)
  const characterLimit = 294
  const maxSteps = textGuid.length
  const { data: session } = useSession()
  const accessToken = session?.accessToken as string

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors, isValid }
  } = useForm<FormData>({
    defaultValues: {
      storageOption: 'Device',
      fullName: '',
      persons: '',
      credentialName: '',
      credentialDuration: '',
      credentialDescription: '',
      portfolio: [{ name: '', url: '' }],
      evidenceLink: '',
      description: ''
    },
    mode: 'onChange'
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'portfolio'
  })

  useEffect(() => {
    const handleHashChange = () => {
      const stepFromHash = parseInt(window.location.hash.replace('#step-', ''), 10)
      if (!isNaN(stepFromHash) && stepFromHash >= 0 && stepFromHash < maxSteps) {
        setActiveStep(stepFromHash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)

    handleHashChange()

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [maxSteps])

  useEffect(() => {
    setActiveStep(0)
    window.location.hash = `step-0`
  }, [])

  useEffect(() => {
    setactivStep(activeStep)
    onStepChange()
  }, [activeStep, onStepChange])

  const handleStepChange = (step: number) => {
    setActiveStep(step)
    window.location.hash = `step-${step}`
  }

  const handleNext = () => {
    handleStepChange(activeStep + 1)
  }

  const handleSign = () => {
    handleStepChange(activeStep + 1)
  }

  const handleBack = () => {
    handleStepChange(activeStep - 1)
  }

  const handleTextEditorChange = (value: string | undefined) => {
    setValue('credentialDescription', value ?? '')
  }

  const handleFormSubmit = handleSubmit((data: FormData) => {
    if (data.storageOption === 'Google Drive') {
      createFolderAndUploadFile(data)
    } else {
      localStorage.setItem('personalCredential', JSON.stringify(data))
    }

    reset()
    setActiveStep(0)

    const codeToCopy = JSON.stringify(data, null, 2)

    navigator.clipboard
      .writeText(codeToCopy)
      .then(() => {
        console.log('Form values copied to clipboard')
        reset()
      })
      .catch(err => {
        console.error('Unable to copy form values to clipboard: ', err)
      })
  })

  async function createFolderAndUploadFile(data: FormData) {
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
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        alignItems: 'center',
        marginTop: '30px',
        padding: '0 15px 30px',
        overflow: 'auto'
      }}
      onSubmit={handleFormSubmit}
    >
      <FormTextSteps activeStep={activeStep} activeText={textGuid[activeStep]} />
      {activeStep !== 0 && activeStep !== 7 && activeStep !== 6 && activeStep !== 4 && (
        <NoteText />
      )}
      {activeStep === 7 && <SuccessText />}
      <Box sx={{ width: { xs: '100%', md: '50%' } }}>
        <FormControl sx={{ width: '100%' }}>
          {activeStep === 0 && (
            <Step0 activeStep={activeStep} watch={watch} setValue={setValue} />
          )}
          {activeStep === 1 && (
            <Step1
              watch={watch}
              setValue={setValue}
              register={register}
              errors={errors}
            />
          )}

          {activeStep === 2 && (
            <Step2
              register={register}
              watch={watch}
              handleTextEditorChange={handleTextEditorChange}
              errors={errors}
            />
          )}
          {activeStep === 3 && (
            <Step3
              watch={watch}
              register={register}
              errors={errors}
              characterLimit={characterLimit}
            />
          )}
          {activeStep === 4 && (
            <Step4
              register={register}
              fields={fields}
              append={append}
              handleNext={handleNext}
              errors={errors}
              remove={remove}
            />
          )}
          {activeStep === 5 && <Step5 register={register} handleNext={handleNext} />}
          {activeStep === 6 && <DataComponent formData={watch()} />}
          {activeStep === 7 && (
            <SuccessPage formData={watch()} setActiveStep={setActiveStep} reset={reset} />
          )}
        </FormControl>
      </Box>
      {activeStep !== 7 && (
        <Buttons
          activeStep={activeStep}
          maxSteps={maxSteps}
          handleNext={handleNext}
          handleSign={handleSign}
          handleBack={handleBack}
          isValid={isValid}
        />
      )}
    </form>
  )
}

export default Form
