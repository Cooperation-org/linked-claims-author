import React, { useEffect, useState } from 'react'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { FormControl, Box, Typography } from '@mui/material'
import { FormData } from '../../../CredentialForm/form/types/Types'
import { textGuid, NoteText, SuccessText, StorageText } from './fromTexts/FormTextSteps'
import Step1 from './Steps/Step1'
import Step2 from './Steps/Step2'
import Step3 from './Steps/Step3'
import Step4 from './Steps/Step4'
import DataPreview from './Steps/dataPreview'
import SuccessPage from './Steps/SuccessPage'
import { Buttons } from './buttons/Buttons'
import useLocalStorage from '../../../hooks/useLocalStorage'
import FetchedData from '../viewCredential/FetchedData'
import { useStepContext } from '../../../CredentialForm/form/StepContext'
import { handleSign } from '../../../utils/formUtils'
import { useGoogleSignIn } from '../../../components/signing/useGoogleSignIn'

const Form = () => {
  const { activeStep, handleNext, handleBack, setActiveStep } = useStepContext()
  const [fullName, setFullName] = useState('')
  const [fileID, setFileID] = useState('')
  const [gapiReady, setGapiReady] = useState(false)
  const { session } = useGoogleSignIn()
  const accessToken = session?.accessToken
  const [storedValue, setStoreNewValue, clearValue] = useLocalStorage('formData', {
    storageOption: 'Google Drive',
    fullName: '',
    howKnow: '',
    recommendationText: '',
    portfolio: [{ name: '', url: '' }],
    qualifications: '',
    explainAnswer: ''
  })
  const [submittedFullName, setSubmittedFullName] = useState<string | null>(null)

  const defaultValues: FormData = storedValue

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

  useEffect(() => {
    if (JSON.stringify(formData) !== JSON.stringify(storedValue)) {
      setStoreNewValue(formData)
    }
  }, [formData, storedValue, setStoreNewValue])
  useEffect(() => {
    console.log('Active Step:', activeStep)
  }, [activeStep])

  // Load the gapi client dynamically
  useEffect(() => {
    const loadGapi = () => {
      const script = document.createElement('script')
      script.src = 'https://apis.google.com/js/api.js'
      script.onload = () => {
        window.gapi.load('client:auth2', async () => {
          await window.gapi.client.init({
            clientId: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/drive'
          })
          setGapiReady(true)
        })
      }
      document.body.appendChild(script)
    }

    if (!window.gapi) {
      loadGapi()
    } else {
      setGapiReady(true)
    }
  }, [])

  // Function to add a comment to a Google Drive file
  async function addCommentToFile(
    fileId: string,
    commentText: string,
    accessToken: string
  ) {
    console.log(': addCommentToFile fileId', fileId)
    if (!fileId || !commentText || !accessToken) {
      console.error('Missing required parameters: fileId, commentText, or accessToken')
      return
    }

    const url = `https://www.googleapis.com/drive/v3/files/${fileId}/comments?fields=id,content,createdTime`

    const body = {
      content: commentText
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      if (!response.ok) {
        const errorDetails = await response.json()
        console.error('Error adding comment:', errorDetails)
        throw new Error(`Failed to add comment: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('Comment added successfully:', result)
      return result
    } catch (error) {
      console.error('Error adding comment:', error)
      throw error
    }
  }

  const handleFormSubmit = handleSubmit((data: FormData) => {
    setSubmittedFullName(data.fullName)
    addCommentToFile(fileID, JSON.stringify(data), accessToken as any)
    clearValue()
    reset({
      storageOption: 'Google Drive',
      fullName: '',
      howKnow: '',
      recommendationText: '',
      portfolio: [{ name: '', url: '' }],
      qualifications: '',
      explainAnswer: ''
    })
    setActiveStep(6)
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
        <Box sx={{ display: 'none' }}>
          <FetchedData setFullName={setFullName} setFileID={setFileID} />
        </Box>
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
              <Step1 watch={watch} setValue={setValue} handleNext={handleNext} />
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
                handleNext={handleNext}
                handleBack={handleBack}
              />
            )}
            {activeStep === 4 && (
              <Step4 watch={watch} setValue={setValue} errors={errors} />
            )}
            {activeStep === 5 && (
              <DataPreview
                formData={formData}
                handleNext={handleNext}
                handleBack={handleBack}
                handleSign={handleFormSubmit}
              />
            )}
            {activeStep === 6 && (
              <SuccessPage
                formData={formData}
                link={''}
                submittedFullName={submittedFullName}
                handleBack={handleBack}
              />
            )}
          </FormControl>
        </Box>

        <Buttons
          activeStep={activeStep}
          maxSteps={textGuid(fullName).length}
          handleNext={handleNext}
          handleSign={handleFormSubmit}
          handleBack={handleBack}
          isValid={isValid}
        />
      </form>
    </FormProvider>
  )
}

export default Form
