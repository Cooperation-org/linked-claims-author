'use client'

import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { FormControl, Box, Button } from '@mui/material'
import { FormData } from './types/Types'
import {
  textGuid,
  NoteText,
  SuccessText,
  FormTextSteps
} from './fromTexts & stepTrack/FormTextSteps'
import { options, Step0 } from './Steps/Step0'
import { Buttons } from './buttons/Buttons'
import { Step1 } from './Steps/Step1'
import { Step2 } from './Steps/Step2'
import { Step3 } from './Steps/Step3'
import { Step4 } from './Steps/Step4'
import { Step5 } from './Steps/Step5'
import DataComponent from './Steps/dataPreview'
import SuccessPage from './Steps/SuccessPage'
// import { useSession } from 'next-auth/react'
import { handleNext, handleSign, handleBack } from '../../utils/formUtils'
import { createDID, createDIDWithMetaMask, signCred } from '../../utils/signCred'
import { useGoogleSignIn } from '../signing/useGoogleSignIn'
import { GoogleDriveStorage, saveToGoogleDrive } from 'trust_storage'

const Form = ({ onStepChange, setactivStep }: any) => {
  const [activeStep, setActiveStep] = useState(0)
  const [link, setLink] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [hasSignedIn, setHasSignedIn] = useState(false)
  const [metamaskAdress, setMetamaskAdress] = useState<string>('')
  const [disabled0, setDisabled0] = React.useState(false)

  const characterLimit = 294
  const maxSteps = textGuid.length
  const { session, handleSignIn } = useGoogleSignIn()
  const accessToken = session?.accessToken

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    trigger,
    formState: { errors, isValid }
  } = useForm<FormData>({
    defaultValues: {
      storageOption: 'Google Drive',
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

  const costumedHandleNextStep = async () => {
    if (
      activeStep === 0 &&
      watch('storageOption') === 'Google Drive' &&
      !session?.accessToken &&
      !hasSignedIn
    ) {
      const signInSuccess = await handleSignIn()
      if (!signInSuccess || !session?.accessToken) return
      setHasSignedIn(true)
      handleNext(activeStep, setActiveStep)
    } else {
      handleNext(activeStep, setActiveStep)
    }
  }

  const costumedHandleBackStep = async () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
      await trigger()
    }
  }

  const handleFormSubmit = handleSubmit(async (data: FormData) => {
    try {
      if (
        data.storageOption === options.GoogleDrive ||
        data.storageOption === options.DigitalWallet
      )
        await sign(data)
    } catch (error: any) {
      if (error.message === 'MetaMask address could not be retrieved') {
        setErrorMessage('Please make sure you have MetaMask installed and connected.')
        return
      } else {
        console.log('Error during VC signing:', error)
        setErrorMessage('An error occurred during the signing process.')
      }
    }
  })

  const sign = async (data: any) => {
    try {
      if (!accessToken) {
        setErrorMessage('Access token is missing')
        return
      }

      let newDid
      if (data.storageOption === options.DigitalWallet) {
        newDid = await createDIDWithMetaMask(metamaskAdress)
      } else {
        newDid = await createDID()
      }
      const { didDocument, keyPair, issuerId } = newDid
      const storage = new GoogleDriveStorage(accessToken)

      await saveToGoogleDrive(
        storage,
        {
          didDocument,
          keyPair
        },
        'DID'
      )
      console.log('🚀 ~ newDid:', newDid)
      console.log('🚀 ~ data.fullname:', data.fullName)
      const res = await signCred(accessToken, data, issuerId, keyPair)
      setLink(`https://drive.google.com/file/d/${res.id}/view`)
      console.log('🚀 ~ handleFormSubmit ~ res:', res)
      return res
    } catch (error: any) {
      throw error
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
            <Step0
              activeStep={activeStep}
              watch={watch}
              setValue={setValue}
              setMetaMaskAddres={setMetamaskAdress}
              setErrorMessage={setErrorMessage}
              setDisabled0={setDisabled0}
            />
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
              setLink={setLink}
            />
          )}
        </FormControl>
      </Box>
      {activeStep !== 7 && (
        <Buttons
          activeStep={activeStep}
          maxSteps={maxSteps}
          handleNext={
            activeStep === 0
              ? costumedHandleNextStep
              : () => handleNext(activeStep, setActiveStep)
          }
          handleSign={() => handleSign(activeStep, setActiveStep, handleFormSubmit)}
          handleBack={costumedHandleBackStep}
          isValid={isValid}
          disabled0={disabled0}
        />
      )}
      {errorMessage && (
        <div
          style={{
            color: errorMessage.includes('MetaMask') ? 'red' : 'black',
            textAlign: 'center',
            marginTop: '20px'
          }}
        >
          {errorMessage}
        </div>
      )}
    </form>
  )
}

export default Form
