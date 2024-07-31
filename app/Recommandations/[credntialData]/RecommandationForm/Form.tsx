import React from 'react'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
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
import { handleNext, handleBack, handleSign } from '../../../utils/formUtils'
import useLocalStorage from '../../../hooks/useLocalStorage'

const Form = ({ activeStep, setActiveStep }: any) => {
  const savedFormData = localStorage.getItem('formData')
  console.log(':  Form  savedFormData', savedFormData)
  const defaultValues: FormData = savedFormData
    ? JSON.parse(savedFormData)
    : {
        storageOption: 'Google Drive',
        fullName: '',
        howKnow: '',
        RecommendationText: '',
        evidence: [{ name: '', url: '' }],
        qualifications: '',
        communicationRating: 0,
        dependabilityRating: 0,
        explainAnswer: '',
        isRecommand: 'yes'
      }

  const methods = useForm<FormData>({
    defaultValues,
    mode: 'onChange'
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors, isValid }
  } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'portfolio'
  })

  const formData = watch()
  const { removeItem } = useLocalStorage('formData', formData, watch)

  const handleFormSubmit = handleSubmit((data: FormData) => {
    setTimeout(() => {
      removeItem()
      reset(defaultValues)
    }, 1000)
    setActiveStep(1)
  })

  return (
    <FormProvider {...methods}>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          alignItems: 'center',
          marginTop: '5px',
          padding: '0 0 30px',
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
                errors={errors}
                handleTextEditorChange={value => setValue('howKnow', value ?? '')}
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
    </FormProvider>
  )
}

export default Form
