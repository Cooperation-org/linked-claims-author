'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { FormControl, Box } from '@mui/material'
import { FormData } from './types/Types'
import {
  textGuid,
  NoteText,
  SuccessText,
  FormTextSteps
} from './fromTexts & stepTrack/FormTextSteps'
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
import {
  createFolderAndUploadFile,
  handleNext,
  handleSign,
  handleBack
} from '../../utils/formUtils'
import { createDID, signCred } from '../../utils/signCred'
import { saveToGoogleDrive, StorageContext, StorageFactory } from 'trust_storage'

const Form = ({ onStepChange, setactivStep }: any) => {
  const [activeStep, setActiveStep] = useState(0)
  const [link, setLink] = useState<string>('')
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
    setactivStep(activeStep)
    onStepChange()
  }, [activeStep, onStepChange, setactivStep])

  const handleFormSubmit = handleSubmit(async (data: FormData) => {
    console.log('🚀 ~ handleFormSubmit ~ data:', data)

    if (data.storageOption === 'Google Drive') {
      await sign(data)
    }
  })
  const storage = new StorageContext(
    StorageFactory.getStorageStrategy('googleDrive', { accessToken })
  )

  const sign = async (data: any) => {
    const newDid = await createDID(accessToken)
    const { didDocument, keyPair, issuerId } = newDid
    await saveToGoogleDrive(
      storage,
      {
        didDocument,
        keyPair
      },
      'DID'
    )
    const res = await signCred(accessToken, data, issuerId, keyPair)
    console.log('🚀 ~ handleFormSubmit ~ res:', res)
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
              handleTextEditorChange={value =>
                setValue('credentialDescription', value ?? '')
              }
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
              handleNext={() => handleNext(activeStep, setActiveStep)}
              errors={errors}
              remove={remove}
            />
          )}
          {activeStep === 5 && (
            <Step5
              register={register}
              handleNext={() => handleNext(activeStep, setActiveStep)}
            />
          )}
          {activeStep === 6 && <DataComponent formData={watch()} />}
          {activeStep === 7 && (
            <SuccessPage
              formData={watch()}
              setActiveStep={setActiveStep}
              reset={reset}
              link={link}
            />
          )}
        </FormControl>
      </Box>
      {activeStep !== 7 && (
        <Buttons
          activeStep={activeStep}
          maxSteps={maxSteps}
          handleNext={() => handleNext(activeStep, setActiveStep)}
          handleSign={() => handleSign(activeStep, setActiveStep, handleFormSubmit)}
          handleBack={() => handleBack(activeStep, setActiveStep)}
          isValid={isValid}
        />
      )}
    </form>
  )
}

export default Form
