import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { FormControl, Box, Typography } from '@mui/material'
import { FormData } from '../../../components/form/types/Types'
import {
  textGuid,
  NoteText,
  SuccessText,
  StorageText
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
  createFolderAndUploadFile,
  handleNext,
  handleBack,
  handleSign
} from '../../../utils/formUtils'

const Form = ({ activeStep, setActiveStep }: any) => {
  const [link, setLink] = useState<string>('')
  const { data: session } = useSession()
  const accessToken = session?.accessToken as string

  const savedFormData = localStorage.getItem('formData')
  const defaultValues: FormData = savedFormData
    ? JSON.parse(savedFormData)
    : {
        storageOption: 'Device',
        fullName: '',
        persons: '',
        credentialName: '',
        credentialDuration: '',
        credentialDescription: '',
        portfolio: [{ name: '', url: '' }],
        evidenceLink: '',
        description: '',
        communicationRating: 0,
        dependabilityRating: 0,
        explainAnswer: '',
        howDoYouKnowAlice: ''
      }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isValid }
  } = useForm<FormData>({
    defaultValues,
    mode: 'onChange'
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'portfolio'
  })

  const handleFormSubmit = handleSubmit((data: FormData) => {
    if (data.storageOption === 'Google Drive') {
      createFolderAndUploadFile(data, accessToken, setLink)
    }

    localStorage.removeItem('formData')
  })

  useEffect(() => {
    const subscription = watch(value => {
      localStorage.setItem('formData', JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [watch])

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
      {activeStep === 2 && <NoteText />}
      {activeStep === 1 && (
        <Typography sx={{ fontWeight: '400', fontSize: '16px', fontFamily: 'Lato' }}>
          {StorageText}
        </Typography>
      )}
      {activeStep === 7 && <SuccessText />}
      <Box sx={{ width: { xs: '100%', md: '50%' } }}>
        <FormControl sx={{ width: '100%' }}>
          {activeStep === 1 && (
            <Step1
              watch={watch}
              setValue={setValue}
              handleNext={() => handleNext(activeStep, setActiveStep)}
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
          {activeStep === 4 && (
            <Step4
              register={register}
              watch={watch}
              setValue={setValue}
              errors={errors}
            />
          )}
          {activeStep === 6 && <DataComponent formData={watch()} />}
          {activeStep === 7 && (
            <SuccessPage
              formData={watch()}
              setActiveStep={setActiveStep}
              link={link}
              reset={() => setValue('credentialDescription', '')}
            />
          )}
        </FormControl>
      </Box>
      {activeStep !== 7 && activeStep !== 1 && activeStep !== 0 && (
        <Buttons
          activeStep={activeStep}
          maxSteps={textGuid.length}
          handleNext={() => handleNext(activeStep, setActiveStep)}
          handleSign={() => handleSign(activeStep, setActiveStep, handleFormSubmit)}
          handleBack={() => handleBack(activeStep, setActiveStep)}
          isValid={isValid}
        />
      )}
      {activeStep === 1 && (
        <Buttons
          activeStep={activeStep}
          maxSteps={textGuid.length}
          handleNext={() => handleNext(activeStep, setActiveStep)}
          handleSign={undefined}
          handleBack={undefined}
          isValid={isValid}
        />
      )}
    </form>
  )
}

export default Form
