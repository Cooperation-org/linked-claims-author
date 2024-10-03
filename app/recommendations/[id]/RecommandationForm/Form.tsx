'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { FormControl, Box, Typography } from '@mui/material'
import { useParams } from 'next/navigation'
import { FormData } from '../../../credentialForm/form/types/Types'
import { textGuid, NoteText, SuccessText, StorageText } from './fromTexts/FormTextSteps'
import Step1 from './Steps/Step1'
import Step2 from './Steps/Step2'
import Step3 from './Steps/Step3'
import Step4 from './Steps/Step4'
import DataPreview from './Steps/dataPreview'
import SuccessPage from './Steps/SuccessPage'
import { Buttons } from './buttons/Buttons'
import useLocalStorage from '../../../hooks/useLocalStorage'
import ComprehensiveClaimDetails from '../../../test/[id]/ComprehensiveClaimDetails'
import { useStepContext } from '../../../credentialForm/form/StepContext'
import { useSession } from 'next-auth/react'

const Form = () => {
  const { activeStep, handleNext, handleBack, setActiveStep } = useStepContext()
  const [fullName, setFullName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [fileID, setFileID] = useState<string | null>(null)
  const [submittedFullName, setSubmittedFullName] = useState<string | null>(null)
  const { data: session } = useSession()
  const accessToken = session?.accessToken

  const methods = useForm<FormData>({
    defaultValues: {
      storageOption: 'Google Drive',
      fullName: '',
      howKnow: '',
      recommendationText: '',
      portfolio: [{ name: '', url: '' }],
      qualifications: '',
      explainAnswer: ''
    },
    mode: 'onChange'
  })

  const { register, handleSubmit, watch, setValue, control, reset, formState } = methods
  const { errors, isValid } = formState
  const { fields, append, remove } = useFieldArray({ control, name: 'portfolio' })
  const formData = watch()
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const [storedValue, setStoreNewValue, clearValue] = useLocalStorage(
    'formData',
    formData
  )

  useEffect(() => {
    if (id && fullName && fileID) {
      setValue('fullName', fullName)
      setValue('fileID', fileID)
    }
  }, [id, fullName, fileID, setValue])

  const addCommentToFile = async (fileId: string, commentText: string, token: string) => {
    if (!fileId || !commentText || !token) {
      console.error('Missing required parameters: fileId, commentText, or accessToken')
      return
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}/comments?fields=id,content,createdTime`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: commentText })
        }
      )

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

  const handleFormSubmit = handleSubmit(async (data: FormData) => {
    try {
      setSubmittedFullName(data.fullName)
      await addCommentToFile(fileID ?? '', JSON.stringify(data), accessToken ?? '')
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
    } catch (error) {
      console.error('Error during form submission:', error)
    }
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
        {activeStep === 0 && (
          <ComprehensiveClaimDetails
            params={{
              claimId: `https://drive.google.com/file/d/${id}/view`
            }}
            setFullName={setFullName}
            setEmail={setEmail}
            setFileID={setFileID}
            claimId={id}
          />
        )}

        {activeStep === 2 && <NoteText />}
        {activeStep === 1 && (
          <Typography sx={{ fontWeight: 400, fontSize: '16px', fontFamily: 'Lato' }}>
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
                fullName={fullName ?? ''}
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
                handleTextEditorChange={(field, value) => setValue(field, value)}
                handleNext={handleNext}
                handleBack={handleBack}
                fullName={fullName ?? ''}
              />
            )}
            {activeStep === 4 && (
              <Step4
                watch={watch}
                setValue={setValue}
                errors={errors}
                fullName={fullName ?? ''}
              />
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
          maxSteps={textGuid(fullName ?? '').length}
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
