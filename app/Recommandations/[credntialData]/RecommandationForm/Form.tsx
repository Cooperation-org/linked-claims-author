'use client'

import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { FormControl, Box } from '@mui/material'
import Step0 from './Steps/Step0'
import Step1 from './Steps/Step1'
import Step2 from './Steps/Step2'
import Step3 from './Steps/Step3'
import { useSession } from 'next-auth/react'
import { createFolderAndUploadFile } from '../../../utils/formUtils'
import { FormData } from '../../../components/form/types/Types'
import { FormTextSteps, textGuid, NoteText } from './fromTexts & stepTrack/FormTextSteps'

const Form = ({ onStepChange, setactivStep }: any) => {
  const [activeStep, setActiveStep] = useState(0)
  const [link, setLink] = useState<string>('')
  const { data: session } = useSession()
  const accessToken = session?.accessToken as string

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors }
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
      description: '',
      recommendationText: '',
      howDoYouKnowAlice: ''
    },
    mode: 'onChange'
  })

  useFieldArray({
    control,
    name: 'portfolio'
  })

  useEffect(() => {
    setActiveStep(0)
    window.location.hash = `step-0`
  }, [])

  useEffect(() => {
    if (typeof setactivStep === 'function') {
      setactivStep(activeStep)
    }
    onStepChange()
  }, [activeStep, onStepChange])

  const handleFormSubmit = handleSubmit((data: FormData) => {
    if (data.storageOption === 'Google Drive') {
      createFolderAndUploadFile(data, accessToken, setLink)
    }
  })

  const handleNextStep = () => {
    setActiveStep(prevStep => prevStep + 1)
  }

  const handleBackStep = () => {
    setActiveStep(prevStep => prevStep - 1)
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
      <Box sx={{ width: { xs: '100%', md: '50%' } }}>
        <FormControl sx={{ width: '100%' }}>
          {activeStep === 0 && <Step0 handleNext={handleNextStep} />}
          {activeStep === 1 && (
            <Step1 watch={watch} setValue={setValue} handleNext={handleNextStep} />
          )}
          {activeStep === 2 && (
            <Step2
              register={register}
              watch={watch}
              handleTextEditorChange={value =>
                setValue('credentialDescription', value ?? '')
              }
              errors={errors}
              handleNext={handleNextStep}
              handleBack={handleBackStep}
            />
          )}
          {activeStep === 3 && (
            <Step3
              register={register}
              watch={watch}
              setValue={setValue}
              errors={errors}
              handleNext={handleNextStep}
              handleBack={handleBackStep}
            />
          )}
        </FormControl>
      </Box>
    </form>
  )
}

export default Form
