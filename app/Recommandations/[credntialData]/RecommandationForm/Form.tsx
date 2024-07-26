'use client'

import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { FormControl, Box } from '@mui/material'
import { FormData } from '../../../components/form/types/Types'
import {
  FormTextSteps,
  textGuid,
  NoteText,
  SuccessText
} from './fromTexts & stepTrack/FormTextSteps'
import Step1 from './Steps/Step1'
import Step2 from './Steps/Step2'
import Step3 from './Steps/Step3'
import Step4 from './Steps/Step4'
import DataComponent from './Steps/dataPreview'
import SuccessPage from './Steps/SuccessPage'
import { Buttons } from './buttons/Buttons'
import { useSession } from 'next-auth/react'
import {
  handleStepHashChange,
  createFolderAndUploadFile,
  handleNext,
  handleBack,
  handleSign
} from '../../../utils/formUtils'

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
    const handleStepHashChangeWrapper = () =>
      handleStepHashChange(setActiveStep, textGuid.length)

    window.addEventListener('hashchange', handleStepHashChangeWrapper)

    handleStepHashChangeWrapper()

    return () => {
      window.removeEventListener('hashchange', handleStepHashChangeWrapper)
    }
  }, [])

  useEffect(() => {
    setActiveStep(0)
    window.location.hash = `step-0`
  }, [])

  useEffect(() => {
    if (setactivStep) {
      setactivStep(activeStep)
    }
    // onStepChange()
  }, [activeStep, onStepChange, setactivStep])

  const handleFormSubmit = handleSubmit((data: FormData) => {
    if (data.storageOption === 'Google Drive') {
      createFolderAndUploadFile(data, accessToken, setLink)
    }
  })

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

      {activeStep !== 0 && activeStep !== 6 && activeStep !== 7 && <NoteText />}
      {activeStep === 7 && <SuccessText />}
      <Box sx={{ width: { xs: '100%', md: '50%' } }}>
        <FormControl sx={{ width: '100%' }}>
          {activeStep === 0 && (
            <Step1
              watch={watch}
              setValue={setValue}
              handleNext={() => handleNext(activeStep, setActiveStep)}
            />
          )}
          {activeStep === 1 && (
            <Step2
              register={register}
              watch={watch}
              handleTextEditorChange={value =>
                setValue('credentialDescription', value ?? '')
              }
              errors={errors}
            />
          )}
          {activeStep === 2 && (
            <Step3
              register={register}
              watch={watch}
              setValue={setValue}
              errors={errors}
            />
          )}
          {activeStep === 4 && (
            <Step4
              register={register}
              watch={watch}
              setValue={setValue}
              errors={errors}
              fields={fields}
              append={append}
              remove={remove}
              handleTextEditorChange={(field: string, value: any) =>
                setValue(field, value)
              }
              handleNext={() => handleNext(activeStep, setActiveStep)}
              handleBack={() => handleBack(activeStep, setActiveStep)}
            />
          )}
          {activeStep === 3 && <DataComponent formData={watch()} />}{' '}
          {activeStep === 4 && (
            <SuccessPage
              formData={watch()}
              setActiveStep={setActiveStep}
              link={link}
              reset={() => setValue('credentialDescription', '')}
            />
          )}
        </FormControl>
      </Box>
      {activeStep !== 7 && activeStep !== 0 && (
        <Buttons
          activeStep={activeStep}
          maxSteps={textGuid.length}
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
