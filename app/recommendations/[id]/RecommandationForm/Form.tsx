'use client'

import React, { useEffect, useState } from 'react'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { FormControl, Box, Button } from '@mui/material'
import { useParams } from 'next/navigation'
import { FormData } from '../../../credentialForm/form/types/Types'
import { textGuid, SuccessText } from './fromTexts/FormTextSteps'
import Step1 from './Steps/Step1'
import Step2 from './Steps/Step2'
import Step3 from './Steps/Step3'
import Step4 from './Steps/Step4'
import DataPreview from './Steps/dataPreview'
import SuccessPage from './Steps/SuccessPage'
import { Buttons } from './buttons/Buttons'
import useLocalStorage from '../../../hooks/useLocalStorage'
import { useStepContext } from '../../../credentialForm/form/StepContext'
import { GoogleDriveStorage, saveToGoogleDrive } from '@cooperation/vc-storage'
import { createDID, signCred } from '../../../utils/signCred'
import { useSession } from 'next-auth/react'
import ComprehensiveClaimDetails from '../../../claimdetails/[id]/ComprehensiveClaimDetails'
import { StepTrackShape } from '../../../credentialForm/form/fromTexts & stepTrack/StepTrackShape'
import { SVGBack } from '../../../Assets/SVGs'

interface FormProps {
  fullName: string
  email: string
}

const Form: React.FC<FormProps> = ({ fullName, email }) => {
  const { activeStep, handleNext, handleBack, setActiveStep } = useStepContext()
  const { data: session } = useSession()
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
  const params = useParams()
  const VSFileId = params?.id as string

  useEffect(() => {
    if (JSON.stringify(formData) !== JSON.stringify(storedValue)) {
      setStoreNewValue(formData)
    }
  }, [formData, storedValue, setStoreNewValue])
  useEffect(() => {
    console.log('Active Step:', activeStep)
  }, [activeStep])

  const storage = new GoogleDriveStorage(accessToken as string)

  const saveAndAddComment = async () => {
    try {
      if (!accessToken) {
        throw new Error('No access token provided.')
      }
      // Step 1: Create DID
      const newDid = await createDID(accessToken)
      const { didDocument, keyPair, issuerId } = newDid

      // Save the DID document and keyPair to Google Drive
      await saveToGoogleDrive(
        storage,
        {
          didDocument,
          keyPair
        },
        'DID'
      )

      // Step 3: Sign the credential (recommendation)
      const signedCred = await signCred(
        accessToken,
        formData,
        issuerId,
        keyPair,
        'RECOMMENDATION'
      )

      // Step 4: Save the signed recommendation to Google Drive
      const savedRecommendation = await saveToGoogleDrive(storage, signedCred, 'SESSION')
      const commentFileID = (savedRecommendation as { id: string }).id
      console.log('🚀 ~ savedRecommendation:', savedRecommendation)

      // Step 5: Add a comment to a specific file in Google Drive
      const rec = await storage.addCommentToFile(VSFileId, commentFileID)
      console.log(rec)
      return signedCred // Return the signed credential as a result
    } catch (error: any) {
      console.error('Error during signing process:', error.message)
      throw error
    }
  }

  const handleFormSubmit = handleSubmit(async (data: FormData) => {
    try {
      setSubmittedFullName(data.fullName)
      await saveAndAddComment()
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
          padding: ' 20px',
          // overflow: 'auto',
          width: '100%',
          maxWidth: '720px',
          backgroundColor: '#FFF',
          margin: 'auto',
          marginBottom: '20px'
        }}
        onSubmit={handleFormSubmit}
      >
        {activeStep >= 2 && activeStep <= 4 && (
          <Button
            onClick={handleBack}
            sx={{ textTransform: 'capitalize', p: '0', mr: '100%', ml: '50px' }}
          >
            <Box sx={{ mt: 1 }}>
              <SVGBack />
            </Box>
            Back
          </Button>
        )}
        <StepTrackShape />
        {activeStep === 0 && <ComprehensiveClaimDetails />}

        {activeStep === 7 && <SuccessText />}

        <Box sx={{ width: '100%' }}>
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
                fullName={fullName}
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
                fullName={fullName}
              />
            )}
            {activeStep === 4 && (
              <Step4
                watch={watch}
                setValue={setValue}
                errors={errors}
                fullName={fullName}
              />
            )}
            {activeStep === 5 && (
              <DataPreview
                formData={formData}
                fullName={fullName}
                handleNext={handleNext}
                handleBack={handleBack}
                handleSign={handleFormSubmit}
              />
            )}
            {activeStep === 6 && (
              <SuccessPage
                formData={formData}
                submittedFullName={submittedFullName}
                fullName={fullName}
                email={email}
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
